const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const argv = require('minimist')(process.argv.slice(2), {
  // boolean: [
  //   'inline',
  // ],
  // default: {
  //   'inline': false,
  // },
});
const SANS_SERIF_FONT = 'Alegreya Sans';
const SERIF_FONT = 'Alegreya';

const BOLD_SELECTOR = ':not(.serif) strong, :not(.serif) b, h1:not(.serif), h2:not(.serif), h3:not(.serif), h4:not(.serif), h5:not(.serif), h6:not(.serif) .fw7, .b';
const ITALIC_SELECTOR = ':not(.serif) em, i, .i';

const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, src);
const deleteFrom = (arr, target) => arr.filter(x => x !== target);

argv._.forEach((file) => {
  const html = fs.readFileSync(file);
  const dom = (new JSDOM(html))
  const document = dom.window.document;

  // Update Typography CSS Include:
  const typography = {};
  const typeCSSInclude = document.querySelector('link[href^="https://fonts"]');
  typeCSSInclude.getAttribute('href').split('family=')[1].split('|').forEach((font) => {
    const fontName = decodeURI(font.split(':')[0]);
    const fontKinds = font.split(':')[1].split(',');
    const key = (fontName === SERIF_FONT ? 'serif': 'sans-serif');
    typography[key] = fontKinds;
  });
  // Check if we need 900i Alegreya
  if (Array.from(document.querySelectorAll('.serif em')).length === 0) {
    typography.serif = deleteFrom(typography.serif, '900i');
  }
  // Check if we need 700, 700i, 400i Alegreya Sans
  const italicElements = Array.from(document.querySelectorAll(ITALIC_SELECTOR));
  if (italicElements.length === 0) {
    typography['sans-serif'] = deleteFrom(typography['sans-serif'], '400i');
    typography['sans-serif'] = deleteFrom(typography['sans-serif'], '700i');
  }
  const boldElements = Array.from(document.querySelectorAll(BOLD_SELECTOR));
  if (boldElements.length === 0) {
    typography['sans-serif'] = deleteFrom(typography['sans-serif'], '700');
    typography['sans-serif'] = deleteFrom(typography['sans-serif'], '700i');
  }
  if (typography['sans-serif'].indexOf('700i') >= 0) {
    let hasBoldItalic = false;
    italicElements.forEach((el) => {
      if (hasBoldItalic) return;
      const boldElements = Array.from(el.querySelectorAll(BOLD_SELECTOR));
      if (boldElements.length > 0) {
        hasBoldItalic = true;
      }
    });
    if (!hasBoldItalic) {
      boldElements.forEach((el) => {
        if (hasBoldItalic) return;
        const italicElements = Array.from(el.querySelectorAll(ITALIC_SELECTOR));
        if (italicElements.length > 0) {
          hasBoldItalic = true;
        }
      });
    }
    if (!hasBoldItalic) {
      typography['sans-serif'] = deleteFrom(typography['sans-serif'], '700i');
    }
  }
  typeCSSInclude.setAttribute(
    'href',
    `https://fonts.googleapis.com/css?family=${typography['serif'].length === 0 ? '' : `${SERIF_FONT.replace(/ /g, '+')}:${typography['serif'].join(',')}`}|${typography['sans-serif'].length === 0 ? '' : `${SANS_SERIF_FONT.replace(/ /g, '+')}:${typography['sans-serif'].join(',')}`}`,
  );

  // Remove syntax highlighting if not needed:
  if (Array.from(document.querySelectorAll('.highlight')).length === 0) {
    const syntaxCSS = document.querySelector('link[href*="syntax.css"]');
    syntaxCSS.parentNode.removeChild(syntaxCSS);
  }

  fs.writeFileSync(file, dom.serialize());
});

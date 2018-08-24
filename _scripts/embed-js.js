const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const argv = require('minimist')(process.argv.slice(2), {
  boolean: [
    'inline',
  ],
  default: {
    'inline': false,
  },
});
// Use with --inline to replace inclusions with their file source

const processInclude = (el, type, files) => {
  const src = el.getAttribute(type === 'css' ? 'href' : 'src');
  if (src.indexOf('cdnjs.cloudflare.com') >= 0) return false;
  if (src.indexOf('unpkg.com') >= 0) return false;
  if (src.indexOf('rawgit.com') >= 0) return false;
  if (src.indexOf('googleapis.com') >= 0) return false;
  if (src.indexOf('twitter.com') >= 0) return false;
  if (src.indexOf('syntax.css') >=0) return false;
  if (!files.has(src)) {
    const fileSrc = fs.readFileSync(path.join(...src.replace(/^http[s]{0,1}\:\/\/[^/]+\/blog\//, './_site/').split('/'))).toString();
    files.addFile(src, fileSrc);
  }
  if(argv.inline) {
    // Write the file as an inline inclusion:
    el.outerHTML = (type === 'css' ? `<style>${files.getFile(src)}</style>` : `<script>${files.getFile(src)}</script>`);
  } else {
    // Remove the element from the document:
    el.parentNode.removeChild(el);
  }
  return true;
}

const Files = function() { this.files = {}; };
Files.prototype.addFile = function(src, fileSrc) { this.files[src] = fileSrc; };
Files.prototype.has = function(src) { return Object.prototype.hasOwnProperty.call(this.files, src); }
Files.prototype.getFile = function(src) {
  return this.files[src];
}
Files.prototype.getFiles = function(filter=undefined) {
  if(filter === undefined) return Object.values(this.files);
  return this.getNames(filter)
    .reduce((acc, cur) => ([
      ...acc,
      this.files[cur],
    ]), []);
}
Files.prototype.getNames = function(filter=undefined) {
  const keys = Object.keys(this.files);
  if(filter === undefined) return keys;
  return Object.keys(this.files)
    .filter(path => path.match(filter));
}

const files = new Files();
argv._.forEach((file) => {
  const html = fs.readFileSync(file);
  const dom = (new JSDOM(html))
  const document = dom.window.document;
  const seenCss = Array.from(document.querySelectorAll('link[rel=stylesheet]')).reduce((seen, el) => {
    const s = processInclude(el, 'css', files);
    return seen ? true : s;
  }, false);
  const seenJs = Array.from(document.querySelectorAll('script[src]')).reduce((seen, el) => {
    const s = processInclude(el, 'js', files);
    return seen ? true : s;
  }, false);
  if (!argv.inline) {
    // If the site had CSS assets, we write the packed CSS file:
    if (seenCss) {
      const cssPath = files.getNames(/site\.css$/)[0].replace('site', 'packed');
      document.querySelector('head').insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${cssPath}" />`);
    }
    // If the site had JS assets, we write the packed JS file:
    if (seenJs) {
      const jsPath = files.getNames(/site\.js$/)[0].replace('site', 'packed');
      document.querySelector('body').insertAdjacentHTML('beforeend', `<script src="${jsPath}" />`);
    }
  }
  fs.writeFileSync(file, dom.serialize());
});
if (!argv.inline) {
  // Write the packed CSS file:
  fs.writeFileSync(
    path.join('_site', 'assets', 'css', 'packed.css'),
    files.getFiles(/\.css$/).join(''),
  );
  // Write the packed JS file:
  fs.writeFileSync(
    path.join('_site', 'assets', 'js', 'packed.js'),
    files.getFiles(/\.js$/).join(''),
  );
}

task :serve do
  system "bundle exec jekyll serve --unpublished"
end

task :deploy do
  system "rsync -avz '-e ssh -p 22' _site/ eschaton@birkenfeld.dreamhost.com:~/www/andrew.pilsch.com/blog/"
end

namespace :build do
  task :jekyll do
    system "env JEKYLL_ENV=production bundle exec jekyll build"
  end

  task :compress do
    # $stdout.print "Compressing site.js..."; $stdout.flush
    # system "uglifyjs -o _site/assets/js/main.js _site/assets/js/main.js"
    # system "uglifyjs -o _site/assets/js/slimmenu.js _site/assets/js/slimmenu.js"
    # $stdout.puts "done"
    $stdout.print "Compressing *.html..."
    $stdout.flush
    system "html-minifier --input-dir _site --output-dir _site --file-ext html --collapse-whitespace --remove-comments --remove-attribute-quotes --remove-empty-attributes --use-short-doctype --minify-js --minify-css"
    $stdout.puts "done"
    $stdout.print "Building Custom Tachyons.css..."
    $stdout.flush
    system "npx extract-tachyons `find _site -name \"*.html\"` --compress --output _site/assets/css/tachyons-custom.min.css"
    $stdout.puts "done"
    $stdout.print "Customizing Assets..."
    $stdout.flush
    system "node _scripts/customize-assets.js `find _site -name \"*.html\"`"
    $stdout.puts "done"
    $stdout.print "Packing Assets..."
    $stdout.flush
    system "node _scripts/embed-js.js `find _site -name \"*.html\"`"
    $stdout.puts "done"
  end
  task all: [:jekyll, :compress]
end

task build: ["build:all"]

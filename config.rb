###
# Page options, layouts, aliases and proxies
###

set :markdown_engine, :kramdown
set :markdown, :fenced_code_blocks => true,
							 :autolink => true, 
							 :smartypants => true,
							 :footnotes => true,
							 :superscript => true

@bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))

set :site_deploy_root, build? ? 'http://andrew.pilsch.com' : 'http://andrew.pilsch.com/blog'

root = Dir.pwd
activate :sprockets
sprockets.append_path File.join "#{root}", @bower_config["directory"]

activate :autoprefixer
#if not build?
#	activate :external_pipeline,
#		name: :sass,
#		command: "npm run watch:sass",
#		source: ".tmp",
#		latency: 1
#end
#after_build do
#	activate :external_pipeline,
#		name: :sass,
#		command: "npm run build:sass",
#		source: ".tmp",
#		latency: 1
#end

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

###
# Helpers
###

activate :syntax
activate :directory_indexes
page "/combine.php", :directory_index => false
activate :blog do |blog|
	#blog.tag_template = "tag.html"
	blog.calendar_template = "calendar.html"

	# Enable pagination
	blog.paginate = true
	blog.per_page = 10
	blog.page_link = "page/{num}"
end

page "/rss.xml", layout: false

# Build-specific configuration
configure :build do
	# Minify CSS on build
	activate :minify_css, inline: true

	# Minify Javascript on build
	activate :minify_javascript, inline: true

	activate :minify_html
	
	set :http_prefix, '/blog/'
	
	ignore "stylesheets/*"
end

activate :deploy do |deploy|
	deploy.deploy_method = :rsync
	deploy.host = "eschaton@birkenfeld.dreamhost.com"
	deploy.path = "~/www/andrew.pilsch.com/blog/"
end
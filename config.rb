###
# Page options, layouts, aliases and proxies
###

set :markdown_engine, :kramdown
set :markdown, :fenced_code_blocks => true,
							 :autolink => true, 
							 :smartypants => true,
							 :footnotes => true,
							 :superscript => true

set :site_deploy_root, build? ? 'http://andrew.pilsch.com' : 'http://andrew.pilsch.com/blog'

root = Dir.pwd

activate :external_pipeline,
	name: :sass,
	command: "npm run #{build? ? "build" : "watch"}:sass",
	source: ".tmp",
	latency: 1
activate :external_pipeline,
	name: :js,
	command: "npm run #{build? ? "build" : "watch"}:js",
	source: ".tmp",
	latency: 1

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
	blog.calendar_template = "calendar.html"

	# Enable pagination
	blog.paginate = true
	blog.per_page = 10
	blog.page_link = "page/{num}"
end

page "/rss.xml", layout: false

# Build-specific configuration
configure :build do
	activate :minify_html
	set :http_prefix, '/blog/'
end

activate :deploy do |deploy|
	deploy.deploy_method = :rsync
	deploy.host = "eschaton@birkenfeld.dreamhost.com"
	deploy.path = "~/www/andrew.pilsch.com/blog/"
end
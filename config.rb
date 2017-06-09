###
# Page options, layouts, aliases and proxies
###

set :markdown_engine, :kramdown
set :markdown, :fenced_code_blocks => true,
							 :autolink => true, 
							 :smartypants => true,
							 :footnotes => true,
							 :superscript => true

set :site_deploy_root, build? ? 'https://andrew.pilsch.com' : 'https://andrew.pilsch.com/blog'

root = Dir.pwd

set :haml, { :ugly => true, :format => :html5, preserve: ['textarea', 'pre', 'code']}

activate :external_pipeline,
	name: :gulp,
	command: "gulp#{build? ? " --node_env=production" : ""}",
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
	activate :minify_html do |html|
		html.preserve_patterns = [/<pre\s?(.*?)>(.*?)<\/pre>/im, /<textarea\s?(.*?)>(.*?)<\/textarea>/im]
	end
	set :http_prefix, '/blog/'
end

activate :deploy do |deploy|
	deploy.deploy_method = :rsync
	deploy.host = "eschaton@birkenfeld.dreamhost.com"
	deploy.path = "~/www/andrew.pilsch.com/blog/"
end
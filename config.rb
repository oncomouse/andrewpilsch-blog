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

set :site_deploy_root, 'http://andrew.pilsch.com/blog'

root = Dir.pwd

# Change Compass configuration
compass_config do |config|
	#config.add_import_path File.join "#{root}", @bower_config["directory"]
#	 config.output_style = :compact
end

activate :sprockets
sprockets.append_path File.join "#{root}", @bower_config["directory"]

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#	which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

activate :syntax
activate :directory_indexes
page "/combine.php", :directory_index => false
activate :blog do |blog|
	# This will add a prefix to all links, template references and source paths
	# blog.prefix = "blog"

	# blog.permalink = "{year}/{month}/{day}/{title}.html"
	# Matcher for blog source files
	# blog.sources = "{year}-{month}-{day}-{title}.html"
	# blog.taglink = "tags/{tag}.html"
	# blog.layout = "layout"
	# blog.summary_separator = /(READMORE)/
	# blog.summary_length = 250
	# blog.year_link = "{year}.html"
	# blog.month_link = "{year}/{month}.html"
	# blog.day_link = "{year}/{month}/{day}.html"
	# blog.default_extension = ".markdown"

	blog.tag_template = "tag.html"
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
	
	set :http_prefix, '/blog/'
end

activate :deploy do |deploy|
	deploy.deploy_method = :rsync
	deploy.host = "eschaton@birkenfeld.dreamhost.com"
	deploy.path = "~/www/andrew.pilsch.com/blog/"
end
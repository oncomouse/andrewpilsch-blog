---
layout: false
---
xml.instruct! :xml, :version => '1.0'
xml.rss :version => "2.0",  'xmlns:atom' => "http://www.w3.org/2005/Atom" do
	xml.channel do
		xml.description "Andrew Pilsch's Blog"
		xml.title "Andrew Pilsch"
		xml.link "http://andrew.pilsch.com/blog/"
		xml.tag! 'atom:link', "href" => "https://andrew.pilsch.com/blog/rss.xml", "rel" => "self",  :type => "application/rss+xml"
		blog.articles[0..5].each do |article|
			xml.item do
                if article.data.has_key? "short_title"
                    xml.title article.data["short_title"]
                else
    				xml.title article.title
                end
				xml.link "https://andrew.pilsch.com" + article.url
				xml.pubDate article.date.rfc822
				xml.guid "https://andrew.pilsch.com" + article.url
				xml.description "<p>" + Nokogiri::HTML(article.summary(350)).css("p").first.content.to_s + "</p>\n\n<p>" + link_to("Read More", "https://andrew.pilsch.com" + article.url) + "</p>"
				#xml.content article.body, "type" => "html"
			end
		end
	end
end
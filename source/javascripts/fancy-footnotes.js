//=require 'jquery-overlaps/jquery.overlaps'
//=require 'jquery-inline-footnotes'

$(document).ready(function() {
	$.inlineFootnotes({
	    columnWidth: 780,
	    mediaQuery: "(min-width: 960px)",
		overlapOffset: 5
	});
});
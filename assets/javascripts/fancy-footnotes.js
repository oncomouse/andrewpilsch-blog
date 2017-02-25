//=require 'jquery-overlaps/jquery.overlaps'
//=require 'jquery-inline-footnotes/dist/jquery.inline-footnotes.min'

$(document).ready(function() {
	$.inlineFootnotes({
	    columnWidth: 780,
	    mediaQuery: "(min-width: 960px)",
		overlapOffset: 5
	});
});
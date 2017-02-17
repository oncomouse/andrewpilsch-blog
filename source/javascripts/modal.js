//=require "jquery-modal/jquery.modal"

$(function() {
	var modal_counter = 0;
	$('img').not('.emoji').each(
		function() {
			var modal_id = "modal_" + modal_counter;
			modal_counter++;
			
			// Polyfill naturalWidth & naturalHeight:
			if(!('naturalWidth') in new Image()) {
				var tmp = new Image();
				tmp.src = this.src;
				img.naturalWidth = tmp.width;
				img.naturalHeight = tmp.height;
			}
			
			$(this).addClass('modalized').wrap('<a href="#' + modal_id + '" rel="modal:open" class="modal-trigger"></a>')
			$('<div id="'+modal_id+'" style="display:none;width:'+(this.naturalWidth + 150)+'px;height:'+(this.naturalHeight+150)+'px;"><div class="modal-inner"><img src="'+$(this).attr('src')+'"/></div></div>').appendTo($('body'));
		}
	);
});

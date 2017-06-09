//=require "jquery-modal/jquery.modal"

$(function() {
	var modal_counter = 0;
	$('img').not('.emoji').each(
		function() {
			var modal_id = "modal_" + modal_counter;
			modal_counter++;
			
			$(this).addClass('modalized').wrap('<a href="#' + modal_id + '" rel="modal:open" class="modal-trigger"></a>').on('click', function() {
				$('#' + modal_id).css('width', this.naturalWidth + 150);
				$('#' + modal_id).css('height', this.naturalHeight + 150)
			})
			$('<div id="'+modal_id+'" style="display:none;"><div class="modal-inner"><img src="'+$(this).attr('src')+'"/></div></div>').appendTo($('body'));
		}
	);
});

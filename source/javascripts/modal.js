$(function() {
	$('img').each(function() {
		var modal_id = $(this).attr('src').replace(/^.*\//,'').replace(/\W/g,'');
		$(this).addClass('modalized').wrap('<div class="modal"></div>').after('<div class="modal-fade-screen"><div class="modal-inner" style="width: '+this.naturalWidth + 'px; height: '+this.naturalHeight + 'px;"><div class="modal-close" for="'+modal_id+'"></div><img src="'+$(this).attr('src')+'"/></div></div>').after($('<input class="modal-state" id="'+modal_id+'" type="checkbox"/>')).wrap('<label for="' + modal_id + '"></label>').wrap('<div class="modal-trigger"></div>');
	});
	$('.modal-state').on('change', function() {
		if ($(this).is(':checked')) {
			$('body').addClass('modal-open');
		} else {
			$('body').removeClass('modal-open');
		}
	});

	$('.modal-fade-screen, .modal-close').on('click', function() {
		$('.modal-state:checked').prop('checked', false).change();
	});

	$('.modal-inner').on('click', function(e) {
		e.stopPropagation();
	});
});

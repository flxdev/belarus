$(document).ready(function () {
	// slick carousel
	function slicks() {
		$('.slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			responsive: [
				{
					breakpoint: 981,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
		$('.slider-carousel').slick({
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 981,
					settings: {
						arrows: false
					}
				}
			]
		});
		$('.partners-rotator').slick({
			slidesToShow: 8,
			slidesToScroll: 1,
			variableWidth: true,
			arrows: false,
			infinite: true,
			autoplay: true,
			autoplaySpeed: !0,
			speed: 6000,
			cssEase: 'linear'
		});
		// $('.partners-rotator').on('mouseenter', function(){
		// 	$(this).slick('slickPause')
		// });
		// $('.partners-rotator').on('mouseleave', function(){
		// 	$(this).slick('slickPlay')
		// });
	} slicks();


	function selects() {
		$('.select').fancySelect({
			optionTemplate: function(optionEl) {
			    return '<span>' + optionEl.text() + '</span>';
			}
		});
	} selects();

	//form validetor
	function validator() {
			var form_validate = $('.validation');
		if (form_validate.length) {
			form_validate.each(function () {
				var form_this = $(this);
				$.validate({
					form : form_this,
					borderColorOnError : true,
					scrollToTopOnError : false,
					validateOnBlur : true,
					onValidate: function($form) {
						$form.removeClass('error');
					},
					onError: function($form) {
						$form.addClass('error');
					},
					onSuccess: function($form){
						valid($form);
						return false;
					}
				});
			});
		};
	} validator();

	function valid(form) {
		$(form).parents('.popup__wrap').find('.front').removeClass("active");
		$(form).parents('.popup__wrap').find('.back').addClass("active");			
	}

	//popup
	
	$('[data-popup]').each(function() {
		var _ = $(this);

		_.on('click', function(e) {
			popup($(this).data('popup'));
			e.preventDefault();
		});
	});


	function popup(selector) {
		var popupSelector = $('.' + selector),
			innerSelector = popupSelector.find('.popup'),
			duration = 500,
			close = popupSelector.find('.close'),
			btnSuccess = popupSelector.find('.btn__success'),
			html = $('html');

		popupSelector
			.fadeIn({
				duration: duration,
				start: function(){
					html.addClass('hidden');
				},
				complete: function(){
					$(this).addClass('visible');
				}
			});

		innerSelector.on('click', function(event){
			event.stopPropagation();
		});

		close.add(popupSelector).add(btnSuccess).on('click', function(){
			if(!popupSelector.hasClass('visible')) return;

			popupSelector
				.fadeOut({
					duration: duration,
					complete: function(){
						$(this).removeClass('visible');
						html.removeClass('hidden');
					}
				});
		});
	};

})
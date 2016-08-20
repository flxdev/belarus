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
		$('.news-gallery').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: true
		});
		// $('.partners-rotator').on('mouseenter', function(){
		// 	$(this).slick('slickPause')
		// });
		// $('.partners-rotator').on('mouseleave', function(){
		// 	$(this).slick('slickPlay')
		// });
		$('.event-rorator').slick({
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
	} slicks();

	function reSlicks() {
		$('.vertical-gallery').slick({
			dots: false,
			arrows: false,
			slidesToShow: 3,
			infinite: false,
			responsive: [
				{
					breakpoint: 600,
					settings: {
						slidesToScroll: 2,
						slidesToShow: 2,
						dots: true
					}
				}
			]
		});
		$('.vertical-gallery').addClass('initial');
	};

	$(window).on('load resize', function(){
		if($(window).width() <= 981 && !$('.vertical-gallery').hasClass('initial')) {
			reSlicks();
		}
		if($(window).width() > 981 && $('.vertical-gallery').hasClass('initial')) {
			$('.vertical-gallery').slick('unslick');
			$('.vertical-gallery').removeClass('initial');
		}
	});


	function selects() {			
		$('.select_new').multipleSelect({
			single: true,
			width: '100%',
			onClose: function(){
				$('.ms-choice').removeClass('open');
			}
		});

		$('.ms-choice').on('click', function(){
			var this_ = $(this),
				div = this_.find('> div');
			if (div.hasClass('open')) {
				$('.ms-choice').removeClass('open');
				div.parents('.ms-choice').addClass('open');
			}
			else {
				div.parents('.ms-choice').removeClass('open');
			}
		})
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

	$('input[data-validation]')
		.on('validation', function(evt, valid) {
			if(valid) {
				$(this).parents('form').removeClass('error');
				$(this).parents('.field').siblings().find('input').removeAttr('data-validation').removeClass('error');
				$(this).parents('.field').siblings().find('.field__body').removeClass('has-error');
			}
		});

	function valid(form) {
		$(form).parents('.popup__wrap').find('.front').removeClass("active");
		$(form).parents('.popup__wrap').find('.back').addClass("active");			
	}

	//popup
	
	$('[data-popup]').each(function() {
		var _ = $(this);

		_.on('click', function(e) {
			popup($(this).data('popup'), $(this).data('select'));
			e.preventDefault();
		});
	});


	function popup(selector, item) {
		var popupSelector = $('.' + selector),
			innerSelector = popupSelector.find('.popup'),
			duration = 500,
			close = popupSelector.find('.close'),
			btnSuccess = popupSelector.find('.btn__success'),
			html = $('html'),
			number = item;

		popupSelector
			.fadeIn({
				duration: duration,
				start: function(){
					html.addClass('hidden');
					var option = $('[data-option="' + number + '"]').index();
					popupSelector.find('select').multipleSelect('setSelects', [option+1])
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


	function gMaps(id, longitude, latitude) {
		var map;
		function initialize() {
			var stylez = [{"featureType":"all","elementType":"geometry","stylers":[{"weight":"1.00"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#f1ff00"},{"saturation":-27.4},{"lightness":9.4},{"gamma":"1.97"},{"weight":"1.00"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e5ecf4"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e5ecf4"},{"lightness":"0"},{"gamma":"2.16"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#9FFF00"},{"gamma":1}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#92cd37"},{"lightness":"0"},{"weight":"9.18"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f2f0ec"},{"lightness":"-5"},{"gamma":"1.11"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#0099FF"},{"saturation":-20},{"lightness":36.4},{"gamma":1}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#00FF4F"},{"gamma":1}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#FFB300"},{"saturation":-38},{"lightness":11.2},{"gamma":1}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#21b6d6"},{"lightness":"-9"},{"visibility":"on"},{"gamma":"1.00"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#00B6FF"},{"saturation":4.2},{"lightness":-63.4},{"gamma":1}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#19b6eb"}]}];
			var mapOptions = {
				zoom: 14,
				disableDefaultUI: true,
				scrollwheel: false,
				panControl: false,
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL,
					position: google.maps.ControlPosition.RIGHT_CENTER
				},
				scaleControl: true,
				center: new google.maps.LatLng(longitude, latitude)
			};

			map = new google.maps.Map(document.getElementById('maps'), mapOptions);
			var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
			map.mapTypes.set('tehgrayz', mapType);
    		map.setMapTypeId('tehgrayz');
			var image = 'img/icons/baloon.png';
			var myLatLng = new google.maps.LatLng(longitude, latitude);
			var beachMarker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image,
				title:""
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);

		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center); 
		});
	}
	if($('#maps').length) {
		var longitude = $('#maps').data("longitude"),
			latitude = $('#maps').data("latitude");

		gMaps($('#maps'), longitude, latitude);
	}

	// mobile-menu
	function mobileMenu(){
		var trigger = $('.burger'),
			menu = $('.mobile__wrap'),
			close = menu.find('.close'),
			body = $('body');

		trigger.on('click', function(){
			body.css('overflow', 'hidden');
			menu.fadeIn(250);
		});
		close.on('click', function(){
			body.removeAttr('style');
			menu.fadeOut(250);
		});
	} mobileMenu();

	$(document).on('scroll', function() {    
		var scroll 			= $(this).scrollTop(),
			hDoc 			= $(document).height(),
			hWind 			= $(window).height(),
			hFooter 		= $('.footer').height(),
			scrolltop 		= $('.goto'),
			scroll_position = hDoc - hWind - hFooter;
		if (scroll > 100) {
			scrolltop.fadeIn(600);
			scrolltop.addClass('is-active');
		}
		else{
			scrolltop.removeClass('is-active');
			$(".scrolltop").fadeOut(600);
		}
	});
	$('.goto').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
	});


	// input only numbers
	function chars() {
		$('.chars').on('keypress', function(key){
			if((key.charCode < 40 || key.charCode > 41) && (key.charCode < 48 || key.charCode > 57) && (key.charCode != 45) && (key.charCode != 32) && (key.charCode != 43) && (key.charCode != 0))
				return false;
		});

	} chars();

	function grayscale(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0);
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
	};

	$(window).load(function(){
		
		$(".partners-item img").fadeIn(500);
		
		// clone image
		$('.partners-item img').each(function(){
			var el = $(this);
			el.css({"position":"absolute", "top": "0", "bottom":"0"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"relative", "z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
				var el = $(this);
				el.dequeue();
			});
			this.src = grayscale(this.src);
		});
		
		// Fade image 
		$('.partners-item img').mouseover(function(){
			$(this).parent().find('img:first').stop().animate({opacity:1}, 300);
		})
		$('.img_grayscale').mouseout(function(){
			$(this).stop().animate({opacity:0}, 300);
		});		
	});

	$('.event-columns__item').matchHeight();

	//fancybox v3 beta
	function fancy() {
		$('.fancy').fancybox({
			padding: 0,
			helpers: {
				thumbs: true,
				overlay: {
					locked: true
				}
			}
		})
	} fancy();


	//accordion
	function accord(){
		var trigger = $('.accord').find('.col-33').first(),
			box = trigger.siblings();
			trigger.on('click', function(){
				if(!$(this).hasClass('open')) {
					$(this).addClass('open');
					box.stop(true,true).slideDown();
				} else {
					$(this).removeClass('open');
					box.stop(true,true).slideUp();
				}
			});	
			$('.accord').addClass('mobile init');
			box.fadeOut();
	};

	$(window).on('load resize', function(){
		if($(window).width() <= 980 && !$('.accord').hasClass('mobile')) {
			$('.accord').find('.col-33').first().siblings().fadeOut();
			if(!$('.accord').hasClass('init')) {
				accord();
			}
		}

		if($(window).width() > 981){
			$('.accord').removeClass('mobile');			
			if($('.accord').hasClass('init')) {
				$('.accord').find('.col-33').first().siblings().fadeIn();
			}
		}
	});

	//accordion news
	function accordNews(){
		var trigger = $('.container-news').find('.event-item').first(),
			box = trigger.siblings(),
			btnNews = $('.news-show'),
			textShow = "Показать",
			textHide = "Скрыть";
			btnNews.on('click', function(){
				if(!$(this).hasClass('open')) {
					$(this).addClass('open');
					box.stop(true,true).slideDown();
					$(this).find("span").text(textHide);
				} else {
					$(this).removeClass('open');
					box.stop(true,true).slideUp();
					$(this).find("span").text(textShow);
				}
			});	
			$('.container-news').find('.container-preview').addClass('mobile init');
			box.fadeOut();
	};

	$(window).on('load resize', function(){
		if($(window).width() <= 480 && !$('.container-news').find('.container-preview').hasClass('mobile')) {
			$('.container-news').find('.event-item').first().siblings().fadeOut();
			if(!$('.container-news').find('.container-preview').hasClass('init')) {
				accordNews();
			}
		}

		if($(window).width() > 481){
			$('.container-news').find('.container-preview').removeClass('mobile');			
			if($('.container-news').find('.container-preview').hasClass('init')) {
				$('.container-news').find('.event-item').first().siblings().fadeIn();
			}
		}
	});
})
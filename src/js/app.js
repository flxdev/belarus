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
			arrows: false,
			dots: true
		})
		// $('.partners-rotator').on('mouseenter', function(){
		// 	$(this).slick('slickPause')
		// });
		// $('.partners-rotator').on('mouseleave', function(){
		// 	$(this).slick('slickPlay')
		// });
	} slicks();

	function reSlicks() {
		$('.vertical-gallery').slick({
			dots: false,
			arrows: false,
			slidesToShow: 3,
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


	function gMaps(id, longitude, latitude) {
		var map;
		function initialize() {
			var stylez = [{"featureType":"all","elementType":"geometry","stylers":[{"weight":"1.00"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#f1ff00"},{"saturation":-27.4},{"lightness":9.4},{"gamma":"1.97"},{"weight":"1.00"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e5ecf4"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e5ecf4"},{"lightness":"0"},{"gamma":"2.16"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#9FFF00"},{"gamma":1}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#92cd37"},{"lightness":"0"},{"weight":"9.18"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f2f0ec"},{"lightness":"-5"},{"gamma":"1.11"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#0099FF"},{"saturation":-20},{"lightness":36.4},{"gamma":1}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#00FF4F"},{"gamma":1}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#FFB300"},{"saturation":-38},{"lightness":11.2},{"gamma":1}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#21b6d6"},{"lightness":"-9"},{"visibility":"on"},{"gamma":"1.00"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#00B6FF"},{"saturation":4.2},{"lightness":-63.4},{"gamma":1}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#19b6eb"}]}];
			var mapOptions = {
				zoom: 14,
				disableDefaultUI: true,
				scrollwheel: false,
				panControl: false,
				zoomControl: false,
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

})
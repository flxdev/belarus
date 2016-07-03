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
})
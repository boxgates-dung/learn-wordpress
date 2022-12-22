jQuery( window ).on( 'elementor/frontend/init', () => {
	window.elementorFrontend.hooks.addAction(
		'frontend/element_ready/CLT_Review_Slider.default',
		function( $element ) {
			const asyncSwiper = window.elementorFrontend.utils.swiper //using swiper of elementor

			if ( $( '.clt-review__swiper', $element ).length ) {
				const sliderConfig = $( '.clt-review__swiper', $element ).data( 'slider' )

				const breakpointMobile = {
					slidesPerView: sliderConfig.column_review_slider_mobile
				}

				const breakpointTablet = {
					slidesPerView: sliderConfig.column_review_slider_tablet
				}

				const breakpointDesktop = {
					slidesPerView: sliderConfig.column_review_slider
				}

				const swipeConfig = {
					loop: true,
					navigation: {
						nextEl: '.clt-review-swiper-button-next',
						prevEl: '.clt-review-swiper-button-prev'
					},
					pagination: {
						el: '.swiper-pagination'
					},
					breakpoints: {
						// when window width is >= 320px
						320: breakpointMobile,
						// when window width is >= 640px
						640: breakpointTablet,
						// when window width is >= 992px
						1000: breakpointDesktop
					}
				}

				if ( sliderConfig.auto_play === 'yes' ) {
					swipeConfig.autoplay = {
						delay: sliderConfig.auto_play_speed || 2000
					}
				}
				new asyncSwiper( $( '.clt-review__swiper', $element ), swipeConfig )
			}
		}
	)
} )

jQuery( window ).on( 'elementor/frontend/init', () => {
	window.elementorFrontend.hooks.addAction(
		'frontend/element_ready/CLT_Category_Slider.default',
		function( $element ) {
			const asyncSwiper = window.elementorFrontend.utils.swiper //using swiper of elementor

			if ( $( '.clt-category__swiper', $element ).length ) {
				const sliderConfig = $( '.clt-category__swiper', $element ).data( 'slider' )

				const breakpointMobile = {
					slidesPerView: sliderConfig.column_mobile,
					spaceBetween: sliderConfig.gutter_mobile
				}

				const breakpointTablet = {
					slidesPerView: sliderConfig.column_tablet,
					spaceBetween: sliderConfig.gutter_tablet
				}

				const breakpointDesktop = {
					slidesPerView: sliderConfig.column,
					spaceBetween: sliderConfig.gutter
				}

				const swipeConfig = {
					loop: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
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

				new asyncSwiper( $( '.clt-category__swiper', $element ), swipeConfig )
			}
		}
	)
} )

jQuery( window ).on( 'elementor/frontend/init', () => {
	window.elementorFrontend.hooks.addAction(
		'frontend/element_ready/elementor-clt-post-slider.default',
		function( $element ) {
			const asyncSwiper = window.elementorFrontend.utils.swiper //using swiper of elementor

			//selector element
			if ( $( '.clt-post-slider__swiper', $element ).length ) {
				const sliderConfig = $( '.clt-post-slider__swiper', $element ).data(
					'slider'
				)

				let breakpointMobile = {
					slidesPerView: sliderConfig.slides_per_view_mobile,
					spaceBetween: sliderConfig.space_between_mobile
				}
				if (
					sliderConfig.slides_per_column_mobile &&
					sliderConfig.slides_per_column_mobile > 1
				) {
					breakpointMobile = {
						...breakpointMobile,
						slidesPerColumn: sliderConfig.slides_per_column_mobile,
						slidesPerColumnFill: 'row'
					}
				}

				let breakpointTablet = {
					slidesPerView: sliderConfig.slides_per_view_tablet,
					spaceBetween: sliderConfig.space_between_tablet
				}
				if (
					sliderConfig.slides_per_column_tablet &&
					sliderConfig.slides_per_column_tablet > 1
				) {
					breakpointTablet = {
						...breakpointTablet,
						slidesPerColumn: sliderConfig.slides_per_column_tablet,
						slidesPerColumnFill: 'row'
					}
				}

				let breakpointDesktop = {
					slidesPerView: sliderConfig.slides_per_view,
					spaceBetween: sliderConfig.space_between
				}
				if (
					sliderConfig.slides_per_column &&
					sliderConfig.slides_per_column > 1
				) {
					breakpointDesktop = {
						...breakpointDesktop,
						slidesPerColumn: sliderConfig.slides_per_column,
						slidesPerColumnFill: 'row'
					}
				}
				const swipeConfig = {
					loop: sliderConfig.loop === 'yes' ? true : false,
					lazy: true,
					navigation: {
						nextEl: '.post-slider-swiper-button-next',
						prevEl: '.post-slider-swiper-button-prev'
					},
					autoplay: sliderConfig.auto_play === 'yes' ? { delay: 3000 } : '',
					speed: 900,
					breakpoints: {
						// when window width is >= 320px
						320: breakpointMobile,
						// when window width is >= 640px
						640: breakpointTablet,
						// when window width is >= 992px
						1000: breakpointDesktop
					},
					grabCursor: true
				}

				new asyncSwiper( $( '.clt-post-slider__swiper', $element ), swipeConfig )
			}
		}
	)
} )
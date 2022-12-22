jQuery( window ).on( 'elementor/frontend/init', () => {
	window.elementorFrontend.hooks.addAction(
		'frontend/element_ready/elementor-clt-product-carousel.default',
		function( $element ) {
			const asyncSwiper = window.elementorFrontend.utils.swiper //using swiper of elementor

			//selector element
			if ( $( '.clt-products__swiper', $element ).length ) {
				const sliderConfig = $( '.clt-products__swiper', $element ).data( 'slider' )

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
					loop: sliderConfig.loop === 'yes',
					lazy: true,
					navigation: {
						nextEl: '.product-carousel-swiper-button-next',
						prevEl: '.product-carousel-swiper-button-prev'
					},
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets'
					},
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
				// console.log( swipeConfig )
				new asyncSwiper( $( '.clt-products__swiper', $element ), swipeConfig )
			}
		}
	)

	$( document.body ).on( 'mouseover', '.hover-slider-toggle-pane', function() {
		// Lấy url ảnh trong attribute của thẻ hover-slider-toggle-pane
		const urlImage = $( this ).data( 'hover-slider-image' )
		// Lấy id chấm slide attribute của thẻ hover-slider-toggle-pane
		const idSlideIndicator = $( this ).data( 'hover-slider-i' )

		const thisElement = $( this ).parent().parent()

		// Set ảnh mới trong trong thẻ product
		thisElement.children( '.hover-slider-init' ).attr( 'src', urlImage )

		// Xoa chấm đang active
		thisElement
			.children( '.hover-slider-indicator' )
			.find( '.hover-slider-indicator-dot' )
			.removeClass( 'active' )

		// Set active slide chấm hiện tại
		$(
			'.hover-slider-indicator-dot[data-hover-slider-i = ' +
				idSlideIndicator +
				']'
		).addClass( 'active' )
	} )
} )

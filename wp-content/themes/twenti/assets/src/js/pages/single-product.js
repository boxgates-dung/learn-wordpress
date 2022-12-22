import Swiper, { Navigation, Controller } from 'swiper'
import Swal from 'sweetalert2'

Swiper.use( [Controller, Navigation] )

$( document ).ready( function() {
	if ( $( '.single-product-left' ).length ) {
		const productSlider = new Swiper( '.single-product-slider', {
			spaceBetween: 0,
			centeredSlides: false,
			loop: true,
			direction: 'horizontal',
			loopedSlides: 5,
			navigation: {
				nextEl: '.single-swiper-button-next',
				prevEl: '.single-swiper-button-prev'
			},
			resizeObserver: true
		} )
		const productThumbs = new Swiper( '.single-product-thumbs', {
			spaceBetween: 10,
			centeredSlides: true,
			loop: true,
			slideToClickedSlide: true,
			direction: 'horizontal',
			slidesPerView: 5,
			loopedSlides: 5
		} )
		productSlider.controller.control = productThumbs
		productThumbs.controller.control = productSlider
	}

	$( '[data-fancybox]' ).fancybox( {
		// Options will go here
		buttons: ['close'],
		wheel: false,
		transitionEffect: 'slide',
		loop: true,
		toolbar: true,
		clickContent: true
	} )

	function addToCart( data, form ) {
		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'POST',
			data: data,
			dataType: 'json',
			beforeSend: function() {
				$( document.body ).trigger( 'adding_to_cart', [
					$( '.single_add_to_cart_button' ),
					form.serialize()
				] )
				$( 'input, button', form ).prop( 'disabled', true )
			},
			success: function( response ) {
				$( 'input, button', form ).prop( 'disabled', false )
				if ( response.error ) {
				} else {
					$( document.body ).trigger( 'added_to_cart', [
						response.fragments,
						response.cart_hash,
						$( '.single_add_to_cart_button' )
					] )
				}
			}
		} )
	}

	// Add to cart
	$( document.body ).on(
		'click',
		'.clt-single-product-wrapper button.single_add_to_cart_button',
		function( e ) {
			e.preventDefault()
			if ( ! $( this ).hasClass( 'disabled' ) ) {
				const form = $( '.clt-single-product-wrapper .cart' )
				const productId =
					parseInt( $( 'input[name="product_id"]', form ).val() ) ||
					parseInt( $( this ).val() )
				const quantity = parseInt( $( 'input[name="quantity"]', form ).val() )
				const variationId = parseInt(
					$( 'input[name="variation_id"]', form ).val()
				)

				const data = {
					action: 'clt_ajax_add_to_cart'
				}

				// Form group
				if ( $( '.cart' ).hasClass( 'grouped_form' ) ) {
					const groupProduct = []

					$( '.cart tbody tr' ).each( function() {
						const getIDElement = '#' + $( this ).attr( 'id' )
						const thisQuantity = $( getIDElement + ' .qty' ).val()
						const thisProductId = getIDElement.split( '-' )[ 1 ]

						groupProduct.push( {
							product_id: thisProductId,
							quantity: thisQuantity
						} )
					} )

					data.type = 'grouped'
					data.list_product = groupProduct
					addToCart( data, form )
				} else if ( $( '.cart' ).hasClass( 'variations_form' ) ) {
					// Variation option
					const color = $( 'select[name="attribute_pa_color"]', form ).val()
					const size = $( 'select[name="attribute_pa_size"]', form ).val()

					data.type = 'variable'
					data.product_id = productId
					data.quantity = quantity
					data.variation_id = variationId
					data.variation_option = {
						color: color,
						size: size
					}
					addToCart( data, form )
				} else {
					// Simple product
					data.type = 'simple'
					data.product_id = productId
					data.quantity = quantity
					addToCart( data, form )
				}
			} else {
				Swal.fire( {
					icon: 'error',
					title: 'Attention',
					text: 'Please select some product options before adding this product to your cart.'
				} )
			}
			return false
		}
	)

	// Swich variation
	// Khởi tạo giá trị selected color default
	const colorDefaultSelected = $( '#pa_color' ).val()
	$(
		'.clt-single-product-wrapper .variations_form .clt-type-color .clt-term'
	).each( function() {
		const valueColor = $( this ).data( 'term' )
		if ( colorDefaultSelected === valueColor ) {
			$( this ).addClass( 'selected' )
			$( '.variations label[for="pa_color"] .selected-value' ).html(
				': ' + valueColor
			)
		}
	} )

	// Click để lựa chọn màu sản phẩm
	$( document.body ).on(
		'click',
		'.clt-single-product-wrapper .variations_form .clt-type-color .clt-term',
		function() {
			$( '.variations_form .clt-type-color .clt-term' ).removeClass( 'selected' )
			$( this ).addClass( 'selected' )
			const nameColor = $( this ).data( 'name' )
			const valueColor = $( this ).data( 'term' )
			$( '.variations label[for="pa_color"] .selected-value' ).html(
				': ' + nameColor
			)
			$( '#pa_color' ).val( valueColor ).change()

			const variations = JSON.parse(
				$( '.variations_form' ).attr( 'data-product_variations' )
			)

			variations.map( function( item ) {
				if ( valueColor === item.attributes.attribute_pa_color ) {
					$(
						'.clt-single-product-wrapper .single-product-slider .swiper-slide-active img'
					).attr( 'src', item.image.src )
				}
			} )
		}
	)

	// Click để lựa chọn size sản phẩm
	const eleSizeTitle = $( '.variations label[for="pa_size"] .selected-value' )
	eleSizeTitle.html( ': ' + $( '#pa_size' ).val() )
	$( document.body ).on( 'click', '#pa_size', function() {
		eleSizeTitle.html( ': ' + $( '#pa_size' ).val() )
	} )

	// Reset variation
	$( '.clt-single-product-wrapper .variations_form .reset_variations' ).click(
		function() {
			$( '.variations label .selected-value' ).html( ': ' )
			$( '.clt-term' ).removeClass( 'selected' )
		}
	)
} )

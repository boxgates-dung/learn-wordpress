import Swal from 'sweetalert2'
import Swiper from 'swiper'
import 'bootstrap/js/dist/popover'
import 'bootstrap/js/dist/modal'

jQuery( document ).ready( function( $ ) {
	function updateCartCount() {
		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'GET',
			data: {
				action: 'clt_ajax_cart_count'
			},
			success: function( response ) {
				$( '.cart-count' ).html( response.total_price )
				$( '.cart-price .woocommerce-Price-amount' ).html(
					'<bdi><span class="woocommerce-Price-currencySymbol">$</span>	' +
						response.total_cart +
						'	</bdi>'
				)
			}
		} )
	}
	// Thao tác nút thêm số lượng sản phẩm xuất hiện trên trang single product và cart
	// Đăng ký DOM để thao tác trên trang cart
	$( document.body ).on( 'click', '.quantity .minus', function() {
		setQuantity( 'minus', this )
	} )

	$( document.body ).on( 'click', '.quantity .plus', function() {
		setQuantity( 'plus', this )
	} )

	function setQuantity( type, ele ) {
		const input = $( ele ).parent().children( 'input.qty' )
		const currentQuantity = parseInt( input.val() || 0 )

		if ( type === 'plus' ) {
			input.val( currentQuantity + 1 ).change()
		}

		if ( type === 'minus' && currentQuantity > 1 ) {
			input.val( currentQuantity - 1 ).change()
		}
	}

	// Click và để show nút search trên mobile
	$( '.search-button' ).click( function( e ) {
		e.preventDefault()

		$( '.search-holder' ).toggleClass( 'search-active' )
		$( 'body' ).toggleClass( 'disabled-scroll' )
	} )
	$( '.search-holder-close' ).click( function( e ) {
		e.preventDefault()

		$( '.search-holder' ).removeClass( 'search-active' )
		$( 'body' ).removeClass( 'disabled-scroll' )
	} )

	// Click nut menu tren bottom mobile va show menu
	$( '.categories' ).click( function( e ) {
		e.preventDefault()

		$( '.clt-site-mask' ).toggleClass( 'darken' )
		$( '.site-offcanvas' ).toggleClass( 'site-offcanvas-active' )
	} )

	// Position vị trí top nav của mobile khi kéo xuống
	$( window ).scroll( function() {
		if ( $( window ).scrollTop() > 50 ) {
			$( '.clt-header-mobile' ).css( 'position', 'fixed' )
			$( '.search-holder' ).addClass( 'search-form-position' )
		} else {
			$( '.clt-header-mobile' ).css( 'position', 'inherit' )
			$( '.search-holder' ).removeClass( 'search-form-position' )
		}
	} )

	// Notice model
	// Khi có sự kiện add to cart hiển thị popup cart
	$( document.body ).on(
		'added_to_cart',
		function( event, fragments, cartHash, $button ) {
			const label =
				$( $button[ 0 ] ).attr( 'aria-label' ) || $( '.product_title' ).html()

			const productId = $( $button[ 0 ] ).data( 'product_id' )

			$( '.add_to_cart_button[data-product_id="' + productId + '"]' ).prop(
				'disabled',
				false
			)
			// Cập nhật lại số lượng trong giỏ hàng
			updateCartCount()
			// Popup Thông báo
			if ( label ) {
				Swal.mixin( {
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: ( toast ) => {
						toast.addEventListener( 'mouseenter', Swal.stopTimer )
						toast.addEventListener( 'mouseleave', Swal.resumeTimer )
					}
				} ).fire( {
					icon: 'success',
					title: label,
					html: '<a href="/cart" class="view-cart">View Cart</a>',
					target: '#notice'
				} )
			}
		}
	)
	// Khi co su kien remove cart
	$( document.body ).on( 'removed_from_cart updated_cart_totals', function() {
		updateCartCount( $( '.cart-count' ) )
	} )

	// Whish list
	function setCookie( name, value ) {
		document.cookie = name + '=' + value + '; Path=/;'
	}

	function getCookie( name ) {
		const value = `; ${ document.cookie }`
		const parts = value.split( `; ${ name }=` )
		if ( parts.length === 2 ) {
			return parts.pop().split( ';' ).shift()
		}
	}

	function deleteCookie( name ) {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
	}

	// Set wishlist count và active sản phẩm đã thêm vào wishlist
	function activeProductAddToWishlist() {
		if ( getCookie( 'woocommerce_wishlist' ) ) {
			const arrProductId = getCookie( 'woocommerce_wishlist' ).split( ',' )
			$( '.wishlist_products_counter_number' ).html( arrProductId.length )
			// Active sản phẩm đã thêm vào wishlist
			$( '.add_to_wishlist_button' ).removeClass( 'addedwl' )
			arrProductId.forEach( ( element ) => {
				$( '[data-product_id="' + element + '"]' ).addClass( 'addedwl' )
			} )
		} else {
			$( '.add_to_wishlist_button' ).removeClass( 'addedwl' )
			$( '.wishlist_products_counter_number' ).html( 0 )
		}
	}

	activeProductAddToWishlist()

	// Khi click vào nút add to whishlist bất kỳ
	$( document.body ).on( 'click', '.add_to_wishlist_button', function( e ) {
		e.preventDefault()

		const thisProductId = $( this ).data( 'product_id' )
		let thisProductLabel = $( this ).attr( 'aria-label' )
		const wishListCookieKey = 'woocommerce_wishlist'

		// Kiểm tra cookies wishlist đã tồn tại chưa nếu chưa thì tạo mới
		if (
			getCookie( wishListCookieKey ) === undefined ||
			getCookie( wishListCookieKey ) === ''
		) {
			setCookie( wishListCookieKey, thisProductId )
		} else {
			const getCookieValue = getCookie( wishListCookieKey )
			// Kiểm tra product ID tồn tại chưa nếu chưa tồn tại thì thêm vào cookie
			if ( ! getCookieValue.includes( thisProductId ) ) {
				deleteCookie( wishListCookieKey )
				setCookie( wishListCookieKey, getCookieValue + ',' + thisProductId )
				// Alert content
				thisProductLabel = 'Add product ' + thisProductLabel + ' to wishlist'
			} else {
				let newWishlistCookie = ''

				if ( ! getCookieValue.includes( ',' ) ) {
					newWishlistCookie = getCookieValue.replace( thisProductId, '' )
				} else {
					newWishlistCookie = getCookieValue
						.replace( ',' + thisProductId, '' )
						.replace( thisProductId + ',', '' )
				}

				deleteCookie( wishListCookieKey )
				setCookie( wishListCookieKey, newWishlistCookie )
				// Alert content
				thisProductLabel =
					'Remove product ' + thisProductLabel + ' from wishlist'
			}
		}
		activeProductAddToWishlist()

		// Hiện thông báo đã thêm thành công
		Swal.mixin( {
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: ( toast ) => {
				toast.addEventListener( 'mouseenter', Swal.stopTimer )
				toast.addEventListener( 'mouseleave', Swal.resumeTimer )
			}
		} ).fire( {
			icon: 'success',
			title: thisProductLabel,
			html: '<a class="view-wishlist" href="/wishlist">View Wishlist</a>',
			target: '#notice'
		} )
	} )

	// Quick view product
	function showQuickViewProduct( productId ) {
		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'POST',
			data: {
				action: 'clt_ajax_quick_view_product',
				product_id: productId
			},
			beforeSend: function() {
				$( '.quick-view-product-content .added_to_cart' ).hide()
			},
			success: function( response ) {
				const data = response.data

				$( '.btn-quick-add-to-cart, .hasSize' )
					.removeClass( 'disabled' )
					.removeClass( 'lazy-loading' )

				// render product
				// Slider
				let slider =
					'<div class="swiper-slide"><img src="' +
					data.thumbnail[ 0 ] +
					'"></div>'
				data.gallery_image.map( ( item ) => {
					slider +=
						'<div class="swiper-slide"><img src="' + item[ 0 ] + '"></div>'
				} )
				$( '.quick-view-product-content .list-thumbnail .swiper-wrapper' ).html(
					slider
				)

				// Content
				// Title
				$( '.quick-view-product-content .entry-title' ).html(
					'<a href="' + data.permalink + '">' + data.title + '</a>'
				)
				// Price
				$( '.quick-view-product-content .price' ).html( data.price )
				// Short description
				$(
					'.quick-view-product-content .woocommerce-product-details__short-description'
				).html( data.short_decription )

				// Xét trường hợp là variable
				if ( data.type === 'variable' ) {
					let attributes = ''

					// Add attribute vao form
					$( '.quick-view-product-content form' )
						.addClass( 'variations_form' )
						.attr( 'action', data.permalink )
						.attr( 'data-product_id', data.id )
						.attr( 'current-image', data.image_id )
						.attr(
							'data-product_variations',
							JSON.stringify( data.available_variations )
						)
					// Add attribute vao input

					$(
						'.quick-view-product-content .variations_button input[name="product_id"]'
					).val( data.id )
					// Nhóm attributes variable
					Object.keys( data.special_attributes ).map( ( key ) => {
						// Trường hợp đặc biệt nếu là color
						let cltTypeColor = ''
						if ( key === 'pa_color' ) {
							cltTypeColor +=
								'<div class="clt-terms clt-type-color" data-attribute="pa_color">'

							data.special_attributes[ key ].map( ( value ) => {
								cltTypeColor +=
									'<span class="clt-term" data-variable_id="" data-term="' +
									value.slug +
									'" data-name="' +
									value.name +
									'" style="background-color:' +
									value.color +
									'"></span>'
							} )
							cltTypeColor += '</div>'
						}
						let options = '<option value="">Choose an option</option>'

						data.special_attributes[ key ].map( ( value ) => {
							options +=
								'<option value="' +
								value.slug +
								'" >' +
								value.name +
								'</option>'
						} )
						attributes +=
							'<tr><th class="label"> <label for="' +
							key +
							'"> ' +
							key.split( '_' )[ 1 ] +
							' <span class="selected-value">: </span> </label> </th>    <td class="value">' +
							cltTypeColor +
							' <select id="' +
							key +
							'" class="" name="attribute_pa_size" data-attribute_name="attribute_pa_size" data-show_option_none="yes"> ' +
							options +
							' </select></td></tr>'
					} )
					$( '.quick-view-product-content tbody' ).html( attributes )
				}

				// Reset quantity
				$( '.quick-view-product-content .qty' ).val( 1 )

				// wishlist
				$( '.quick-view-product-content .add_to_wishlist_button ' ).attr(
					'data-product_id',
					data.id
				)

				// SKU
				$( '.quick-view-product-content .product_meta .sku' ).html( data.sku )
				// Categories
				$( '.quick-view-product-content .product_meta .posted_in' ).html(
					'Categories: ' + data.categories
				)
				// Tags
				if ( data.tags ) {
					$( '.quick-view-product-content .product_meta .tagged_as' ).html(
						'Tags: ' + data.tags
					)
				} else {
					$( '.quick-view-product-content .product_meta .tagged_as' ).remove()
				}

				// Kiểm tra sản phẩm có add to wishlist chưa
				activeProductAddToWishlist()

				// Popup quickview
				const html = $( '#quick-view-model' ).html()
				$( '#quick-view-model' ).html( html )
				$( '#quick-view-model' ).modal( 'toggle' )

				// Khởi tạo swiper js
				if ( $( '.product-left' ).length ) {
					const productSlider = new Swiper( '.product-slider', {
						spaceBetween: 0,
						centeredSlides: false,
						loop: true,
						direction: 'horizontal',
						loopedSlides: 5,
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev'
						},
						resizeObserver: true
					} )

					const productThumbs = new Swiper( '.product-thumbs', {
						spaceBetween: 10,
						centeredSlides: false,
						loop: true,
						slideToClickedSlide: true,
						direction: 'horizontal',
						slidesPerView: 5,
						loopedSlides: 5
					} )
					productSlider.controller.control = productThumbs
					productThumbs.controller.control = productSlider
				}

				const attributeData = $(
					'.quick-view-product-content .variations_form'
				).data( 'product_variations' )

				// Khi select color preview sản phẩm theo
				$( document.body ).on(
					'click',
					'.quick-view-product-content .clt-term',
					function() {
						$( '.quick-view-product-content .clt-term' ).removeClass( 'selected' )
						$( this ).addClass( 'selected' )
						const colorTerm = $( this ).data( 'term' )
						const nameColor = $( this ).data( 'name' )

						$(
							'.quick-view-product-content .variations label[for="pa_color"] .selected-value'
						).html( ': ' + nameColor )
						$( '.quick-view-product-content #pa_color' ).val( colorTerm ).change()
						// const variableId = $( this ).data( 'variable_id' )

						attributeData.map( function( item ) {
							if ( colorTerm === item.attributes.attribute_pa_color ) {
								$(
									'.quick-view-product-content .product-slider .swiper-slide-active img'
								).attr( 'src', item.image.thumb_src )
							}
						} )
					}
				)
			}
		} )
	}

	// Nhấn và show quick view product
	$( document.body ).on( 'click', '.ajax_quick_view_product', function( e ) {
		e.preventDefault()
		const productId = $( this ).data( 'product_id' )
		$( this ).addClass( 'disabled' ).addClass( 'lazy-loading' )
		showQuickViewProduct( productId )
	} )

	// Đóng Quick view product
	$( document.body ).on( 'click', '.close-quickview', () => {
		$( '#quick-view-model' ).modal( 'toggle' )
	} )

	// Add to cart ajax
	function addToCart( data, form, productName ) {
		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'POST',
			data: data,
			dataType: 'json',
			beforeSend: function() {
				$(
					'.btn-quick-add-to-cart[data-product_id="' +
						data.product_id +
						'"], .product_type_simple[data-product_id="' +
						data.product_id +
						'"]'
				)
					.addClass( 'disabled' )
					.addClass( 'lazy-loading' )

				$( document.body ).trigger( 'adding_to_cart', [
					$( '.single_add_to_cart_button' ),
					form.serialize()
				] )
				$( 'input, button', form ).prop( 'disabled', true )
			},
			success: function( response ) {
				$(
					'.btn-quick-add-to-cart[data-product_id="' +
						data.product_id +
						'"], .product_type_simple[data-product_id="' +
						data.product_id +
						'"], .quick-view-product-content .single_add_to_cart_button, .quick-add-to-cart .btn-quick-add-to-cart'
				)
					.removeClass( 'disabled' )
					.removeClass( 'lazy-loading' )

				$( '.quick-view-product-content .added_to_cart' ).show()

				$( 'input, button', form ).prop( 'disabled', false )
				if ( response.error ) {
				} else {
					$( document.body ).trigger( 'added_to_cart', [
						response.fragments,
						response.cart_hash,
						$( '.single_add_to_cart_button' )
					] )
				}
				// alert if success
				Swal.mixin( {
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: ( toast ) => {
						toast.addEventListener( 'mouseenter', Swal.stopTimer )
						toast.addEventListener( 'mouseleave', Swal.resumeTimer )
					}
				} ).fire( {
					icon: 'success',
					title: productName,
					html: '<a href="/cart" class="view-Cart">View Cart</a>',
					target: '#notice'
				} )
			}
		} )
	}

	// quick Add to cart cho simple product
	$( '.product_type_simple' ).on( 'click', function( e ) {
		e.preventDefault()

		if ( ! $( this ).hasClass( 'disabled' ) ) {
			const productId = $( this ).data( 'product_id' )
			const label = $( this ).attr( 'aria-label' )
			const form = $( '.clt-single-product-wrapper .cart' )
			const data = {
				action: 'clt_ajax_add_to_cart',
				type: 'simple',
				product_id: productId,
				list_product: '',
				quantity: 1
			}

			addToCart( data, form, label )
		}
	} )

	// Select color sẽ cho phép preview sản phẩm "Sản phẩm"
	$( document.body ).on(
		'click',
		'.quick-add-to-cart .clt-type-color .clt-term',
		function() {
			const imgUrl = $( this ).data( 'img_url' )
			const productId = $( this ).data( 'product_id' )

			$( this ).parent().children( '.clt-term' ).removeClass( 'selected' )
			$( this ).addClass( 'selected' )

			const thisParent = $( this )
				.parent()
				.parent()
				.children( '.btn-quick-add-to-cart' )

			thisParent.removeClass( 'disabled' ).removeClass( 'none-select' )
			thisParent.children( 'span' ).html( 'Add to cart' )

			if ( imgUrl ) {
				$( '#product-' + productId + ' .product-carousel-image img' ).attr(
					'src',
					imgUrl
				)
				$( '.post-' + productId + ' img' )
					.attr( 'src', imgUrl )
					.attr( 'srcset', imgUrl )
			}
		}
	)

	// Quick add to cart chỉ áp dụng sản phẩm có một variation color
	$( document.body ).on(
		'click',
		'.quick-add-to-cart .btn-quick-add-to-cart',
		function( e ) {
			e.preventDefault()
			const productId = $( this ).data( 'product_id' )

			if ( ! $( this ).hasClass( 'disabled' ) ) {
				if ( ! $( this ).hasClass( 'none-select' ) ) {
					const thisEle = $( this ).parent()
					const form = $( '.quick-add-to-cart form' )
					const productName = $( this ).data( 'name' )
					const size = thisEle
						.children( 'select[name="attribute_pa_size"]' )
						.val()
					const color = thisEle
						.children( '.clt-type-color ' )
						.children( '.clt-term.selected' )
						.data( 'term' )

					const variationId = thisEle
						.children( '.clt-type-color ' )
						.children( '.clt-term.selected' )
						.data( 'variable_id' )

					let statusColor = true
					let statusSize = true

					if ( thisEle.find( '.clt-type-color' ).length === 1 ) {
						if ( thisEle.find( '.clt-type-color .selected' ).length === 1 ) {
							statusColor = true
						} else {
							statusColor = false
						}
					}

					if ( thisEle.find( '.pa_size' ).length === 1 ) {
						if (
							thisEle.children( 'select[name="attribute_pa_size"]' ).val() === ''
						) {
							statusSize = false
						}
					}

					if ( statusColor && statusSize ) {
						const data = {
							action: 'clt_ajax_add_to_cart',
							type: 'variable',
							product_id: productId,
							quantity: 1,
							variation_id: variationId,
							list_product: '',
							variation_option: {
								color: color,
								size: size
							}
						}

						addToCart( data, form, productName )
					} else {
						Swal.fire( {
							icon: 'error',
							text: 'Please select variation!'
						} )
					}
				} else {
					$( this ).addClass( 'disabled' ).addClass( 'lazy-loading' )
					showQuickViewProduct( productId )
				}
			}
		}
	)

	// khi sản phẩm có variantion ngoài color thì show quick view
	$( document.body ).on( 'click', '.quick-add-to-cart .hasSize', function( e ) {
		e.preventDefault()
		const productId = $( this ).data( 'product_id' )

		if ( ! $( this ).hasClass( 'disabled' ) ) {
			$( this ).addClass( 'disabled' ).addClass( 'lazy-loading' )
			showQuickViewProduct( productId )
		}
	} )

	// Quick view Add to cart
	// Add to cart
	$( document.body ).on(
		'click',
		'.quick-view-product-content .single_add_to_cart_button',
		function( e ) {
			e.preventDefault()

			const hasColor = $( '#pa_color' ).val()
			const hasSize = $( '#pa_size' ).val()

			if ( hasColor === '' ) {
				Swal.fire( {
					icon: 'error',
					text: 'Please choose color!',
					allowOutsideClick: false
				} )
				return
			}
			if ( hasSize === '' ) {
				Swal.fire( {
					icon: 'error',
					text: 'Please choose size!',
					allowOutsideClick: false
				} )
				return
			}

			if ( ! $( this ).hasClass( 'disabled' ) ) {
				$( this ).addClass( 'disabled' ).addClass( 'lazy-loading' )
				const form = $( '.quick-view-product-content form' )
				const color = $( '.quick-view-product-content #pa_color' ).val()
				const size = $( '.quick-view-product-content #pa_size' ).val()
				const quantity = $( '.quick-view-product-content .input-text.qty' ).val()
				const productName = $(
					'.quick-view-product-content .product_title a'
				).html()
				const productId = $( '.quick-view-product-content form' ).data(
					'product_id'
				)

				let variationId = ''
				const attributeData = $(
					'.quick-view-product-content .variations_form'
				).data( 'product_variations' )

				if ( color && size ) {
					attributeData.map( function( item ) {
						if (
							color === item.attributes.attribute_pa_color &&
							size === item.attributes.attribute_pa_size
						) {
							variationId = item.variation_id
						}
					} )
				} else if ( size ) {
					attributeData.map( function( item ) {
						if ( size === item.attributes.attribute_pa_size ) {
							variationId = item.variation_id
						}
					} )
				} else if ( color ) {
					attributeData.map( function( item ) {
						if ( color === item.attributes.attribute_pa_color ) {
							variationId = item.variation_id
						}
					} )
				}

				if ( variationId === '' ) {
					attributeData.map( function( item ) {
						if ( color === item.attributes.attribute_pa_color ) {
							variationId = item.variation_id
						}
					} )
				}

				if ( ! variationId ) {
					variationId = attributeData[ 0 ].variation_id
				}

				const dataAddToCart = {
					action: 'clt_ajax_add_to_cart',
					type: 'variable',
					product_id: productId,
					quantity: quantity,
					variation_id: variationId,
					list_product: '',
					variation_option: {
						color: color,
						size: size
					}
				}

				addToCart( dataAddToCart, form, productName )
			}
		}
	)
} )

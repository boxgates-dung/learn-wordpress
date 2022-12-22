import Swal from 'sweetalert2'

$( document ).ready( function() {
	function setCookie( name, value ) {
		document.cookie = name + '=' + value + '; Path=/;'
	}

	function getCookies( name ) {
		const value = `; ${ document.cookie }`
		const parts = value.split( `; ${ name }=` )
		if ( parts.length === 2 ) {
			return parts.pop().split( ';' ).shift()
		}
	}

	function deleteCookie( name ) {
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
	}
	// Xóa item trong wishlist
	function deleteItemWishlist( productId ) {
		const wishListCookieKey = 'woocommerce_wishlist'
		const getWishlistCookie = getCookies( wishListCookieKey )

		// Check cookie wishlist có tồn tại hay không
		if ( getWishlistCookie ) {
			// Tách chuỗi thành mảng
			const arrId = getWishlistCookie.split( ',' )
			// Xóa id sản phẩm có trong mảng
			const index = arrId.indexOf( productId.toString() )
			if ( index > -1 ) {
				arrId.splice( index, 1 )
			}

			// Kiểm tra mảng có rổng hay không
			if ( arrId.length > 0 ) {
				deleteCookie( wishListCookieKey )
				setCookie( wishListCookieKey, arrId.toString() )

				$( 'tr.item-' + productId ).remove()
			} else {
				deleteCookie( wishListCookieKey )
				window.location.reload()
			}

			checkBtnAction()
			// Cập nhật wishlist count
			$( '.wishlist_products_counter_number' ).html( arrId.length )
		}
	}

	// Add item wishlist to cart
	function addItemWishlistToCart( listProductId ) {
		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'GET',
			data: {
				action: 'clt_ajax_add_wishlist_item_to_cart',
				list_product_id: listProductId
			},
			success: function( response ) {
				checkBtnAction()

				$( document.body ).trigger( 'added_to_cart', [
					response.fragments,
					response.cart_hash,
					$( '.button wishlist-action-product-apply' )
				] )
			}
		} )
	}

	// Xóa tất cả các item trong wishlist
	$( '.wishlist-action-remove-all' ).click( function( e ) {
		e.preventDefault()
		deleteCookie( 'woocommerce_wishlist' )
		window.location.reload()
	} )

	// Thêm tất cả các item wishlist vào cart
	$( '.wishlist-action-add-all' ).click( function( e ) {
		e.preventDefault()

		const arrIdAddToCart = []
		let simpleTxt = ''
		let variationTxt = ''

		$( 'form tbody tr' ).each( function() {
			const productId = $( this ).data( 'product_id' )
			const productName = $( this ).data( 'product_name' )
			const isOutstock = $( this ).attr( 'is-outstock' )
			const isSimple = $( this ).attr( 'is-simple' )

			if ( isSimple === 'true' && isOutstock === 'false' ) {
				simpleTxt += '“' + productName + '”,'
				arrIdAddToCart.push( productId )
			} else {
				variationTxt += '“' + productName + '”,'
			}
		} )

		if ( variationTxt ) {
			variationTxt =
				'<p style="color: #ee403d; margin-bottom: 10px;">' +
				variationTxt +
				'could not be added to the cart because some requirements are not met.</p>'
		}

		if ( arrIdAddToCart.length > 0 ) {
			addItemWishlistToCart( arrIdAddToCart )
			simpleTxt =
				'<p style="color: #61CE70;">' +
				simpleTxt +
				' have been added to your cart </p>'
		}

		if ( ! simpleTxt ) {
			Swal.fire( {
				icon: 'error',
				html: variationTxt + '<br />' + simpleTxt
			} )
		} else {
			Swal.fire( {
				icon: 'success',
				html: variationTxt + '<br />' + simpleTxt
			} )
		}
	} )

	// Xóa từng item trong wishlist
	$( '.remove_from_wishlist_button' ).click( function( e ) {
		e.preventDefault()
		const productId = $( this ).data( 'product_id' )

		deleteItemWishlist( productId )
	} )

	// Whishlist option button
	$( '.wishlist-action-product-apply' ).click( function( e ) {
		e.preventDefault()

		if ( ! $( '.wishlist-action-product-apply' ).hasClass( 'disabled' ) ) {
			const option = $( '#clt-wishlist-actions-select' ).val()
			if ( option === 'remove_selected' ) {
				// Option lựa chọn xóa item select -  Xóa tất cả các item chọn
				$( 'form tbody tr' ).each( function() {
					const productId = $( this ).data( 'product_id' )
					const checkbox = $( '.product-cb [value="' + productId + '"]' ).prop(
						'checked'
					)

					if ( checkbox ) {
						deleteItemWishlist( productId )
					}
				} )
				checkBtnAction()
				Swal.fire( {
					icon: 'success',
					html: 'Deleted item success!'
				} )
			} else if ( option === 'add_to_cart_selected' ) {
				// Option add item to cart nếu được select
				const arrIdAddToCart = []
				let simpleTxt = ''
				let variationTxt = ''

				$( 'form tbody tr' ).each( function() {
					const productId = $( this ).data( 'product_id' )
					const productName = $( this ).data( 'product_name' )
					const isSimple = $( this ).attr( 'is-simple' )
					const isOutstock = $( this ).attr( 'is-outstock' )
					const checkbox = $( '.product-cb [value="' + productId + '"]' ).prop(
						'checked'
					)

					if ( checkbox ) {
						if ( isSimple === 'true' && isOutstock === 'false' ) {
							simpleTxt += '“' + productName + '”,'

							arrIdAddToCart.push( productId )
						} else {
							variationTxt += '“' + productName + '”,'
						}
					}
				} )

				if ( variationTxt ) {
					variationTxt =
						'<p style="color: #ee403d; margin-bottom: 10px;">' +
						variationTxt +
						'could not be added to the cart because some requirements are not met.</p>'
				}

				if ( arrIdAddToCart.length > 0 ) {
					addItemWishlistToCart( arrIdAddToCart )
					simpleTxt =
						'<p style="color: #61CE70;">' +
						simpleTxt +
						' have been added to your cart </p>'
				}
				checkBtnAction()
				if ( ! simpleTxt ) {
					Swal.fire( {
						icon: 'error',
						html: variationTxt + '<br />' + simpleTxt
					} )
				} else {
					Swal.fire( {
						icon: 'success',
						html: variationTxt + '<br />' + simpleTxt
					} )
				}
			} else {
				Swal.fire( {
					icon: 'error',
					html: 'No actions are selected.!'
				} )
			}
		} else {
			Swal.fire( {
				icon: 'error',
				html: 'No item selected!'
			} )
		}
	} )

	// Select all
	$( '.table-manage-wishlist thead .product-cb input' ).click( function() {
		const checkStatus = $( this ).is( ':checked' )
		if ( checkStatus ) {
			$( '.table-manage-wishlist tbody .product-cb input' ).prop( 'checked', true )
			$( '.wishlist-action-product-apply' ).removeClass( 'disabled' )
		} else {
			$( '.table-manage-wishlist tbody .product-cb input' ).prop( 'checked', false )
			$( '.wishlist-action-product-apply' ).addClass( 'disabled' )
		}
	} )

	// Kiểm tra có check box nào select thì active action button
	$( '.table-manage-wishlist tbody .product-cb input' ).click( function() {
		checkBtnAction()
	} )

	function checkBtnAction() {
		const productId = []
		$( '.table-manage-wishlist tbody tr' ).each( function() {
			const checkStatus = $( this )
				.children( '.product-cb' )
				.children( 'input' )
				.is( ':checked' )

			if ( checkStatus ) {
				productId.push( '0' )
			}
		} )
		if ( productId.length > 0 ) {
			$( '.wishlist-action-product-apply' ).removeClass( 'disabled' )
		} else {
			$( '.wishlist-action-product-apply' ).addClass( 'disabled' )
		}
	}
} )

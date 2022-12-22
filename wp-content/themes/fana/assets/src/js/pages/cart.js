$( document ).ready( function() {
	// Xóa tất cả sản phẩm trong giỏi hàng
	$( '.clear-cart-button' ).click( function( e ) {
		e.preventDefault()

		$.ajax( {
			url: '/wp-admin/admin-ajax.php',
			type: 'GET',
			data: {
				action: 'clt_ajax_empty_cart'
			},
			success: function() {
				window.location.reload()
			}
		} )
	} )
	//

	$( document.body ).on(
		'click',
		'.woocommerce-cart-form tbody .product-remove .remove',
		function() {
			const countItems = $(
				'.woocommerce-cart-form tbody .woocommerce-cart-form__cart-item'
			).length

			if ( countItems === 1 ) {
				$( '.cart-count' ).html( '0' )
			}
		}
	)
} )

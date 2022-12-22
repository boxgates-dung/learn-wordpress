$( document ).ready( function() {
	$( '.filter-button' ).click( function( e ) {
		e.preventDefault()
		$( '.shop-sidebar' ).toggleClass( 'open' )
	} )
	$( '.close-sidebar' ).click( function( e ) {
		e.preventDefault()
		$( '.shop-sidebar' ).removeClass( 'open' )
	} )

	// Khi click vào categories show nó ra
	$( '.widget_product_categories .cat-parent' ).append(
		'<span class="subDropdown plus"></span>'
	)

	$( '.widget_product_categories .cat-parent .subDropdown' )
		.removeClass( 'minus' )
		.addClass( 'plus' )

	$( '.widget_product_categories .cat-parent.current-cat-parent > .subDropdown' )
		.removeClass( 'plus' )
		.addClass( 'minus' )

	$( '.widget_product_categories .current-cat.cat-parent > .subDropdown' )
		.removeClass( 'plus' )
		.addClass( 'minus' )
	$(
		'.widget_product_categories .cat-parent.current-cat-parent .cat-parent.current-cat-parent .subDropdown'
	)
		.removeClass( 'plus' )
		.addClass( 'minus' )

	$( '.subDropdown' ).click( function() {
		if ( $( this ).hasClass( 'plus' ) ) {
			$( this ).removeClass( 'plus' ).addClass( 'minus' )
		} else {
			$( this ).removeClass( 'minus' ).addClass( 'plus' )
		}

		const ele = $( this ).parent()
		ele.children( 'ul' ).slideToggle()
	} )
} )

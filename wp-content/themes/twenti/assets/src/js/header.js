jQuery( document ).ready( function() {
	const siteMask = $( '.clt-site-mask' )
	let removeClass = true
	// Navbar menu
	$( '#side-menu-toggle' ).click( function() {
		$( '.clt-side-menu' ).toggleClass( 'active' )
	} )

	// Left sidebar
	$( '.toggle-canvas-menu' ).click( function() {
		if ( ! siteMask.hasClass( 'darken' ) ) {
			siteMask.addClass( 'darken' )
			$( '.site-offcanvas' ).addClass( 'site-offcanvas-active' )
		}
	} )

	$( '.clt-site-mask, .offcanvas-close' ).click( function() {
		if ( siteMask.hasClass( 'darken' ) ) {
			siteMask.removeClass( 'darken' )
			$( '.site-offcanvas' ).removeClass( 'site-offcanvas-active' )
		}
	} )

	// Topbar social button
	$( '.header-social-btn' ).click( function() {
		$( this ).find( '.social-dropdown' ).toggleClass( 'd-none' )
		return ! removeClass
	} )

	$( 'html' ).click( function() {
		if ( removeClass ) {
			$( '.social-dropdown' ).addClass( 'd-none' )
		}
		removeClass = true
	} )

	// Canva menu
	$( '.site-offcanvas .site-offcanvas-body .menu-item-has-children > a' ).click( function() {
		const ele = $( this ).parent()
		ele.children( 'ul' ).slideToggle()
		return false
	} )
} )

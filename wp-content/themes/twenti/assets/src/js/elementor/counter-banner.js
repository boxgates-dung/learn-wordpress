jQuery( window ).on( 'elementor/frontend/init', () => {
	window.elementorFrontend.hooks.addAction(
		'frontend/element_ready/CLT_Counter_Banner.default',
		CLTCountDown
	)
} )

function CLTCountDown() {
	$( '.countdown' ).each( function() {
		const countDate = $( this ).attr( 'data-date' )
		const expired = $( this ).attr( 'data-text' )
		const countDownDate = new Date( countDate ).getTime()

		const d = $( this ).find( '.days' )
		const h = $( this ).find( '.hours' )
		const m = $( this ).find( '.minutes' )
		const s = $( this ).find( '.second' )

		const interval = setInterval( function() {
			const now = new Date().getTime()

			const distance = countDownDate - now

			const days = Math.floor( distance / ( 1000 * 60 * 60 * 24 ) )
			const hours = Math.floor(
				( distance % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 )
			)
			const minutes = Math.floor( ( distance % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) )
			const seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000 )

			d.html( ( '0' + days ).slice( -2 ) )
			h.html( ( '0' + hours ).slice( -2 ) )
			m.html( ( '0' + minutes ).slice( -2 ) )
			s.html( ( '0' + seconds ).slice( -2 ) )

			if ( distance < 0 ) {
				clearInterval( interval )
				$( this ).html( '<div class="expired">' + expired + '</div>' )
			}
		}, 1000 )
	} )
}

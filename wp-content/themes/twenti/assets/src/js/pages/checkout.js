jQuery( document ).ready( function() {
	$( '.woocommerce-checkout' ).validate( {
		rules: {
			billing_first_name: 'required',
			billing_last_name: 'required',
			billing_address_1: 'required',
			billing_city: 'required',
			billing_postcode: {
				required: true
			},
			billing_phone: {
				required: true
			},
			billing_email: {
				required: true,
				email: true
			}
		},
		messages: {
			billing_first_name: 'Please enter your first name',
			billing_last_name: 'Please enter your last name',
			billing_address_1: 'Please enter your address',
			billing_city: 'Please enter your city',
			billing_postcode: {
				required: 'Please enter your post code',
				number: 'Zip code incorrect'
			},
			billing_phone: 'Please enter your phone number',
			billing_email: {
				required: 'Please enter your email address',
				email: 'Email address incorrect'
			}
		},
		submitHandler: function( form ) {
			form.submit()
		}
	} )
} )

jQuery( document ).ready( function() {
	// Login Form
	$( '.woocommerce-form-login' ).validate( {
		rules: {
			username: {
				required: true
			},
			password: {
				required: true,
				minlength: 6
			}
		},
		messages: {
			username: {
				required: 'Please enter your email'
			},
			password: {
				required: 'Please enter your password',
				minlength: 'Your password min length 6'
			}
		}
	} )

	// Registor Form
	$( '.woocommerce-form-register' ).validate( {
		rules: {
			username: 'required',
			email: { required: true, email: true },
			password: { required: true, minlength: 6 }
		},
		messages: {
			username: 'Please enter your user name',
			email: {
				required: 'Please enter your Email',
				email: 'Is not email address'
			},
			password: {
				required: 'Please enter your password',
				minlength: 'Your password min length 6'
			}
		}
	} )

	//lost reset password form
	$( '.lost_reset_password' ).on( 'submit', function() {
		$( '.woocommerce-Button' ).prop( 'disabled', false )
	} )

	$( '.lost_reset_password' ).validate( {
		rules: {
			user_login: 'required'
		},
		messages: {
			user_login: 'Please enter your user name or email'
		}
	} )

	// Edit account
	$( '.edit-account' ).validate( {
		rules: {
			account_first_name: 'required',
			required: 'required',
			account_last_name: 'required',
			account_display_name: 'required',
			account_email: { required: true, email: true },
			password_1: { minlength: 0 },
			password_2: { minlength: 0, equalTo: '[name="password_1"]' }
		},
		messages: {
			account_first_name: {
				required: 'Please enter your first name'
			},
			account_last_name: {
				required: 'Please enter your last name'
			},
			account_display_name: {
				required: 'Please enter your display name'
			},
			account_email: {
				required: 'Please enter your Email',
				email: 'Is not email address'
			},
			password_2: {
				required: 'Please enter the same password again as above'
			}
		}
	} )

	// Address
	$( '.woocommerce-MyAccount-content form' ).validate( {
		rules: {
			billing_first_name: 'required',
			billing_last_name: 'required',
			billing_address_1: 'required',
			billing_city: 'required',
			billing_phone: 'required',
			billing_email: 'required',
			billing_postcode: 'required',
			shipping_first_name: 'required',
			shipping_last_name: 'required',
			shipping_address_1: 'required',
			shipping_city: 'required'
		},
		messages: {
			billing_first_name: {
				required: 'Please enter your billing first name'
			},
			billing_last_name: {
				required: 'Please enter your billing last name'
			},
			billing_address_1: {
				required: 'Please enter your billing address'
			},
			billing_city: {
				required: 'Please enter your billing city'
			},
			billing_phone: {
				required: 'Please enter your billing phone'
			},
			billing_email: {
				required: 'Please enter your billing email',
				email: 'Is not email address'
			},
			billing_postcode: {
				required: 'Please enter your billing postcode'
			},
			shipping_first_name: {
				required: 'Please enter your shipping first name'
			},
			shipping_last_name: {
				required: 'Please enter your shipping last name'
			},
			shipping_address_1: {
				required: 'Please enter your shipping address'
			},
			shipping_city: {
				required: 'Please enter your shipping city'
			}
		}
	} )
} )
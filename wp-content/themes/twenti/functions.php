<?php
define("THEME_URL", get_template_directory_uri());
define("THEME_PATH", get_template_directory());
define("THEME_DOMAIN", 'fana');

// require_once 'inc/customizer.php';
// require_once 'inc/ajaxAction.php';
// require_once 'inc/widgets/widget-filter-by-attribute.php';
// require_once 'inc/widgets/widget-random-post.php';
// require_once 'inc/woocommerce.php';
require_once 'elementor/elementor.php';

function is_elementor_active()
{
	return class_exists('Elementor\Plugin');
}

// function setup_theme()
// {
// 	//	load_theme_textdomain(THEME_DOMAIN, THEME_PATH . '/languages');
// 	add_theme_support('post-thumbnails');

// 	set_post_thumbnail_size(600, 376, true);
// 	register_nav_menus(
// 		array(
// 			'primary' => __('Primary', THEME_DOMAIN),
// 			'footer' => __('Footer Menu', THEME_DOMAIN),
// 			'social' => __('Social Links Menu', THEME_DOMAIN),
// 			'sidebar' => __('Sidebar', THEME_DOMAIN),
// 		)
// 	);
// 	add_theme_support('align-wide');
// 	add_theme_support(
// 		'custom-logo',
// 		array(
// 			'height' => 190,
// 			'width' => 190,
// 			'flex-width' => true,
// 			'flex-height' => true,
// 		)
// 	);
// 	// Add support for editor styles.
// 	add_theme_support('editor-styles');
// 	// Enqueue editor styles.
// 	add_editor_style('style-editor.css');

// 	remove_theme_support('widgets-block-editor');
// 	add_theme_support('woocommerce');
// }
// add_action('after_setup_theme', 'setup_theme');

// // Load styles và scripts
// add_action('wp_enqueue_scripts', function () {
// 	//Remove Gutenberg Block Library CSS from loading on the frontend
// 	wp_dequeue_style('wp-block-library');
// 	wp_dequeue_style('wp-block-library-theme');

// 	$version = filemtime(THEME_PATH . '/assets/public/js/app.min.js');
// 	wp_enqueue_style(THEME_DOMAIN . '-vendor', THEME_URL . "/assets/public/css/vendors.css", [], $version);

// 	$theme = get_theme_mod('fana_setting_theme_settings');

// 	if ($theme == 'theme_yellow') {
// 		wp_enqueue_style(THEME_DOMAIN . '-theme', THEME_URL . "/assets/public/css/theme-yellow.css", [THEME_DOMAIN . '-vendor'], $version);
// 	}else{
// 		wp_enqueue_style(THEME_DOMAIN . '-theme', THEME_URL . "/assets/public/css/theme.css", [THEME_DOMAIN . '-vendor'], $version);
// 	}
// 	//	wp_enqueue_style(THEME_DOMAIN . '-style', THEME_URL . "/style.css", [], $version);

// 	wp_enqueue_script(THEME_DOMAIN . '-app', THEME_URL . '/assets/public/js/app.min.js', ['jquery'], $version, true);
// });

// // Đăng ký một widget mới
// add_action('widgets_init', function () {
// 	register_sidebar(array(
// 		'name' => 'Blog sidebar',
// 		'id' => 'sidebar-blog',
// 		'before_widget' => '<div id="%1$s" class="widget %2$s">',
// 		'after_widget' => '</div>',
// 		'before_title' => '<h4 class="widget-title">',
// 		'after_title' => '</h4>',
// 	));

// 	register_sidebar(array(
// 		'name' => 'Footer',
// 		'id' => 'footer-area',
// 		'before_widget' => '<div id="%1$s" class="widget %2$s">',
// 		'after_widget' => '</div>',
// 		'before_title' => '<h4 class="widget-title">',
// 		'after_title' => '</h4>',
// 	));

// 	register_sidebar(array(
// 		'name' => esc_html__('Shop Sidebar', THEME_DOMAIN),
// 		'id' => 'sidebar-shop',
// 		'description' => esc_html__('Sidebar on shop page (only sidebar shop layout)', THEME_DOMAIN),
// 		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
// 		'after_widget' => '</aside>',
// 		'before_title' => '<h4 class="widget-title"><span>',
// 		'after_title' => '</span></h4>',
// 	));

// 	register_sidebar(array(
// 		'name' => esc_html__('Banner Shop', THEME_DOMAIN),
// 		'id' => 'banner-shop',
// 		'description' => esc_html__('Banner on shop page (only Banner shop layout)', THEME_DOMAIN),
// 		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
// 		'after_widget' => '</aside>',
// 		'before_title' => '<h4 class="widget-title"><span>',
// 		'after_title' => '</span></h4>',
// 	));

// 	register_sidebar(array(
// 		'name' => esc_html__('Single Product Sidebar', THEME_DOMAIN),
// 		'id' => 'fana-single-product-sidebar',
// 		'description' => esc_html__('Sidebar on shop page (only sidebar shop layout)', THEME_DOMAIN),
// 		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
// 		'after_widget' => '</aside>',
// 		'before_title' => '<h4 class="widget-title"><span>',
// 		'after_title' => '</span></h4>',
// 	));

// 	register_widget('Widget_Filter_By_Atribute');
// 	register_widget('Widget_Random_Post');
// });

// //TODO
// add_filter('wp_get_attachment_image_src', function ($image) {
// 	if (!$image) {
// 		$image = [
// 			get_template_directory_uri() . './assets/images/1000x1000.jpg',
// 			1000,
// 			1000
// 		];
// 	}
// 	return $image;
// });

// /** Register static page */
// add_action('admin_init', function () {
// 	// register static footer part
// 	register_setting(
// 		'reading', // option group "reading", default WP group
// 		'theme_footer_part', // option name
// 		[
// 			'type' => 'string',
// 			'sanitize_callback' => 'sanitize_text_field',
// 			'default' => NULL,
// 		]
// 	);
// 	// add new setting for footer part
// 	add_settings_field(
// 		'theme_footer_part', // ID
// 		__('Footer', 'vara'), // Title
// 		function () {
// 			$staticId = get_option('theme_footer_part');
// 			// get all pages
// 			$args = array(
// 				'posts_per_page' => -1,
// 				'orderby' => 'name',
// 				'order' => 'ASC',
// 				'post_type' => 'elementor_library',
// 				'meta_query' => array(
// 					array(
// 						'key' => '_elementor_template_type',
// 						'value' => 'section',
// 					)
// 				)
// 			);
// 			$items = get_posts($args);
// 			echo '<select id="theme_footer_part" name="theme_footer_part">';
// 			// empty option as default
// 			echo '<option value="0">' . __('— Select —', THEME_DOMAIN) . '</option>';
// 			// foreach page we create an option element, with the post-ID as value
// 			foreach ($items as $item) {
// 				// add selected to the option if value is the same as $project_page_id
// 				$selected = ($staticId == $item->ID) ? 'selected="selected"' : '';
// 				echo '<option value="' . $item->ID . '" ' . $selected . '>' . $item->post_title . '</option>';
// 			}
// 			echo '</select>';
// 		}, // Callback
// 		'reading',
// 		'default',
// 		array('label_for' => 'theme_footer_part')
// 	);
// });

// add_action('customize_register', function ($wp_customize) {
// 	// Add Settings
// 	$wp_customize->add_setting('cs_another_logo', array(
// 		'transport' => 'refresh',
// 		'width' => 200,
// 	));
// 	// Add Controls
// 	$wp_customize->add_control(new WP_Customize_Image_Control(
// 		$wp_customize,
// 		'cs_another_logo',
// 		array(
// 			'label' => __('Logo on Menu', THEME_DOMAIN),
// 			'section' => 'title_tagline',
// 			'settings' => 'cs_another_logo',
// 		)
// 	));
// });

// add_filter('comments_open', function ($open, $post_id) {
// 	return false;
// }, 10, 2);
// add_filter('pings_open', function ($open, $post_id) {
// 	return false;
// }, 20, 2);

// //region common function
// function bgx_get_static_template($static_name)
// {
// 	$staticId = false;
// 	if (!is_singular('elementor_library')) {
// 		$staticId = get_option('theme_footer_part');
// 	}
// 	return $staticId;
// }

// add_filter('body_class', function ($classes) {
// 	global $post;
// 	$suffix = '-bgx';
// 	if (is_home()) {
// 		$classes[] = 'home' . $suffix;
// 	}
// 	if (is_page()) {
// 		// if(in_array($post->post_name, array('dang-nhap', 'dang-ky'))){
// 		// 	$classes[] = 'account' . $suffix;
// 		// }
// 		if ($post->post_name === 'shop') $classes[] = 'product' . $suffix;
// 		else {
// 			$classes[] = $post->post_name . $suffix;
// 		}
// 	}
// 	if (is_singular('product')) {
// 		$classes[] = 'product' . $suffix;
// 	}
// 	return $classes;
// });

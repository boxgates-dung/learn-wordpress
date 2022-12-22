<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

if (!is_elementor_active()) {
	return;
}

use Elementor\Controls_Manager;
use Elementor\Elements_Manager;
use Elementor\Plugin;

final class Custom_Elementor
{
	const VERSION = '1.0.0';
	const MINIMUM_ELEMENTOR_VERSION = '2.0.0';
	const MINIMUM_PHP_VERSION = '7.0';

	private static $_instance = null;

	public static function instance()
	{
		if (is_null(self::$_instance)) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	public function __construct()
	{
		add_action('after_setup_theme', [$this, 'init']);

		add_filter('elementor/fonts/groups', array($this, 'elementor_group'));
		add_filter('elementor/fonts/additional_fonts', array($this, 'add_elementor_fonts'));
		add_action('wp_ajax_jpro_filter', [$this, 'ajaxProjects']);
	}

	public function init()
	{
		// Check if Elementor installed and activated
		if (!did_action('elementor/loaded')) {
			add_action('admin_notices', [$this, 'admin_notice_missing_main_plugin']);

			return;
		}

		// Check for required Elementor version
		if (!version_compare(ELEMENTOR_VERSION, self::MINIMUM_ELEMENTOR_VERSION, '>=')) {
			add_action('admin_notices', [$this, 'admin_notice_minimum_elementor_version']);

			return;
		}

		// Check for required PHP version
		if (version_compare(PHP_VERSION, self::MINIMUM_PHP_VERSION, '<')) {
			add_action('admin_notices', [$this, 'admin_notice_minimum_php_version']);

			return;
		}

		// Init elements
		add_action('elementor/widgets/widgets_registered', [$this, 'init_widgets']);
		add_action('elementor/controls/controls_registered', [$this, 'init_controls']);
		add_action('elementor/elements/categories_registered', [$this, 'init_categories']);
		//		add_action( 'elementor/element/wp-page/document_settings/before_section_end', [ $this, 'init_page_settings_controls' ] );
	}

	function init_categories(Elements_Manager $categories_manager)
	{
		$categories_manager->add_category(
			'boxgates',
			[
				'title' => 'BoxGates',
				'icon'  => 'fa fa-plug',
			]
		);
	}

	public function init_widgets()
	{
		//Include Widget files
		require_once('product-carousel.php');

		// Register widget
		Plugin::instance()->widgets_manager->register(new CLT_Product_Carousel_Widget());

	}

	public function init_controls()
	{
	}

	function init_page_settings_controls(Elementor\Core\DocumentTypes\PageBase $page)
	{
		$page->add_control(
			'show_key_background',
			[
				'label'        => __('Show Key Background', 'elementor-starter'),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __('Show', 'elementor-starter'),
				'label_off'    => __('Hide', 'elementor-starter'),
				'return_value' => 'yes',
				'default'      => 'yes',
			]
		);
	}

	public function admin_notice_missing_main_plugin()
	{
		if (isset($_GET['activate'])) {
			unset($_GET['activate']);
		}

		$message = sprintf(
			/* translators: 1: Plugin name 2: Elementor */
			esc_html__('"%1$s" requires "%2$s" to be installed and activated.', 'elementor-test-extension'),
			'<strong>' . esc_html__('Elementor Test Extension', 'elementor-test-extension') . '</strong>',
			'<strong>' . esc_html__('Elementor', 'elementor-test-extension') . '</strong>'
		);

		printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
	}

	public function admin_notice_minimum_elementor_version()
	{
		if (isset($_GET['activate'])) {
			unset($_GET['activate']);
		}

		$message = sprintf(
			/* translators: 1: Plugin name 2: Elementor 3: Required Elementor version */
			esc_html__('"%1$s" requires "%2$s" version %3$s or greater.', 'elementor-test-extension'),
			'<strong>' . esc_html__('Elementor Test Extension', 'elementor-test-extension') . '</strong>',
			'<strong>' . esc_html__('Elementor', 'elementor-test-extension') . '</strong>',
			self::MINIMUM_ELEMENTOR_VERSION
		);

		printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
	}

	public function admin_notice_minimum_php_version()
	{
		if (isset($_GET['activate'])) {
			unset($_GET['activate']);
		}

		$message = sprintf(
			/* translators: 1: Plugin name 2: PHP 3: Required PHP version */
			esc_html__('"%1$s" requires "%2$s" version %3$s or greater.', 'elementor-test-extension'),
			'<strong>' . esc_html__('Elementor Test Extension', 'elementor-test-extension') . '</strong>',
			'<strong>' . esc_html__('PHP', 'elementor-test-extension') . '</strong>',
			self::MINIMUM_PHP_VERSION
		);

		printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
	}

	public function elementor_group($font_groups)
	{
		$new_group['bg_custom'] = __('Custom', 'bagoneer');
		$font_groups             = $new_group + $font_groups;
		return $font_groups;
	}

	public function add_elementor_fonts($fonts)
	{
		return $fonts;
	}
}

Custom_Elementor::instance();

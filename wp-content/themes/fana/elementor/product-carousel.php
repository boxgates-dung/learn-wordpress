<?php

use Elementor\Widget_Base;

class CLT_Product_Carousel_Widget extends Widget_Base
{
  public static $slug = 'elementor-clt-product-carousel';
  static $postType = 'product';

  public function __construct($data = [], $args = null)
  {
    parent::__construct($data, $args);
  }

  public function get_name()
  {
    return self::$slug;
  }

  public function get_title()
  {
    return __('Product Carousel', 'clotya');
  }

  public function get_icon()
  {
    return 'eicon-slider-3d';
  }

  public function get_categories()
  {
    return ['boxgates'];
  }

  protected function register_controls()
  {
    $this->start_controls_section(
      'content_section',
      [
        'label' => __('Setting', 'clotya'),
        'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
      ]
    );
    $this->add_control(
      'limit',
      [
        'label'   => __('Limit', 'clotya'),
        'type'     => \Elementor\Controls_Manager::NUMBER,
        'min'     => 1,
        'max'     => 20,
        'default' => 3
      ]
    ); //slides_per_view
    $this->add_control(
      'show_arrow',
      [
        'label'        => __('Display Arrow', 'clotya'),
        'type'          => \Elementor\Controls_Manager::SWITCHER,
        'label_on'      => __('Show', 'clotya'),
        'label_off'    => __('Hide', 'clotya'),
        'return_value' => 'yes',
        'default'      => 'no',
      ]
    );
    $this->add_control(
      'show_review',
      [
        'label'        => __('Show Review', 'clotya'),
        'type'          => \Elementor\Controls_Manager::SWITCHER,
        'label_on'     => __('Show', 'clotya'),
        'label_off'    => __('Hide', 'clotya'),
        'return_value' => 'yes',
        'default'      => 'no',
      ]
    );
    $this->add_control(
      'show_quick_add_variable',
      [
        'label'        => __('Show Attribute Color', 'clotya'),
        'type'          => \Elementor\Controls_Manager::SWITCHER,
        'label_on'     => __('Show', 'clotya'),
        'label_off'    => __('Hide', 'clotya'),
        'return_value' => 'yes',
        'default'      => 'no',
      ]
    );
    $this->add_control(
      'show_button_add_variable_to_cart',
      [
        'label'        => __('Show Button Add To Cart', 'clotya'),
        'type'          => \Elementor\Controls_Manager::SWITCHER,
        'label_on'     => __('Show', 'clotya'),
        'label_off'    => __('Hide', 'clotya'),
        'return_value' => 'yes',
        'default'      => 'no',
      ]
    );
    $this->add_control(
      'text_align',
      [
        'label'   => __('Alignment', 'clotya'),
        'type'     => \Elementor\Controls_Manager::CHOOSE,
        'options' => [
          'left'   => [
            'title' => __('Left', 'clotya'),
            'icon'   => 'eicon-text-align-left',
          ],
          'center'   => [
            'title'   => __('Center', 'clotya'),
            'icon'     => 'eicon-text-align-center',
          ],
          'right'   => [
            'title'   => __('Right', 'clotya'),
            'icon'     => 'eicon-text-align-right',
          ],
        ],
        'default' => 'center',
        'toggle'   => true,
        'selectors' => [
          '{{WRAPPER}} .content-wrapper' => 'text-align: {{VALUE}};',
        ],
      ]
    );

    $options       = [];
    $product_cat   = get_terms(array(
      'taxonomy'    => 'product_cat',
      'hide_empty' => false,
    ));

    if ($product_cat) {
      foreach ($product_cat as $cate) {
        $options[$cate->term_id] = $cate->name;
      }
    }
    $this->add_control(
      'category',
      [
        'label'       => __('Category', 'clotya'),
        'type'         => \Elementor\Controls_Manager::SELECT2,
        'multiple'     => true,
        'label_block' => true,
        'options'     => $options
      ]
    );
    $optionTerm = [];
    $tags = get_tags();
    if ($tags) {
      foreach ($tags as $t) {
        $optionTerm[$t->term_id] = $t->name;
      }
    }
    $this->add_control(
      'tags',
      [
        'label'       => __('Tags', 'clotya'),
        'type'        => \Elementor\Controls_Manager::SELECT2,
        'multiple'     => true,
        'label_block' => true,
        'options'     => $optionTerm
      ]
    );

    $listSizeImage = [];
    $sizeImage = get_intermediate_image_sizes();
    foreach ($sizeImage as $size => $value) {
      $listSizeImage[$value] = $value;
    }

    $this->add_control(
      'size_image',
      [
        'label'       => __('Size Image', 'clotya'),
        'type'         => \Elementor\Controls_Manager::SELECT,
        'multiple'     => true,
        'label_block' => true,
        'default'      => 'thumbnail',
        'options'     => $listSizeImage
      ]
    );

    $this->add_control(
      'slider_enable',
      [
        'label'         => __('Slider Enable', 'clotya'),
        'type'           => \Elementor\Controls_Manager::SWITCHER,
        'label_on'       => __('Show', 'clotya'),
        'label_off'     => __('Hide', 'clotya'),
        'return_value'   => 'yes',
        'default'       => 'yes',
      ]
    );

    $this->add_control(
      'limit-hover-slider',
      [
        'label'   => __('Limit hover slider', 'clotya'),
        'type'    => \Elementor\Controls_Manager::NUMBER,
        'min'     => 1,
        'max'     => 20,
        'default' => 3
      ]
    );
    $this->add_control(
      'loop',
      [
        'label'         => __('Infinite Loop', 'clotya'),
        'type'           => \Elementor\Controls_Manager::SWITCHER,
        'label_on'       => __('Show', 'clotya'),
        'label_off'     => __('Hide', 'clotya'),
        'return_value'   => 'yes',
        'default'       => 'yes',
      ]
    ); //Infinite Loop
    $this->add_responsive_control(
      'slides_per_view',
      [
        'label'   => __('Slide per view', 'clotya'),
        'type'    => \Elementor\Controls_Manager::NUMBER,
        'min'     => 1,
        'max'     => 10,
        'devices' => ['desktop', 'tablet', 'mobile'],
        'default' => 4
      ]
    ); //slides_per_view
    $this->add_responsive_control(
      'slides_per_column',
      [
        'label'           => __('Slide per column', 'clotya'),
        'type'             => \Elementor\Controls_Manager::NUMBER,
        'min'             => 1,
        'max'             => 10,
        'devices'         => ['desktop', 'tablet', 'mobile'],
        'default'         => 1,
        'desktop_default' => 1,
        'tablet_default'   => 1,
        'mobile_default'   => 1
      ]
    ); //slides_per_column
    $this->add_responsive_control(
      'space_between',
      [
        'label'           => __('Space between', 'clotya'),
        'type'             => \Elementor\Controls_Manager::NUMBER,
        'min'             => 0,
        'max'             => 100,
        'devices'         => ['desktop', 'tablet', 'mobile'],
        'default'         => 10,
        'desktop_default' => 10,
        'tablet_default'   => 10,
        'mobile_default'   => 10
      ]
    ); //space_between
    $this->end_controls_section();
    $this->start_controls_section(
      'style_section',
      [
        'label' => esc_html__('Style Section', 'clotya'),
        'tab'    => \Elementor\Controls_Manager::TAB_STYLE,
      ]
    );

    $this->end_controls_section();
  }

  protected function render()
  {
    $settings = $this->get_settings_for_display();
    $attributeSlider = ['class' => $settings['slider_enable'] == 'yes' ? 'swiper clt-products clt-products__swiper' : 'clt-products'];

    if ($settings['slider_enable'] == 'yes') {
      $attributeSlider['data-slider'] = json_encode([
        'loop'                       => $settings['loop'],
        'slides_per_view'           => $settings['slides_per_view'],
        'slides_per_view_tablet'    => $settings['slides_per_view_tablet'] ?? $settings['slides_per_view'],
        'slides_per_view_mobile'    => $settings['slides_per_view_mobile'] ?? $settings['slides_per_view'],

        'slides_per_column'        => $settings['slides_per_column'],
        'slides_per_column_tablet' => $settings['slides_per_column_tablet'] ?? $settings['slides_per_column'],
        'slides_per_column_mobile' => $settings['slides_per_column_mobile'] ?? $settings['slides_per_column'],

        'space_between'             => $settings['space_between'],
        'space_between_tablet'      => $settings['space_between_tablet'] ?? 10,
        'space_between_mobile'      => $settings['space_between_mobile'] ?? 10,
      ]);
    }
    $this->add_render_attribute('slider_config', $attributeSlider);

    $this->add_render_attribute('post_item', [
      'class' => $settings['slider_enable'] == 'yes' ? 'swiper-slide product-carousel-item' : 'col-6 col-lg-3 product-carousel-item'
    ]);

    $filter = [
      'post_type'   => self::$postType,
      'numberposts' => $settings['limit'],
      'status'       => 'publish',
    ];

    if (!empty($settings['tags'])) {
      $filter['tax_query'] = [
        [
          'taxonomy' => 'post_tag',
          'field'    => 'term_id',
          'terms'    => $settings['tags'],
        ]
      ];
    }

    $arrayCat = array();
    if (!empty($settings['category'])) {
      foreach ($settings['category'] as $category) {
        array_push($arrayCat, get_term($category, 'product_cat')->slug);
      }
    }

    $products = wc_get_products([
      'limit'    => $settings['limit'],
      'status'    => 'publish',
      'category' => $arrayCat
    ]);
?>
    <div <?php $this->print_render_attribute_string('slider_config'); ?> id="product-slide-<?php echo rand() ?>">
      <?php echo ($settings['slider_enable'] == 'yes') ? '<div class="swiper-wrapper">' : '<div class="row">'; ?>
      <?php foreach ($products as $item) {
        $product        = $item->get_data();
        $productId     = $product['id'];
        $countComment = get_comments_number($productId);
        $permalink     = get_permalink($productId);
        $attachment   = wp_get_attachment_image_src($product['image_id'], $settings['size_image']);

        // Lấy thumbnail đại diện
        $hoverSliderImagesToggler = '<div class="hover-slider-toggle-pane" data-hover-slider-image="' . $attachment[0] . '" data-hover-slider-i="' . $productId . '" style="flex-grow: 1;"></div>';
        $hoverSliderIndicator      = '';
        if ($settings['limit-hover-slider'] > 1) {
          $hoverSliderIndicator    = '<div data-hover-slider-i="' . $productId . '" class="hover-slider-indicator-dot"></div>';
        }

        // lấy ảnh trong gallery
        $attachment_ids = $item->get_gallery_image_ids();
        $limitGallery = 0;
        foreach ($attachment_ids as $attachment_id) {
          if ($limitGallery < ($settings['limit-hover-slider'] - 1)) {
            $hoverSliderImagesToggler .= '<div class="hover-slider-toggle-pane" data-gallery="' . $limitGallery . '" data-hover-slider-image="' . wp_get_attachment_image_url($attachment_id, $settings['size_image']) . '" data-hover-slider-i="' . $attachment_id . '" style="flex-grow: 1;"></div>';
            $hoverSliderIndicator     .= '<div data-hover-slider-i="' . $attachment_id . '" class="hover-slider-indicator-dot"></div>';
          }
          $limitGallery++;
        }

        // Tính phần trăm sale
        $discountPercentage = '';
        $badge = get_post_meta(get_the_ID(), 'klb_product_badge', true);
        if ($item->is_on_sale() && $item->is_type('variable')) {
          $percentage = '-' . ceil(100 - ($item->get_variation_sale_price() / $item->get_variation_regular_price('min')) * 100);
          $discountPercentage   .= '<div class="product-badges"><span class="badge onsale">' . $percentage . '%</span></div>';
        } elseif ($item->is_on_sale() && $item->get_regular_price()  && !$item->is_type('grouped')) {
          $percentage = '-' . ceil(100 - ($item->get_sale_price() / $item->get_regular_price()) * 100);
          $discountPercentage   .= '<div class="product-badges">';
          if ($badge) {
            $discountPercentage  .= '<span class="badge trending">' . esc_html($badge) . '</span>';
          } else {
            $discountPercentage .= '<span class="badge onsale">' . $percentage . '%</span>';
          }
          $discountPercentage    .= '</div>';
        }

      ?>
        <div <?php $this->print_render_attribute_string('post_item'); ?> id="product-<?php echo $productId; ?>">
          <div class="thumbnail-wrapper with-gallery">
            <!-- Hiển thị sale -->
            <?php echo $discountPercentage; ?>

            <!-- group product button -->
            <div class="group-product-button">
              <a href="?add-to-wishlist=<?php echo $productId; ?>" data-quantity="1" class="button add_to_wishlist_button ajax_add_to_wishlist" data-product_id="<?php echo $productId; ?>" aria-label=" <?php echo esc_attr($product['name']) ?>" rel="nofollow" title="<?php echo esc_attr($product['name']) ?>"><i class="klbth-icon-heart"></i></a>
              <?php if (!$settings['show_quick_add_variable'] == 'yes') : ?>
                <?php if ($item->is_type('variable')) : ?>
                  <a href="<?php echo $permalink ?>" class="button variable-button" title="<?php echo esc_attr($product['name']) ?>"><i class="klbth-icon-right-arrow"></i></a>
                <?php else : ?>
                  <button href="?add-to-cart=<?php echo $productId; ?>" data-quantity="1" class="button product_type_simple add_to_cart_button" data-product_id="<?php echo $productId; ?>" aria-label="<?php echo esc_attr($product['name']) ?>" rel="nofollow" title="<?php echo esc_attr($product['name']) ?>"><i class="klbth-icon-shopping-bag-ft"></i></button>
                <?php endif ?>
              <?php endif ?>
            </div>

            <!-- Slide ảnh -->
            <a href="<?php echo $permalink ?>" class="product-carousel-image" title="<?php echo esc_attr($product['name']) ?>">
              <div class="hover-slider-images-toggler">
                <?php echo $hoverSliderImagesToggler; ?>
              </div>
              <div class="hover-slider-indicator">
                <?php echo $hoverSliderIndicator; ?>
              </div>
              <img src="<?php echo $attachment[0]; ?>" height="<?php echo $attachment[2]; ?>" class="hover-slider-init" alt="<?php echo $product['name']; ?>">
            </a>
          </div>

          <!-- Nội dung mô tả -->
          <div class="content-wrapper">
            <?php if ($countComment > 0 && $settings['show_review'] == 'yes') : ?>
              <div class="product-review">
                <div class="star"><i class="klbth-icon-star"></i></div>
                <span><?php echo $countComment; ?> review</span>
              </div>
            <?php endif ?>
            <h3 class="product-title"><a href="<?php echo $permalink ?>" title="<?php echo esc_attr($product['name']) ?>"><?php echo $product['name'] ?></a></h3>
            <span class="product-price"><?php echo $item->get_price_html() ?></span>
          </div>
          <!-- Quick add to cart -->
          <?php if ($settings['show_quick_add_variable'] == 'yes') : ?>
            <div class="quick-add-to-cart">
              <?php if ($item->is_type('variable')) : ?>

                <?php
                $hasSize = false;
                $hasColor = false;
                ?>
                <?php foreach ($item->get_variation_attributes() as $attribute_name  => $options) : ?>
                  <?php if ($attribute_name == 'pa_color') : ?>
                    <div class="clt-terms clt-type-color mt-3" data-attribute="<?php echo $attribute_name; ?>">
                      <?php foreach ($options as $attr_color) : ?>
                        <?php
                        $terms = get_term_by('slug', $attr_color, 'pa_color');
                        $attr_color_value = get_term_meta($terms->term_id, 'pa_color_picker', true);
                        $style = 'style="background-color:' . strtolower($attr_color) . '"';
                        if (!empty($attr_color_value)) {
                          $style = 'style="background-color:' . $attr_color_value . '"';
                        }

                        $attribute = '';
                        // Lấy variation id
                        foreach ($item->get_available_variations() as $v) {
                          if ($v["attributes"]["attribute_pa_color"] == $attr_color) {
                            $attribute = $v;
                          }
                        }
                        // variation default id
                        $default_variations_id = wp_list_pluck($item->get_available_variations(), 'variation_id');

                        $img_url = $attribute ? $attribute['image']['thumb_src'] : '';
                        $variation_id = $attribute ? $attribute['variation_id'] : $default_variations_id[0];
                        ?>
                        <span class="clt-term" data-term="<?php echo $attr_color; ?>" data-product_id="<?php echo $productId; ?>" data-name="<?php echo $terms->name; ?>" data-variable_id="<?php echo $variation_id; ?>" data-img_url="<?php echo $img_url; ?>" <?php echo $style; ?>></span>
                      <?php endforeach ?>
                    </div>
                  <?php endif ?>
                  <?php

                  if ($attribute_name == 'pa_size') {
                    $hasSize = true;
                  }
                  if ($attribute_name == 'pa_color') {
                    $hasColor = true;
                  }

                  ?>
                <?php endforeach ?>
                <?php if ($settings['show_button_add_variable_to_cart'] == 'yes') : ?>
                  <?php if ($hasSize && $hasColor) : ?>
                    <a href="<?php echo $permalink ?>" class="button hasSize mt-3 w-100" data-product_id="<?php echo $productId; ?>" data-name="<?php echo $product['name']; ?>" data-size="" data-term="<?php echo $attr_color; ?>" data-variable_id="<?php echo $variation_id; ?>">
                      <span>Select options</span>
                    </a>
                  <?php elseif ($hasSize) : ?>
                    <div class="clt-terms clt-type-color mt-3"></div>
                    <a href="<?php echo $permalink ?>" class="button hasSize mt-3 w-100" data-product_id="<?php echo $productId; ?>" data-name="<?php echo $product['name']; ?>" data-size="" data-term="<?php echo $attr_color; ?>" data-variable_id="<?php echo $variation_id; ?>">
                      <span>Select options</span>
                    </a>
                  <?php else : ?>
                    <a href="" class="button btn-quick-add-to-cart none-select mt-3 w-100" data-product_id="<?php echo $productId; ?>" data-name="<?php echo $product['name']; ?>" data-size="" data-term="<?php echo $attr_color; ?>" data-variable_id="<?php echo $variation_id; ?>">
                      <span>Select options</span>
                    </a>
                  <?php endif ?>
                <?php endif ?>

              <?php else : ?>
                <div class="clt-terms clt-type-color mt-3"></div>
                <button href="?add-to-cart=<?php echo $productId; ?>" data-quantity="1" class="button product_type_simple add_to_cart_button mt-3 w-100" data-product_id="<?php echo $productId; ?>" aria-label="<?php echo esc_attr($product['name']) ?>" rel="nofollow" title="<?php echo esc_attr($product['name']) ?>">
                  Add to cart
                </button>
              <?php endif ?>
            </div>
          <?php endif ?>
        </div>
      <?php } ?>
      <?php echo '</div>'; ?>
      <?php if ($settings['slider_enable'] == 'yes' && $settings['show_arrow'] == 'yes') {
      ?>
        <div class="product-carousel-swiper-button-next klbth-icon-right-open-big"></div>
        <div class="product-carousel-swiper-button-prev klbth-icon-left-open-big"></div>
      <?php } ?>
    </div>
<?php
  }
}

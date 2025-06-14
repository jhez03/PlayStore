<?php
namespace Playstore;
if ( ! defined( 'ABSPATH' )) {
	exit;
}


use WP_Query;

class WooCommerce {
	/**
	 * Initialize the Playstore_WooCommerce class.
	 */
	public static function init(): void {
		add_filter( 'woocommerce_product_data_tabs', array( __CLASS__, 'add_playstore_tab' ), 98 );
		add_action( 'woocommerce_product_data_panels', array( __CLASS__, 'render_playstore_tab_content' ) );

		// save custom field
		add_action( 'woocommerce_process_product_meta', array( __CLASS__, 'save_playstore_field' ) );
	}
	/**
	 * Get featured products from WooCommerce.
	 *
	 * @param array $args Optional arguments for WP_Query.
	 * @return array Array of featured products.
	 */
	public static function get_products( $args = array() ): array {
		$default_args = array(
			'post_type'      => 'product',
			'post_status'    => 'publish',
			'posts_per_page' => 6,
		);

		// $test = array_merge( $default_args, $args );
		//
		// echo '<pre>';
		// print_r( $test );
		// exit;

		$query       = new WP_Query( array_merge( $default_args, $args ) );
		$product_ids = wp_list_pluck( $query->posts, 'ID' );

		// Preload all taxonomy terms for products
		$terms_by_product = array();
		$term_meta_cache  = array();

		if ( ! empty( $product_ids )) {
			$terms = wp_get_object_terms( $product_ids, 'platform', array( 'fields' => 'all_with_object_id' ) );

			foreach ($terms as $term) {
				$terms_by_product[ $term->object_id ][] = $term;

				$term_meta_cache[ $term->term_id ] = wp_get_attachment_image_url(
					get_term_meta( $term->term_id, 'platform_thumbnail_id', true ),
					'full'
				);
			}
		}

		$products = array();

		foreach ($query->posts as $post) {
			$product = wc_get_product( $post );
			if ( ! $product) {
				continue;
			}

			$platforms = array();
			$terms     = $terms_by_product[ $product->get_id() ] ?? array();

			foreach ($terms as $term) {
				$platforms[] = array(
					'name'  => $term->name,
					'slug'  => $term->slug,
					'image' => $term_meta_cache[ $term->term_id ] ?? null,
				);
			}

			$products[] = array(
				'id'            => $product->get_id(),
				'title'         => $product->get_name(),
				'price_html'    => $product->get_price_html(),
				'price'         => $product->get_price(),
				'regular_price' => wc_price( $product->get_regular_price() ),
				'sale_price'    => wc_price( $product->get_sale_price() ),
				'url'           => get_permalink( $product->get_id() ),
				'image'         => wp_get_attachment_image_url( $product->get_image_id(), 'full' ),
				'platforms'     => $platforms,
			);
		}

		wp_reset_postdata();
		return $products;
	}
	/**
	 * Add a custom tab to WooCommerce product pages.
	 *
	 * @param array $tabs Existing tabs.
	 * @return array Modified tabs with the Playstore tab added.
	 */
	public static function add_playstore_tab( $tabs ) {
		$tabs['playstore'] = array(
			'label'    => __( 'Playstore', 'playstore-woocommerce' ),
			'priority' => 50,
			'target'   => 'playstore_product_tab',
			'class'    => array( 'show_if_simple', 'show_if_variable' ),
		);
		return $tabs;
	}
	/**
	 * Render the content of the Playstore tab.
	 */
	public static function render_playstore_tab_content(): void {
		global $post;

		// get saved platform
		$saved_platform = (array) get_post_meta( $post->ID, '_playstore_platform', true );
		// can be filtered for dynamic extension
		$platform = apply_filters(
			'playstore_woocommerce_platform',
			array(
				'pc'          => __( 'PC', 'playstore-woocommerce' ),
				'xbox'        => __( 'Xbox', 'playstore-woocommerce' ),
				'playstation' => __( 'PlayStation', 'playstore-woocommerce' ),
			)
		);
		?>
			<div id="playstore_product_tab" class="panel woocommerce_options_panel">
				<div class="options_group">
				<?php
				woocommerce_wp_text_input(
					array(
						'id'          => '_playstore_publisher',
						'label'       => __( 'Publisher', 'playstore-woocommerce' ),
						'description' => __( 'Enter the publisher name for this product.', 'playstore-woocommerce' ),
						'placeholder' => __( 'e.g., Ubisoft', 'playstore-woocommerce' ),
						'desc_tip'    => true,
					)
				);
				?>
					<p class="form-field">
						<label>Available Platforms</label>
					</p>
					<?php foreach ( $platform as $key => $label ) : ?>
						<p class="form-field">
							<label><?php echo esc_html( $label ); ?></label>
							<input type="checkbox" name="_playstore_platform[]" value="<?php echo esc_attr( $key ); ?> " <?php checked( in_array( $key, $saved_platform ) ); ?> />
						</p>

						<?php endforeach; ?>
					<hr>
			<?php
			woocommerce_wp_text_input(
				array(
					'id'          => '_release_date',
					'label'       => __( 'Release Date', 'playstore-woocommerce' ),
					'placeholder' => 'YYYY-MM-DD',
					'type'        => 'date',
					'description' => __( 'Select the product release date.', 'playstore-woocommerce' ),
					'desc_tip'    => true,
				)
			);
			woocommerce_wp_text_input(
				array(
					'id'          => '_playstore_game_mode',
					'label'       => __( 'Game Mode', 'playstore-woocommerce' ),
					'options'     => array(
						'singleplayer' => __( 'Singleplayer', 'playstore-woocommerce' ),
						'multiplayer'  => __( 'Multiplayer', 'playstore-woocommerce' ),
						'cooperative'  => __( 'Cooperative', 'playstore-woocommerce' ),
					),
					'type'        => 'select',
					'description' => __( 'Select the game mode for this product.', 'playstore-woocommerce' ),
					'desc_tip'    => true,
				)
			)
			?>

				</div>
			</div>
			<?php
	}

	public static function save_playstore_field( $post_id ) {
		//save game mode
		if ( isset( $_POST['_playstore_game_mode'] ) ) {
			$game_mode = sanitize_text_field( $_POST['_playstore_game_mode'] );
			update_post_meta( $post_id, '_playstore_game_mode', $game_mode );
		} else {
			delete_post_meta( $post_id, '_playstore_game_mode' );
		}

		//save release date
		if ( isset( $_POST['_release_date'] ) ) {
			$release_date = sanitize_text_field( $_POST['_release_date'] );
			update_post_meta( $post_id, '_release_date', $release_date );
		} else {
			delete_post_meta( $post_id, '_release_date' );
		}
		//save publisher and platform

		if ( isset( $_POST['_playstore_publisher'] ) ) {
			$publisher = sanitize_text_field( $_POST['_playstore_publisher'] );
			update_post_meta( $post_id, '_playstore_publisher', $publisher );
		} else {
			delete_post_meta( $post_id, '_playstore_publisher' );
		}
		if ( isset( $_POST['_playstore_platform'] ) && is_array( $_POST['_playstore_platform'] ) ) {
			$platform = array_map( 'sanitize_text_field', $_POST['_playstore_platform'] );
			update_post_meta( $post_id, '_playstore_platform', $platform );
		} else {
			delete_post_meta( $post_id, '_playstore_platform' );
		}
	}
}

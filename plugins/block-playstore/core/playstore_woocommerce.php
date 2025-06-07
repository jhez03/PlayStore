<?php
if ( ! class_exists( 'Playstore_WooCommerce' )) {
	class Playstore_WooCommerce {
		public static function get_products( $args = array() ) {
			$default_args = array(
				'post_type'      => 'product',
				'posts_per_page' => 12,
				'post_status'    => 'publish',
			);

			$query    = new WP_Query( array_merge( $default_args, $args ) );
			$products = array();

			while ($query->have_posts()) {
				$query->the_post();
				global $product;

				if ( ! $product) {
					$product = wc_get_product( get_the_ID() );
				}

				$products[] = array(
					'id'    => get_the_ID(),
					'title' => get_the_title(),
					'price' => $product->get_price_html(),
					'url'   => get_permalink(),
					'image' => wp_get_attachment_image_url( $product->get_image_id(), 'full' ),
				);
			}

			wp_reset_postdata();
			return $products;
		}
	}
}

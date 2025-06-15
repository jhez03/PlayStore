<?php
namespace Playstore;
// Exit if accessed directly
if ( ! defined( 'ABSPATH' )) {
	exit;
}
use WP_Query;
class RestApi {
	public static function init() {
		add_action( 'rest_api_init', array( self::class, 'register_rest_route' ) );
	}

	public static function register_rest_route() {

		register_rest_route(
			'playstore/v1',
			'/news',
			array(
				'methods'             => 'GET',
				'callback'            => array( self::class, 'playstore_recent_news' ),
				'permission_callback' => '__return_true',

			)
		);
		register_rest_route(
			'playstore/v1',
			'/featured',
			array(
				'methods'             => 'GET',
				'callback'            => array( self::class, 'playstore_featured_get_products' ),
				'permission_callback' => '__return_true',

			)
		);
	}

	public static function playstore_recent_news( $request ) {
		$default_args = array(
			'post_type'      => 'news',
			'posts_per_page' => 3,
			'post_status'    => 'publish',
			'orderby'        => 'date',
			'order'          => 'DESC',
		);

		// $request is a WP_REST_Request object
		$query_args = wp_parse_args( $request->get_params(), $default_args );
		$query      = new WP_Query( $query_args );

		$news_posts = array();

		while ($query->have_posts()) {
			$query->the_post();

			$news_posts[] = array(
				'id'          => get_the_ID(),
				'title'       => get_the_title(),
				'url'         => get_permalink(),
				'thumbnail'   => get_the_post_thumbnail_url( get_the_ID(), 'medium' ),
				'date'        => get_the_date(),
				'excerpt'     => wp_strip_all_tags( get_the_excerpt() ),
				'short_title' => html_entity_decode( wp_trim_words( get_the_title(), 10, '...' ), ENT_QUOTES, 'UTF-8' ),
			);
		}

		wp_reset_postdata();

		return rest_ensure_response( $news_posts );
	}
	public static function playstore_featured_get_products( $request ) {
		$default = array(
			'tax_query' => array(
				array(
					'taxonomy' => 'product_visibility',
					'field'    => 'name',
					'terms'    => 'featured',
					'operator' => 'IN',
				),
			),
		);
		$args    = wp_parse_args( $request->get_params(), $default );

		$products = WooCommerce::get_products( $args );
		return rest_ensure_response( $products );
	}
}

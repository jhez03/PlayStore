<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' )) {
	exit;
}

// Register REST routes on API init
add_action(
	'rest_api_init',
	function () {

		register_rest_route(
			'playstore/v1',
			'/search-posts',
			array(
				'methods'             => 'GET',
				'callback'            => 'jeswin_handle_search_posts',
				'permission_callback' => '__return_true', // Secure this as needed
			)
		);

		register_rest_route(
			'playstore/v1',
			'/news',
			array(
				'methods'             => 'GET',
				'callback'            => 'playstore_recent_news',
				'permission_callback' => '__return_true',
			)
		);
	}
);

// Handlers

function playstore_recent_news( $args = array() ) {
	$default_args = array(
		'post_type'      => 'news',
		'posts_per_page' => 3,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
	);
	$query_args   = wp_parse_args( $args, $default_args );
	$query        = new WP_Query( $query_args );

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

	return rest_ensure_response( $news_posts );
}

// function jeswin_handle_custom_data( $request ) {
//  return array(
//      'status' => 'success',
//      'data'   => array(
//          'message'   => 'Custom REST response',
//          'timestamp' => time(),
//      ),
//  );
// }

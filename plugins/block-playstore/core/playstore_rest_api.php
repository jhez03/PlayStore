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
			'jeswin/v1',
			'/search-posts',
			array(
				'methods'             => 'GET',
				'callback'            => 'jeswin_handle_search_posts',
				'permission_callback' => '__return_true', // Secure this as needed
			)
		);

		register_rest_route(
			'jeswin/v1',
			'/custom-data',
			array(
				'methods'             => 'GET',
				'callback'            => 'jeswin_handle_custom_data',
				'permission_callback' => '__return_true',
			)
		);
	}
);

// Handlers

function jeswin_handle_search_posts( $request ) {
	$query = sanitize_text_field( $request->get_param( 'q' ) );

	$posts = get_posts(
		array(
			's'              => $query,
			'post_type'      => 'post',
			'posts_per_page' => 10,
		)
	);

	return rest_ensure_response( $posts );
}

function jeswin_handle_custom_data( $request ) {
	return array(
		'status' => 'success',
		'data'   => array(
			'message'   => 'Custom REST response',
			'timestamp' => time(),
		),
	);
}

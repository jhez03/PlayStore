<?php
namespace Playstore;
// Exit if accessed directly
if ( ! defined( 'ABSPATH' )) {
	exit;
}


class CustomTypes {
	public static function init() {
		add_action( 'init', array( self::class, 'register_news_post_type' ) );
	}

	public static function register_news_post_type() {
		$labels = array(
			'name'               => _x( 'News', 'Post Type General Name', 'textdomain' ),
			'singular_name'      => _x( 'News', 'Post Type Singular Name', 'textdomain' ),
			'menu_name'          => __( 'News', 'textdomain' ),
			'name_admin_bar'     => __( 'News', 'textdomain' ),
			'add_new'            => __( 'Add New', 'textdomain' ),
			'add_new_item'       => __( 'Add New News', 'textdomain' ),
			'edit_item'          => __( 'Edit News', 'textdomain' ),
			'new_item'           => __( 'New News', 'textdomain' ),
			'view_item'          => __( 'View News', 'textdomain' ),
			'all_items'          => __( 'All News', 'textdomain' ),
			'search_items'       => __( 'Search News', 'textdomain' ),
			'not_found'          => __( 'No news found.', 'textdomain' ),
			'not_found_in_trash' => __( 'No news found in Trash.', 'textdomain' ),
		);

		$args = array(
			'label'         => __( 'News', 'textdomain' ),
			'labels'        => $labels,
			'public'        => true,
			'show_in_rest'  => true, // Enable Gutenberg
			'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'author' ),
			'has_archive'   => true,
			'rewrite'       => array( 'slug' => 'news' ),
			'menu_position' => 5,
			'menu_icon'     => 'dashicons-megaphone',
		);

		register_post_type( 'news', $args );
	}
}

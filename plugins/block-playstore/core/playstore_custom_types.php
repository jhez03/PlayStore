<?php
// Register Custom Post Type: News
function register_news_post_type() {
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
add_action( 'init', 'register_news_post_type' );

// Register Custom Taxonomy: News Category
function register_news_category_taxonomy() {
	$labels = array(
		'name'              => _x( 'News Categories', 'taxonomy general name', 'textdomain' ),
		'singular_name'     => _x( 'News Category', 'taxonomy singular name', 'textdomain' ),
		'search_items'      => __( 'Search News Categories', 'textdomain' ),
		'all_items'         => __( 'All News Categories', 'textdomain' ),
		'parent_item'       => __( 'Parent News Category', 'textdomain' ),
		'parent_item_colon' => __( 'Parent News Category:', 'textdomain' ),
		'edit_item'         => __( 'Edit News Category', 'textdomain' ),
		'update_item'       => __( 'Update News Category', 'textdomain' ),
		'add_new_item'      => __( 'Add New News Category', 'textdomain' ),
		'new_item_name'     => __( 'New News Category Name', 'textdomain' ),
		'menu_name'         => __( 'News Categories', 'textdomain' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_rest'      => true, // Enable Gutenberg
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'news-category' ),
	);

	register_taxonomy( 'news_category', array( 'news' ), $args );
}
add_action( 'init', 'register_news_category_taxonomy' );

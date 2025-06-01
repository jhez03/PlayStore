<?php
/**
 * Plugin Name: Playstore General
 * Description: Core Code for PlayStore
 * Version: 1.0
 * Author: Genius.Courses
 * Author URI: https://genius.courses
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */
function playstore_remove_dashboard_widgets() {
	global $wp_meta_boxes;

	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity'] );
	unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press'] );
	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links'] );
	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now'] );
	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins'] );
	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts'] );
	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments'] );
	unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_primary'] );
	unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary'] );
	unset( $wp_meta_boxes['dashboard']['normal']['high']['rank_math_dashboard_widget'] );
	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health'] );
}
add_action( 'wp_dashboard_setup', 'playstore_remove_dashboard_widgets' );

// allow SVG uploads
function playstore_mime_types( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'playstore_mime_types' );

// fix svg display in media library
function playstore_fix_svg() {
	echo '<style>
    .attachment-266x266, .thumbnail img {
        width: 100% !important;
        height: auto !important;
  }
  </style>';
}
add_action( 'admin_head', 'playstore_fix_svg' );

// register menu nav
function playstore_register_menu_nav() {
	register_nav_menus(
		array(
			'playstore-menu'        => __( 'PlayStore Menu' ),
			'playstore-footer-menu' => __( 'PlayStore Footer Menu' ),
			'playstore-mobile-menu' => __( 'PlayStore Mobile Menu' ),
			'playstore-header-menu' => __( 'PlayStore Header Menu' ),
		)
	);
}
add_action( 'init', 'playstore_register_menu_nav' );

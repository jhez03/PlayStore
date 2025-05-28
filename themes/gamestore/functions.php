<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package gamestore
 * @since 1.0.0
 */

/**
 * Enqueue the CSS files.
 *
 * @since 1.0.0
 *
 * @return void
 */
function playstore_styles() {
	wp_enqueue_style(
		'playstore-general',
		get_theme_file_uri( 'assets/css/gamestore.css' ),
		array(),
		wp_get_theme()->get( 'Version' )
	);
	wp_enqueue_script(
		'playstore-theme-related',
		get_theme_file_uri( 'assets/js/playstore-theme-related.js' ),
		array(),
		wp_get_theme()->get( 'Version' ),
		true
	);
	wp_enqueue_style(
		'playstore-google-fonts',
		'//fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,400;0,700;1,400;1,700'
	);
}
add_action( 'wp_enqueue_scripts', 'playstore_styles' );

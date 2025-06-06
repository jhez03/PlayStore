<?php
/**
 * Plugin Name:       Block Playstore
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-playstore
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
foreach (glob( plugin_dir_path( __FILE__ ) . 'core/*.php' ) as $file) {
	require_once $file;
}
add_filter(
	'block_categories_all',
	function ( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'playstore',
					'title' => 'PlayStore',
				),
			)
		);
	}
);


function create_block_block_playstore_block_init() {
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'create_block_block_playstore_block_init' );

// custom nav walker for playstore navigation.
class Playstore_Nav_Walker extends Walker_Nav_Menu {
	protected $dropdown_count = 0;
	// Start Level (Submenu)
	function start_lvl( &$output, $depth = 0, $args = null ) {
		$indent = str_repeat( "\t", $depth );
		// Add ID only on first-level submenu
		if ( $depth === 0 ) {
			$output .= "\n$indent<ul class=\"sub-menu\" id=\"submenu-{$this->dropdown_count}\">\n";
		} else {
			$output .= "\n$indent<ul class=\"sub-menu\">\n";
		}
	}

	// Start Element (Menu Item)
	function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$classes      = empty( $item->classes ) ? array() : (array) $item->classes;
		$has_children = in_array( 'menu-item-has-children', $classes );

		$dropdown_attr = '';
		$aria_attrs    = '';

		if ( $has_children && $depth === 0 ) {
			++$this->dropdown_count;
			$dropdown_id   = 'submenu-' . $this->dropdown_count;
			$dropdown_attr = ' data-dropdown="' . esc_attr( $dropdown_id ) . '"';
			$aria_attrs    = ' aria-expanded="false" aria-controls="' . esc_attr( $dropdown_id ) . '"';
		}

		$output .= '<li class="' . implode( ' ', $classes ) . '"' . $dropdown_attr . '>';
		$output .= '<a href="' . esc_url( $item->url ) . '"' . $aria_attrs . '>' . esc_html( $item->title ) . '</a>';

		// Add dropdown SVG if it has children
		if ( $has_children ) {
			$output .= '<button class="dropdown-icon playstore-submenu-toggle">';
			$output .= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M8.46997 11.2402L12 14.7602L15.53 11.2402" stroke="var(--action-main-svg)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>';
			$output .= '</button>';
		}
	}

	function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= "</li>\n";
	}

	function end_lvl( &$output, $depth = 0, $args = null ) {
		$output .= "</ul>\n";
	}
}

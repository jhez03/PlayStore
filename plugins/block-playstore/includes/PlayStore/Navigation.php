<?php
/**
 * Custom Nav Walker for PlayStore.
 *
 * @package PlayStore\Navigation
 */

namespace PlayStore\Navigation;
// Exit if accessed directly
if ( ! defined( 'ABSPATH' )) {
	exit;
}


use Walker_Nav_Menu;

class Walker extends Walker_Nav_Menu {
	protected int $dropdown_count = 0;

	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$indent = str_repeat( "\t", $depth );
		if ( $depth === 0 ) {
			$output .= "\n$indent<ul class=\"sub-menu\" id=\"submenu-{$this->dropdown_count}\">\n";
		} else {
			$output .= "\n$indent<ul class=\"sub-menu\">\n";
		}
	}

	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$classes      = empty( $item->classes ) ? array() : (array) $item->classes;
		$has_children = in_array( 'menu-item-has-children', $classes, true );

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

		if ( $has_children ) {
			$output .= '<button class="dropdown-icon playstore-submenu-toggle">';
			$output .= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
				<path d="M8.46997 11.2402L12 14.7602L15.53 11.2402" stroke="var(--wp--preset--color--svg-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>';
			$output .= '</button>';
		}
	}

	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= "</li>\n";
	}

	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$output .= "</ul>\n";
	}
}

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
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! defined( 'PLAYSTORE_PLUGIN_FILE' ) ) {
	define( 'PLAYSTORE_PLUGIN_FILE', __FILE__ );
}

// Autoload
require_once __DIR__ . '/vendor/autoload.php';


PlayStore\Plugin::init();

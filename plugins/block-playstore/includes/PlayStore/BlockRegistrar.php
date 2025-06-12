<?php
namespace PlayStore;
// Exit if accessed directly
if ( ! defined( 'ABSPATH' )) {
	exit;
}


class BlockRegistrar {
	public static function init() {
		add_action( 'init', array( self::class, 'register_blocks' ) );
	}

	public static function register_blocks() {
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( PLAYSTORE_ABSPATH . 'build', PLAYSTORE_ABSPATH . 'build/blocks-manifest.php' );
			return;
		}

		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( PLAYSTORE_ABSPATH . 'build', PLAYSTORE_ABSPATH . 'build/blocks-manifest.php' );
		}

		$manifest_data = require PLAYSTORE_ABSPATH . 'build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( PLAYSTORE_ABSPATH . "build/{$block_type}" );
		}
	}
}

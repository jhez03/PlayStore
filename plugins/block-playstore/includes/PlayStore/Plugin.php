<?php

/**
 * Main Plugin Loader for PlayStore
 *
 * @package PlayStore
 */

namespace PlayStore;

use Playstore\CustomTypes;

if ( ! defined( 'ABSPATH' )) {
	exit;
}

final class Plugin {



	/**
	 * Plugin version.
	 *
	 * @var string
	 */
	private string $version = '1.0.0';

	/**
	 * Singleton instance.
	 *
	 * @var Plugin|null
	 */
	private static ?Plugin $instance = null;

	/**
	 * Returns the singleton instance.
	 */
	public static function init(): self {
		if (is_null( self::$instance )) {
			self::$instance = new self();
			self::$instance->define_constants();
			self::$instance->init_services();
		}
		return self::$instance;
	}

	/**
	 * Define plugin constants.
	 */
	private function define_constants(): void {
		$this->define( 'PLAYSTORE_VERSION', $this->version );
		$this->define( 'PLAYSTORE_PLUGIN_BASENAME', plugin_basename( PLAYSTORE_PLUGIN_FILE ) );
		$this->define( 'PLAYSTORE_ABSPATH', dirname( PLAYSTORE_PLUGIN_FILE ) . '/' );
		$this->define( 'PLAYSTORE_URL', plugin_dir_url( PLAYSTORE_PLUGIN_FILE ) );
		$this->define( 'PLAYSTORE_PATH', plugin_dir_path( PLAYSTORE_PLUGIN_FILE ) );
		$this->define( 'PLAYSTORE_ASSETS_URL', plugins_url( 'assets/', PLAYSTORE_PLUGIN_FILE ) );
	}

	/**
	 * Helper to define a constant if not already defined.
	 */
	private function define( string $name, mixed $value ): void {
		if ( ! defined( $name )) {
			define( $name, $value );
		}
	}

	/**
	 * Initialize all core plugin services.
	 */
	private function init_services(): void {
		$services = array(
			BlockRegistrar::class,
			Navigation::class,
			WooCommerce::class,
			General::class,
			CustomTypes::class,
			CustomTaxonomies::class,
			RestApi::class,

		);

		foreach ($services as $service) {
			if (class_exists( $service ) && method_exists( $service, 'init' )) {
				$service::init();
			}
		}
	}

	/**
	 * Private constructor (singleton).
	 */
	private function __construct() {}

	/**
	 * Disable cloning.
	 */
	private function __clone(): void {}

	/**
	 * Disable unserializing.
	 */
	public function __wakeup(): void {
		do_action( 'playstore_plugin_wakeup_violation' );
	}
}

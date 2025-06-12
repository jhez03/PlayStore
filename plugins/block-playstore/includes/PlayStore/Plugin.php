<?php
/**
 * Main Plugin Loader for PlayStore
 *
 * @package PlayStore
 */

namespace PlayStore;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Plugin {
	/** @var Plugin|null */
	private static $instance = null;
	private $version         = '1.0.0';

	/**
	 * Returns the singleton instance.
	 */
	public static function init(): self {
		if ( is_null( self::$instance ) ) {
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
		$this->define( 'PLAYSTORE_PATH', plugin_dir_path( __DIR__ ) );
		$this->define( 'PLAYSTORE_ASSETS_URL', plugins_url( 'assets/', PLAYSTORE_PLUGIN_FILE ) );
	}

	/**
	 * Define a constant if not already defined.
	 */
	private function define( string $name, $value ): void {
		if ( ! defined( $name ) ) {
			define( $name, $value );
		}
	}

	/**
	 * Initialize all core services.
	 */
	private function init_services(): void {
		$services = array(
			BlockRegistrar::class,
			Navigation::class,
			Woocommerce::class,
			General::class,
			CustomTypes::class,
			RestApi::class,

		);

		foreach ( $services as $service ) {
			if ( class_exists( $service ) && method_exists( $service, 'init' ) ) {
				$service::init();
			}
		}
	}

	/**
	 * Plugin constructor.
	 */
	private function __construct() {
		// Singleton pattern: private constructor
	}

	/**
	 * Disable clone.
	 */
	private function __clone() {}

	/**
	 * Disable unserialize.
	 */
	public function __wakeup() {
		do_action( 'playstore_plugin_wakeup_violation' );
	}
}

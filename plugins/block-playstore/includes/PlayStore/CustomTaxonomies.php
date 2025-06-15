<?php

namespace Playstore;
// Exit if accessed directly
if ( ! defined( 'ABSPATH' )) {
	exit;
}

class CustomTaxonomies {

	public static function init() {
		add_action( 'init', array( self::class, 'register_news_category_taxonomy' ) );
		add_action( 'init', array( self::class, 'register_platform_taxonomy' ) );
		add_action( 'platform_add_form_fields', array( self::class, 'add_platform_image_field' ) );
		add_action( 'platform_edit_form_fields', array( self::class, 'edit_platform_image_field' ) );
		add_action( 'created_platform', array( self::class, 'save_platform_thumbnails' ) );
		add_action( 'edited_platform', array( self::class, 'save_platform_thumbnails' ) );
		add_filter( 'manage_edit-platform_columns', array( self::class, 'show_thumbnail_column' ) );
		add_filter( 'manage_platform_custom_column', array( self::class, 'show_image_in_column' ), 10, 3 );
	}

	public static function register_news_category_taxonomy() {
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
	public static function register_platform_taxonomy() {
		$labels = array(
			'name'          => _x( 'Platforms', 'taxonomy general name', 'textdomain' ),
			'singular_name' => _x( 'Platform', 'taxonomy singular name', 'textdomain' ),
			'search_items'  => __( 'Search Platforms', 'textdomain' ),
			'all_items'     => __( 'All Platforms', 'textdomain' ),
			'edit_item'     => __( 'Edit Platform', 'textdomain' ),
			'update_item'   => __( 'Update Platform', 'textdomain' ),
			'add_new_item'  => __( 'Add New Platform', 'textdomain' ),
			'new_item_name' => __( 'New Platform Name', 'textdomain' ),
			'menu_name'     => __( 'Platforms', 'textdomain' ),
		);

		$args = array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'show_admin_column' => false,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'platform' ),
			'show_in_rest'      => true,
		);

		register_taxonomy( 'platform', array( 'product' ), $args );
	}
	public static function add_platform_image_field() {
		?>
	<div class="form-field">
		<label for="platform_thumbnail"><?php _e( 'Thumbnail', 'textdomain' ); ?></label>
		<input type="hidden" id="platform_thumbnail" name="platform_thumbnail" value="">
		<div id="platform_thumbnail_preview"></div>
		<button class="upload_image_button button"><?php _e( 'Upload/Add image', 'textdomain' ); ?></button>
	</div>
		<?php
		self::enqueue_media_script();
	}

	public static function edit_platform_image_field( $term ) {
		$thumbnail_id = get_term_meta( $term->term_id, 'platform_thumbnail_id', true );
		$image_url    = $thumbnail_id ? wp_get_attachment_image_url( $thumbnail_id, 'thumbnail' ) : '';
		?>
	<tr class="form-field">
		<th scope="row" valign="top"><label for="platform_thumbnail"><?php _e( 'Thumbnail', 'textdomain' ); ?></label></th>
		<td>
			<input type="hidden" id="platform_thumbnail" name="platform_thumbnail" value="<?php echo esc_attr( $thumbnail_id ); ?>">
			<div id="platform_thumbnail_preview">
				<?php if ($image_url) : ?>
					<img src="<?php echo esc_url( $image_url ); ?>" style="max-width: 100px;">
				<?php endif; ?>
			</div>
			<button class="upload_image_button button"><?php _e( 'Upload/Add image', 'textdomain' ); ?></button>
		</td>
	</tr>
		<?php
		self::enqueue_media_script();
	}
	public static function show_thumbnail_column( $columns ) {
		$columns['thumbnail'] = __( 'Thumbnail', 'textdomain' );
		return $columns;
	}
	public static function show_image_in_column( $content, $column_name, $term_id ) {
		if ($column_name === 'thumbnail') {
			$thumb_id = get_term_meta( $term_id, 'platform_thumbnail_id', true );
			$image    = $thumb_id ? wp_get_attachment_image( $thumb_id, 'thumbnail', false, array( 'style' => 'max-width: 50px; height: auto;' ) ) : '';
			$content  = $image ?: '—';
		}
		return $content;
	}
	public static function save_platform_thumbnails( $term_id ) {
		if (isset( $_POST['platform_thumbnail'] ) ) {
			$thumbnail_id = absint( $_POST['platform_thumbnail'] );
			if ( $thumbnail_id ) {
				update_term_meta( $term_id, 'platform_thumbnail_id', $thumbnail_id );
			} else {
				delete_term_meta( $term_id, 'platform_thumbnail_id' );
			}
		} else {
			delete_term_meta( $term_id, 'platform_thumbnail_id' );
		}
	}
	public static function enqueue_media_script() {
		wp_enqueue_media();
		?>
	<script>
		jQuery(document).ready(function($){
			var mediaUploader;

			$('.upload_image_button').click(function(e) {
				e.preventDefault();
				var button = $(this);
				var input = button.siblings('input[type=hidden]');
				var preview = button.siblings('#platform_thumbnail_preview');

				if (mediaUploader) {
					mediaUploader.open();
					return;
				}

				mediaUploader = wp.media({
					title: 'Select Image',
					button: {
						text: 'Use this image'
					},
					multiple: false
				});

				mediaUploader.on('select', function() {
					var attachment = mediaUploader.state().get('selection').first().toJSON();
					input.val(attachment.id);
					var imageUrl = attachment.url;
					if (attachment.sizes) {
						if (attachment.sizes.thumbnail) {
							imageUrl = attachment.sizes.thumbnail.url;
						} else {
							// Try another available size, e.g., 'medium'
							if (attachment.sizes.medium) {
								imageUrl = attachment.sizes.medium.url;
							}
						}
					}

					preview.html('<img src="' + imageUrl + '" style="max-width: 100px;" />');
				});

				mediaUploader.open();
			});
		});
	</script>
		<?php
	}
}

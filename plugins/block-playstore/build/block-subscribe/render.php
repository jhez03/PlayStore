<?php
/**
 * Render callback for the Playstore Subscribe block.
 *
 * @param array $attributes Block attributes.
 * @param string $content Inner Blocks content.
 * @return string
 */
	$backgroundUrl = isset( $attributes['backgroundUrl'] ) ? esc_url( $attributes['backgroundUrl'] ) : '';
	$title         = isset( $attributes['title'] ) ? $attributes['title'] : '';
	$description   = isset( $attributes['description'] ) ? $attributes['description'] : '';
	$shortCode     = isset( $attributes['shortCode'] ) ? $attributes['shortCode'] : '';

$blockProps = get_block_wrapper_attributes(
	array(
		'class' => 'playstore-subscribe',
	)
)


?>
	<section <?php echo $blockProps; ?>>
	<div class="playstore-subscribe w-full relative ">
		<?php if ( $backgroundUrl ) : ?>
			<img
				src="<?php echo $backgroundUrl; ?>"
				alt="<?php esc_attr_e( 'Background Image', 'block-playstore' ); ?>"
				class="w-full h-[566px]"
			/>
		<?php else : ?>
			<div class="playstore-subscribe-placeholder">
				<p><?php esc_html_e( 'Select a background image', 'block-playstore' ); ?></p>
			</div>
		<?php endif; ?>
		<div class="subscribe-mask absolute inset-0"></div>
		<div class="absolute inset-0 2xl:px-[190px] 2xl:py-[120px]">
			<div class="subscribe-header w-full grid grid-cols-2">
				<div>
					<?php if ( $title ) : ?>
						<h1
							class="text-6xl font-bold text-[var(--wp--preset--color--primary)] mb-[16px]"
						>
							<?php echo $title; ?>
						</h1>
					<?php endif; ?>
					<?php if ( $description ) : ?>
						<p
							class="text-[20px] text-[var(--wp--preset--color--text-secondary)] font-normal leading-[32px] mb-[32px]"
						>
							<?php echo wp_kses_post( $description ); ?>
						</p>
					<?php endif; ?>

					<?php if ( $shortCode ) : ?>
							<?php echo do_shortcode( $shortCode ); ?>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
	</section>





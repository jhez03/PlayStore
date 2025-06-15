<?php
/**
 * Render callback for the Playstore Subscribe block.
 *
 * @param array $attributes Block attributes.
 * @param string $content Inner Blocks content.
 * @return string
 * @var array $attributes
 */
	$backgroundUrl = isset( $attributes['backgroundUrl'] ) ? esc_url( $attributes['backgroundUrl'] ) : '';
	$title         = isset( $attributes['title'] ) ? $attributes['title'] : '';
	$description   = isset( $attributes['description'] ) ? $attributes['description'] : '';
	$shortCode     = isset( $attributes['shortCode'] ) ? $attributes['shortCode'] : '';

$blockProps = get_block_wrapper_attributes(
	array(
		'class' => 'playstore-section',
	)
)


?>
	<section <?php echo $blockProps; ?>>
	<div class="relative w-full h-full pt-10 px-5 lg:px-[190px]">
			<div class="absolute inset-0">
				<?php if ( $backgroundUrl ) : ?>
				<img
					src="<?php echo $backgroundUrl; ?>"
					alt="<?php esc_attr_e( 'Background Image', 'block-playstore' ); ?>"
					class="w-full h-full object-cover object-center"
				/>
				<?php else : ?>
				<div class="playstore-subscribe-placeholder">
					<p><?php esc_html_e( 'No background-image', 'block-playstore' ); ?></p>
				</div>
				<?php endif; ?>
			</div>
		<div class="background-mask absolute inset-0 z-1"></div>
		<div class="relative inset-0 z-2">
			<div class="subscribe-header w-full grid grid-cols-1 xl:grid-cols-2">
				<div>
					<?php if ( $title ) : ?>
						<h1
							class="text-3xl md:text-6xl font-bold text-[var(--wp--preset--color--primary)] mb-[16px]"
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





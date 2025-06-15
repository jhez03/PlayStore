<?php
$block_props       = get_block_wrapper_attributes(
	array(
		'class' => 'playstore-section',
	)
);
$header            = $attributes['header'] ?? '';
	$description   = $attributes['description'] ?? '';
	$backgroundUrl = $attributes['backgroundUrl'] ?? '';
	$ctaIcon       = $attributes['ctaIcon'] ?? '';
	$ctaImage      = $attributes['ctaImage'] ?? '';
	$ctaButtons    = $attributes['ctaButtons'] ?? array();
?>
<section <?php echo $block_props; ?>>
	<!-- Slider main container -->
	<div class="md:p-10 xl:px-[72px] xl:py-[120px] relative">
			<?php if ( $backgroundUrl ) : ?>
				<div class="absolute inset-0">
					<img
						src="<?php echo esc_url( $backgroundUrl ); ?>"
						alt="<?php esc_attr_e( 'Background Image', 'block-playstore' ); ?>"
						class="w-full h-full object-cover object-center"
					/>
				</div>
			<?php endif; ?>
			<div class="background-mask absolute inset-0"></div>

			<div class="relative inset-0">
				<div class="grid grid-cols-1 md:grid-cols-2 p-[25px] xl:p-[48px] rounded-[8px] backdrop-blur-[12px] border border-solid border-[var(--wp--preset--color--divider-main)]">
					<div>
						<?php if ( $ctaIcon ) : ?>
							<img
								src="<?php echo esc_url( $ctaIcon ); ?>"
								alt="<?php esc_attr_e( 'Cta Icon', 'block-playstore' ); ?>"
								class="w-[30px] md:w-20 mb-10"
							/>
						<?php endif; ?>

						<?php if ( $header ) : ?>
							<h2 class="text-[30px] lg:text-[54px] leader-[75px] text-[var(--wp--preset--color--text-primary)] font-bold">
								<?php echo esc_html( $header ); ?>
							</h2>
						<?php endif; ?>

						<?php if ( $description ) : ?>
							<p class="text-[20px] max-w-prose text-[var(--wp--preset--color--text-secondary)] font-lato font-normal leader-[32px]">
								<?php echo esc_html( $description ); ?>
							</p>
						<?php endif; ?>

						<?php if ( ! empty( $ctaButtons ) && is_array( $ctaButtons ) ) : ?>
							<div class="flex text-center gap-[10px] my-[32px]">
								<?php foreach ( $ctaButtons as $btn ) : ?>
									<a
										href="<?php echo esc_url( $btn['url'] ?? '#' ); ?>"
										class="no-underline px-[20px] py-[15px] md:px-[32px] md:py-[20px] rounded-[5px] border border-solid border-[var(--wp--preset--color--divider-main)]"
									>
										<?php echo esc_html( $btn['label'] ?? __( 'CTA Button', 'block-playstore' ) ); ?>
									</a>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>
					</div>
					<div>
						<?php if ( $ctaImage ) : ?>
							<img
								src="<?php echo esc_url( $ctaImage ); ?>"
								alt="<?php esc_attr_e( 'Cta Image', 'block-playstore' ); ?>"
								class="md:absolute max-lg:w-[60%] max-lg:top-0 -top-10 right-0 bg-contain bg-no-repeat bg-center"
							/>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>
</section>


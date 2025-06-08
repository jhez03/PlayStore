<?php
/**
 * Server-side rendering for the block.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The block content.
 * @param WP_Block $block    The block instance.
 * @return string Block HTML.
 * @var array $attributes
 */

$backgroundType = isset( $attributes['backgroundType'] ) ? $attributes['backgroundType'] : 'image';
$backgroundUrl  = isset( $attributes['backgroundUrl'] ) ? $attributes['backgroundUrl'] : '';
$headline       = isset( $attributes['headline'] ) ? $attributes['headline'] : '';
$subheadline    = isset( $attributes['subheadline'] ) ? $attributes['subheadline'] : '';
$buttonText     = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : '';
$buttonColor    = isset( $attributes['buttonColor'] ) ? $attributes['buttonColor'] : '';
$partners       = isset( $attributes['partners'] ) && is_array( $attributes['partners'] ) ? $attributes['partners'] : array();
$button_style   = '';
if ( ! empty( $buttonColor ) ) {
	$button_style = 'background-color:' . esc_attr( $buttonColor ) . ';border-color:' . esc_attr( $buttonColor ) . ';';
}

$blockProps = get_block_wrapper_attributes(
);
?>

<section <?php echo $blockProps; ?>>
	<div class="relative  overflow-hidden">
		<div class="absolute inset-0 z-0">
			<?php if ( ! empty( $backgroundUrl ) ) : ?>
				<?php if ( $backgroundType === 'video' ) : ?>
					<video
						src="<?php echo esc_url( $backgroundUrl ); ?>"
						autoplay
						loop
						muted
						class="object-cover w-full h-full"
					></video>
				<?php else : ?>
					<img
						src="<?php echo esc_url( $backgroundUrl ); ?>"
						alt="<?php esc_attr_e( 'Hero Background', 'your-textdomain' ); ?>"
						class="object-cover w-full h-full "
					/>
				<?php endif; ?>
			<?php else : ?>
				<div class="flex items-center justify-center w-full h-full bg-gray-200">
					<span class="text-gray-500"><?php esc_html_e( 'No background selected', 'your-textdomain' ); ?></span>
				</div>
			<?php endif; ?>
			<div class="absolute inset-0 z-10 section-mask"></div>
		</div>
		<div class="max-lg:mx-20 max-lg:my-50 max-sm:my-30 max-sm:mx-10 my-[390px] mx-[190px] relative  h-full ">
			<div>
				<?php if ( ! empty( $headline ) ) : ?>
					<h1 class="text-3xl sm:text-4xl lg:text-[64px] font-bold text-[var(--wp--preset--color--text-primary)] ">
						<?php echo wp_kses_post( $headline ); ?>
					</h1>
				<?php endif; ?>
				<?php if ( ! empty( $subheadline ) ) : ?>
					<p class="text-base sm:text-lg text-[var(--text-primary)] mb-6 sm:mb-8">
						<?php echo wp_kses_post( $subheadline ); ?>
					</p>
				<?php endif; ?>
				<button
					type="button"
					style="<?php echo esc_attr( $button_style ); ?>"
					class="text-white main-gradient shadow-button rounded-[5px] px-[32px] sm:px-8 py-[20px] sm:py-3 text-base sm:text-lg font-semibold"
				>
					<span class="inline-block">
						<?php echo wp_kses_post( $buttonText ); ?>
					</span>
				</button>
				</div>
		</div>
		<div class="relative max-xl:px-20 max-lg:py-10 max-lg:px-5 max-sm:py-5 px-[190px] py-[51px]  bottom-0 ">
			<div class="z-2 relative partner-swiper">
				<div class="flex swiper-wrapper items-center justify-between ">
					<?php foreach ( $partners as $partner ) : ?>
						<?php if ( isset( $partner['type'] ) && $partner['type'] === 'text' ) : ?>
					<div class="text-2xl font-bold text-[#0a090a] <?php echo isset( $partner['style'] ) ? esc_attr( $partner['style'] ) : ''; ?>">
						<span><?php echo wp_kses_post( $partner['value'] ); ?></span>
							<?php if ( ! empty( $partner['subvalue'] ) ) : ?>
						<br />
						<span class="text-sm"><?php echo wp_kses_post( $partner['subvalue'] ); ?></span>
						<?php endif; ?>
					</div>
					<?php elseif ( isset( $partner['type'] ) && $partner['type'] === 'image' ) : ?>
						<?php
						// Normal logo (light mode)
						if ( ! empty( $partner['value'] ) ) :
							?>
							<div class="swiper-slide items-center justify-between dark:hidden">
								<img
									src="<?php echo esc_url( $partner['value'] ); ?>"
									alt=""
								/>
							</div>
					<?php endif; ?>
						<?php
						if ( ! empty( $partner['darkValue'] ) ) :
							?>
							<div class="swiper-slide items-center justify-between hidden dark:inline-block">
								<img
									src="<?php echo esc_url( $partner['darkValue'] ); ?>"
									alt=""
								/>
						</div>
							<?php endif; ?>
					<?php endif; ?>
				<?php endforeach; ?>
					</div>
			</div>
			<div class="absolute inset-0 z-0 repeater-mask"></div>
		</div>
	</div>
</section>

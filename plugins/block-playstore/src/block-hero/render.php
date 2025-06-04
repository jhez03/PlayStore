<?php
/**
 * Server-side rendering for the block.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The block content.
 * @param WP_Block $block    The block instance.
 * @return string Block HTML.
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

$blockProps = get_block_wrapper_attributes();
?>

<div <?php echo $blockProps; ?>>
	<section class="relative h-[1031px] overflow-hidden">
		<div class="playstore-hero absolute inset-0 z-0">
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
			<div class="absolute inset-0 z-10 bg-[linear-gradient(270deg,_var(--secondary-0,_rgba(14,_13,_15,_0))_0%,_#ECECEC_79.5%)] dark:bg-[linear-gradient(270deg,_var(--background-0,_rgba(14,_13,_15,_0))_0%,_#0D0B0F_79.5%)]  "></div>
		</div>
		<div class="playstore-hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
			<div class="max-w-lg">
				<?php if ( ! empty( $headline ) ) : ?>
					<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
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
					class="text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold"
				>
					<span class="inline-block">
						<?php echo wp_kses_post( $buttonText ); ?>
					</span>
				</button>
			</div>
		</div>
		<div class="playstore-hero-logos z-11 absolute px-[190px] w-full px-[51px] py-[51px] bottom-0 h-[150px] bg-[linear-gradient(270deg,_var(--background-0,_rgba(250,_250,_250,_0.00))_0%,_var(--background-default,_#FAFAFA)_100%)] dark:bg-[linear-gradient(270deg,_var(--background-0,_rgba(14,_13,_15,_0))_0%,_#0D0B0F_100%)]">
			<div class="playstore-partners swiper partner-swiper">
				<div class="flex swiper-wrapper items-center justify-between">
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
							<div class="flex swiper-slide items-center justify-between dark:hidden">
								<img
									src="<?php echo esc_url( $partner['value'] ); ?>"
									alt=""
								/>
							</div>
					<?php endif; ?>
						<?php
						if ( ! empty( $partner['darkValue'] ) ) :
							?>
							<div class="flex swiper-slide items-center justify-between hidden dark:inline-block">
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
		</div>
	</section>
</div>

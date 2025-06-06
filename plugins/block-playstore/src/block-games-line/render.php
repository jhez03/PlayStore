<?php
require_once plugin_dir_path( __DIR__ ) . '/../core/playstore_woocommerce.php';

$products = Playstore_WooCommerce::get_products(
	array(
		'posts_per_page' => 12,
	)
);
?>
<div class = 'wp-block-create-block-block-games-line' >
	<div class="games-line-swiper">
		<div class="swiper-wrapper flex gap-[8px] py-[8px] items-start">
			<?php foreach ($products as $game) : ?>
			<div class="swiper-slide shrink-0 group cursor-pointer transition-transform hover:scale-105">
				<div class="relative overflow-hidden rounded-lg shadow-lg">
					<a href="<?php echo esc_url( $game['url'] ); ?>" target="_blank" rel="noopener noreferrer">
						<img
							src="<?php echo htmlspecialchars( $game['image'] ); ?>"
							alt="<?php echo htmlspecialchars( $game['title'] ); ?>"
							width="300"
							height="400"
							class="game-cover object-cover transition-all group-hover:brightness-110"
						/>
					</a>
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
				</div>
			</div>
			<?php endforeach; ?>
		</div>
		</div>
	<!-- Slider main container -->
</div>

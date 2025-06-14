<?php
/**
 * - header
 * - description
 * - newsCount (optional)
 *
 * @var array $attributes
 */
$header      = isset( $attributes['header'] ) ? $attributes['header'] : '';
$description = isset( $attributes['description'] ) ? $attributes['description'] : '';
$blockProps  = get_block_wrapper_attributes(
	array(
		'class' => 'playstore-section',
	)
);
$products    = Playstore\WooCommerce::get_products(
	array(
		'posts_per_page' => 6,
		'post_status'    => 'published',
		'tax_query'      => array(
			array(
				'taxonomy' => 'product_visibility',
				'field'    => 'name',
				'terms'    => 'featured',
				'operator' => 'IN',

			),
		),

	)
);

?>
<section <?php echo $blockProps; ?> >
	<div class="relative ">

		<div class="playstore-news-wrapper relative flex flex-col item-center gap-[48px] px-5 xl:px-20 ">
			<div class="news-header text-center w-full">
				<?php if ( $header ) : ?>
				<h2 class="accent-gradient text-[54px] font-bold leading-[75.6px] whitespace-nowrap">
					<?php echo esc_html( $header ); ?>
				</h2>
				<?php endif; ?>
				<?php if ( $description ) : ?>
				<p class="text-xl text-[var(--wp--preset--color--text-secondary)] font-normal leading-[32px] mt-[24px]">
					<?php echo esc_html( $description ); ?>
				</p>
				<?php endif; ?>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-[48px] gap-5 mx-auto ">
				<?php foreach ( $products as $featured ) : ?>
				<a href="<?php echo esc_html( $featured['url'] ); ?>">
				<div class="rounded-[8px] overflow-hidden ">
					<div>
						<img class="w-full" src="<?php echo esc_url( $featured['image'] ?? '' ); ?>" alt="Ubisoft Classics Games" />
					</div>
					<div>
					<div class="text-[var(--wp--preset--color--text-secondary)] gap-2 flex font-normal text-left xl:text-14px">
						<?php if (isset( $featured['sale_price'] )) : ?>
							<div class="text-[var(--wp--preset--color--purple-main)]"><?php echo $featured['sale_price']; ?> </div>
						<?php endif; ?>
						<?php if (isset( $featured['regular_price'] )) : ?>
						<div class="text-[var(--wp--preset--color--text-secondary)] line-through"><?php echo $featured['regular_price']; ?></div>
						<?php endif; ?>
					</div>
					<h2 class="whitespace-nowrap my-[8px] text-[var(--wp--preset--color--text-primary)] xl:text-[18px] overflow-hidden text-ellipsis ">
						<?php echo esc_html( $featured['title'] ); ?>
					</h2>

					<?php if ( ! empty( $featured['platforms'] ) ) : ?>
					<div class="flex gap-[12px]">
						<?php foreach ( $featured['platforms'] as $platform ) : ?>
						<div>
							<?php if ( ! empty( $platform['image'] ) ) : ?>
						<img src="<?php echo $platform['image']; ?>" alt="<?php echo $featured['title']; ?>">
							<?php endif; ?>
						</div>
						<?php endforeach; ?>

					</div>
					<?php endif; ?>
					</div>
				</div>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>

</section>


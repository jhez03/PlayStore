<?php
/**
 * - header
 * - description
 * - newsCount (optional)
 * @var array $attributes
 */
$header      = isset( $attributes['header'] ) ? $attributes['header'] : '';
$description = isset( $attributes['description'] ) ? $attributes['description'] : '';
$blockProps  = get_block_wrapper_attributes(
	array(
		'class' => 'playstore-section',
	)
);

?>
<section <?php echo $blockProps; ?> >
		<div class="relative ">

		<div class="playstore-news-wrapper relative flex flex-col item-center gap-[48px] px-5 xl:px-20 ">
			<div class="news-header text-center w-full">
				<?php if ($header) : ?>
				<h2 class="accent-gradient text-[54px] font-bold leading-[75.6px] whitespace-nowrap">
					<?php echo esc_html( $header ); ?>
				</h2>
				<?php endif; ?>
				<?php if ($description) : ?>
				<p class="text-xl text-[var(--wp--preset--color--text-secondary)] font-normal leading-[32px] mt-[24px]">
					<?php echo esc_html( $description ); ?>
				</p>
				<?php endif; ?>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:gap-[48px] gap-5 mx-auto text-center">
				<div class="bg-[var(--wp--preset--color--background-default)]  rounded-lg overflow-hidden shadow-lg">
					<div class="h-2 main-gradient"></div>
					<div class="px-5 py-6 xl:px-[48px] xl:pt-[46px] xl:pb-[24px]">
						<h2 class="text-xl sm:text-2xl md:text-3xl font-bold  accent-gradient ">
						</h2>
					</div>
					<div class="">
						<image class="w-full" src="" alt="Ubisoft Classics Games" />
					</div>
					<p class="text-[var(--wp--preset--color--text-secondary)] px-5 py-5 xl:px-[48px] xl:py-[24px] text-[20px] font-[400] ">
					</p>
					<div class="pb-[48px] flex justify-center" >
						<a href="">
							<button class="main-gradient shadow-[0px_16px_24px_0px_rgba(61,175,226,0.48)] rounded-[5px] flex items-center gap-[10px] px-[32px] py-[20px] text-[14px] text-[#FAFAFA]">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path d="M16 2H8C4.5 2 3 4 3 7V17C3 20 4.5 22 8 22H16C19.5 22 21 20 21 17V7C21 4 19.5 2 16 2ZM8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25ZM16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75ZM18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z" fill="var(--wp--preset--color--white-main)"/>
								</svg>
								OPEN THE POST
							</button>
						</a>
					</div>
				</div>


			</div>
		</div>
	</div>

</section>


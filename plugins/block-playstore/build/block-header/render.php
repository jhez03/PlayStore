<?php
/** @var array $attributes */
$logo          = $attributes['logo'] ?? null;
$cartLink      = $attributes['cartLink'] ?? null;
$memberLink    = $attributes['memberLink'] ?? null;
$selected_menu = $attributes['selectedMenu'] ?? null;
$menu          = wp_get_nav_menu_object( $attributes['selectedMenu'] ) ?? null;
?>

<div class="wp-block-create-block-block-header">
<header class="playstore-header relative w-full bg-[var(--wp--preset--color--background-default)]  py-2 px-8 z-50 text-(--wp--preset--color--text-primary)">
	<div class="inner-header">
		<div class="flex items-center justify-between h-16">

			<!-- Desktop Navigation -->
			<nav class="flex items-center  gap-[10px] xl:gap-[48px] ">
					<?php if ( ! empty( $logo )) : ?>
					<img src="<?php echo htmlspecialchars( $logo['url'] ); ?>" alt="Logo" class="header-logo" />
					<?php endif; ?>
					<?php
					wp_nav_menu(
						array(
							'menu'       => $menu,
							'container'  => true,
							'menu_class' => 'playstore-nav-links hidden lg:flex lg:gap-[32px] gap-[10px]',
							'walker'     => new Playstore_Nav_Walker(),
						)
					);
					?>

			</nav>

			<div class="flex items-center space-x-4 lg:space-x-4 ">
					<div class="header-search cursor-pointer">
						<svg class=" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
							<path d="M22.29 22.16L17.61 17.45C20.97 13.7 20.7 7.94002 16.95 4.55002C13.2 1.16002 7.44002 1.46002 4.05002 5.21002C0.660021 8.96002 0.960021 14.72 4.71002 18.11C8.19002 21.26 13.5 21.26 16.98 18.11L21.69 22.82L22.29 22.16ZM10.83 19.55C6.30002 19.55 2.61002 15.86 2.61002 11.33C2.61002 6.77002 6.30002 3.11002 10.83 3.11002C15.36 3.11002 19.05 6.80002 19.05 11.33C19.05 15.86 15.36 19.55 10.83 19.55Z" fill="var(--wp--preset--color--svg-main)" fill-opacity="0.64"/>
							<path d="M10.8301 4.33984V5.23984C14.1901 5.23984 16.9201 7.96984 16.9201 11.3298H17.8201C17.8201 7.45984 14.7001 4.33984 10.8301 4.33984Z" fill="var(--wp--preset--color--svg-main, rgb(255,255,255))" fill-opacity="0.64"/>
						</svg>
					</div>
				<div class="header-mode-switcher cursor-pointer">
						<svg class=""
							xmlns="http://www.w3.org/2000/svg"
							width="36"
							height="36"
							viewBox="0 0 20 25"
							fill="none"
						>
							<path
								d="M13 18.5V6.5"
								stroke="var(--wp--preset--color--svg-main)"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M1 12.5H4"
								stroke="var(--wp--preset--color--svg-main)"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M4.50977 4.01025L6.63977 6.14025"
								stroke="var(--wp--preset--color--svg-main)"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13 0.5V3.5"
								stroke="var(--wp--preset--color--svg-main)"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13 24.5V21.5"
								stroke="var(--wp--preset--color--svg-main)"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M4.50977 20.9899L6.63977 18.8599"
								stroke="var(--wp--preset--color--svg-main)"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13 18.5C16.3137 18.5 19 15.8137 19 12.5C19 9.18629 16.3137 6.5 13 6.5C9.68629 6.5 7 9.18629 7 12.5C7 15.8137 9.68629 18.5 13 18.5Z"
								stroke="var(--wp--preset--color--svg-main)"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>

				</div>
				<?php if ( ! empty( $cartLink )) : ?>
					<div class="header-cart-link">
						<a href="<?php echo htmlspecialchars( $cartLink ); ?>">
							<svg class="dark:hidden" xmlns="http://www.w3.org/2000/svg" width="26" height="19" viewBox="0 0 26 19" fill="none">
	<path d="M2.71436 6.07178L4.42864 18.0718H21.5715L23.2858 6.07178" stroke="var(--wp--preset--color--svg-main)" stroke-opacity="0.64" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M7.85693 7.78585L9.57122 0.928711" stroke="var(--wp--preset--color--svg-main)" stroke-opacity="0.64" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M18.143 7.78585L16.4287 0.928711" stroke="var(--wp--preset--color--svg-main)" stroke-opacity="0.64" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M1 6.07178H25" stroke="var(--wp--preset--color--svg-main)" stroke-opacity="0.64" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
				<svg class="hidden dark:block" xmlns="http://www.w3.org/2000/svg" width="26" height="19" viewBox="0 0 26 19" fill="none">
	<path d="M2.71436 6.07178L4.42864 18.0718H21.5715L23.2858 6.07178" stroke="white" stroke-opacity="0.64" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M7.85693 7.78585L9.57122 0.928711" stroke="white" stroke-opacity="0.64" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M18.143 7.78585L16.4287 0.928711" stroke="white" stroke-opacity="0.64" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M1 6.07178H25" stroke="white" stroke-opacity="0.64" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
						</a>
					</div>
				<?php endif; ?>
				<?php if ( ! empty( $memberLink )) : ?>
					<div class="hidden lg:block ">
						<a href="<?php echo htmlspecialchars( $memberLink ); ?>">Member Area</a>
					</div>
					<div class="lg:hidden ">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M12.1605 11.62C12.1305 11.62 12.1105 11.62 12.0805 11.62C12.0305 11.61 11.9605 11.61 11.9005 11.62C9.00055 11.53 6.81055 9.25 6.81055 6.44C6.81055 3.58 9.14055 1.25 12.0005 1.25C14.8605 1.25 17.1905 3.58 17.1905 6.44C17.1805 9.25 14.9805 11.53 12.1905 11.62C12.1805 11.62 12.1705 11.62 12.1605 11.62ZM12.0005 2.75C9.97055 2.75 8.31055 4.41 8.31055 6.44C8.31055 8.44 9.87055 10.05 11.8605 10.12C11.9105 10.11 12.0505 10.11 12.1805 10.12C14.1405 10.03 15.6805 8.42 15.6905 6.44C15.6905 4.41 14.0305 2.75 12.0005 2.75Z" fill="var(--wp--preset--color--svg-main, rgb(255,255,255))" fill-opacity="0.64"/>
							<path d="M12.1696 22.55C10.2096 22.55 8.23961 22.05 6.74961 21.05C5.35961 20.13 4.59961 18.87 4.59961 17.5C4.59961 16.13 5.35961 14.86 6.74961 13.93C9.74961 11.94 14.6096 11.94 17.5896 13.93C18.9696 14.85 19.7396 16.11 19.7396 17.48C19.7396 18.85 18.9796 20.12 17.5896 21.05C16.0896 22.05 14.1296 22.55 12.1696 22.55ZM7.57961 15.19C6.61961 15.83 6.09961 16.65 6.09961 17.51C6.09961 18.36 6.62961 19.18 7.57961 19.81C10.0696 21.48 14.2696 21.48 16.7596 19.81C17.7196 19.17 18.2396 18.35 18.2396 17.49C18.2396 16.64 17.7096 15.82 16.7596 15.19C14.2696 13.53 10.0696 13.53 7.57961 15.19Z" fill="var(--wp--preset--color--svg-main, rgb(255,255,255))" fill-opacity="0.64"/>
						</svg>
					</div>

				<?php endif; ?>
					<button id="hamburger"  class="lg:hidden" aria-controls="navbar-default" aria-expanded="false">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z" fill="var(--action-main-svg,rgb(14,13,15))" fill-opacity="0.64"/>
							<path d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z" fill="var(--action-main-svg,rgb(14,13,15))" fill-opacity="0.64"/>
							<path d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z" fill="var(--action-main-svg,rgb(14,13,15))" fill-opacity="0.64"/>
						</svg>
					</button>
			</div>
		</div>
	</div>
</header>
	<div id="hamburger-overlay" class="hamburger-overlay hidden" >
	<div class="hamburger-header">
		<?php if ( $logo && isset( $logo['url'] ) ) : ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header-logo-link">
				<img src="<?php echo esc_url( $logo['url'] ); ?>" alt="Logo" class="hamburger-logo" />
			</a>
		<?php endif; ?>
	<button id="hamburger-close" aria-label="Close Menu" class="cursor-pointer p-[6px]">

				<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
					<path d="M1 9L9 1" stroke="var(--action-main-svg, rgb(14,13,15))" stroke-opacity="0.64" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M9 9L1 1" stroke="var(--action-main-svg, rgb(14,13,15))" stroke-opacity="0.64" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
	</button>
	</div>
	<nav class="hamburger-menu">
	<?php
		wp_nav_menu(
			array(
				'theme_location' => 'playstore-header-menu',
				'container'      => false,
				'menu_class'     => 'hamburger-nav-links',
				'walker'         => new Playstore_Nav_Walker(),

			)
		);
		?>
	</nav>
</div>
</div>



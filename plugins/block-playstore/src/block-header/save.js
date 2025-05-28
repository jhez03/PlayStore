/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { memberLink, cartLink } = attributes;
	return (
		<div {...useBlockProps.save()}>
			<div className="inner-header">
				<InnerBlocks.Content />
				<div className="right-section">
					<div className="header-search">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M22.29 21.66L17.61 16.95C20.97 13.2 20.7 7.44002 16.95 4.05002C13.2 0.660021 7.44002 0.960021 4.05002 4.71002C0.660021 8.46002 0.960021 14.22 4.71002 17.61C8.19002 20.76 13.5 20.76 16.98 17.61L21.69 22.32L22.29 21.66ZM10.83 19.05C6.30002 19.05 2.61002 15.36 2.61002 10.83C2.61002 6.27002 6.30002 2.61002 10.83 2.61002C15.36 2.61002 19.05 6.30002 19.05 10.83C19.05 15.36 15.36 19.05 10.83 19.05Z"
								fill="var(--action-main-svg, rgb(14,13,15))"
								fill-opacity="0.64"
							/>
							<path
								d="M10.8301 3.83984V4.73984C14.1901 4.73984 16.9201 7.46984 16.9201 10.8298H17.8201C17.8201 6.95984 14.7001 3.83984 10.8301 3.83984Z"
								fill="var(--action-main-svg, rgb(14,13,15))"
								fill-opacity="0.64"
							/>
						</svg>
					</div>
					<div className="header-mode-switcher">
						<svg
							width="36"
							height="36"
							viewBox="0 0 36 36"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M21 24V12"
								stroke="var(--action-main-svg, rgb(14, 13, 15))"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M9 18H12"
								stroke="var(--action-main-svg, rgb(14, 13, 15))"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12.5098 9.51025L14.6398 11.6403"
								stroke="var(--action-main-svg, rgb(14, 13, 15))"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M21 6V9"
								stroke="var(--action-main-svg, rgb(14, 13, 15))"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M21 30V27"
								stroke="var(--action-main-svg, rgb(14, 13, 15))"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12.5098 26.4899L14.6398 24.3599"
								stroke="var(--action-main-svg, rgb(14, 13, 15))"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M21 24C24.3137 24 27 21.3137 27 18C27 14.6863 24.3137 12 21 12C17.6863 12 15 14.6863 15 18C15 21.3137 17.6863 24 21 24Z"
								stroke="var(--action-main-svg, rgb(14, 13, 15))"
								stroke-opacity="0.64"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					{cartLink && (
						<div className="header-cart-link">
							<a href={cartLink}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="26"
									height="20"
									viewBox="0 0 26 20"
									fill="none"
								>
									<path
										d="M2.71436 6.57178L4.42864 18.5718H21.5715L23.2858 6.57178"
										stroke="var(--action-main-svg, #0E0D0F)"
										stroke-opacity="0.64"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M7.85693 8.28585L9.57122 1.42871"
										stroke="var(--action-main-svg, #0E0D0F)"
										stroke-opacity="0.64"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M18.143 8.28585L16.4287 1.42871"
										stroke="var(--action-main-svg, #0E0D0F)"
										stroke-opacity="0.64"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M1 6.57178H25"
										stroke="var(--action-main-svg, #0E0D0F)"
										stroke-opacity="0.64"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</a>
						</div>
					)}
					{memberLink && (
						<div className="header-member-link">
							<a href={memberLink}>Member Area</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const memberLink = attributes.memberLink || "";
	const cartLink = attributes.cartLink || "";
	return (
		<>
			<div {...useBlockProps()}>
				<InspectorControls>
					<PanelBody title="Block Settings">
						<TextControl
							label="Member Link"
							value={memberLink}
							onChange={(value) => setAttributes({ memberLink: value })}
						/>
						<TextControl
							label="Cart Link"
							value={cartLink}
							onChange={(value) => setAttributes({ cartLink: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div className="inner-header">
					<InnerBlocks />
					<div className="right-section">
						<div className="header-search">
							<svg
								width="22"
								height="22"
								viewBox="0 0 22 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M21.29 20.66L16.61 15.95C19.97 12.2 19.7 6.44002 15.95 3.05002C12.2 -0.339979 6.44002 -0.0399786 3.05002 3.71002C-0.339979 7.46002 -0.0399786 13.22 3.71002 16.61C7.19002 19.76 12.5 19.76 15.98 16.61L20.69 21.32L21.29 20.66ZM9.83002 18.05C5.30002 18.05 1.61002 14.36 1.61002 9.83002C1.61002 5.27002 5.30002 1.61002 9.83002 1.61002C14.36 1.61002 18.05 5.30002 18.05 9.83002C18.05 14.36 14.36 18.05 9.83002 18.05Z"
									fill="var(--action-main)"
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
									stroke="var(--action-main)"
									stroke-opacity="0.64"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M9 18H12"
									stroke="var(--action-main)"
									stroke-opacity="0.64"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12.5098 9.51025L14.6398 11.6403"
									stroke="var(--action-main)"
									stroke-opacity="0.64"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M21 6V9"
									stroke="var(--action-main)"
									stroke-opacity="0.64"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M21 30V27"
									stroke="var(--action-main)"
									stroke-opacity="0.64"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12.5098 26.4899L14.6398 24.3599"
									stroke="var(--action-main)"
									stroke-opacity="0.64"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M21 24C24.3137 24 27 21.3137 27 18C27 14.6863 24.3137 12 21 12C17.6863 12 15 14.6863 15 18C15 21.3137 17.6863 24 21 24Z"
									stroke="var(--action-main)"
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
										width="22"
										height="14"
										viewBox="0 0 22 14"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M0.714355 0.571777L2.42864 12.5718H19.5715L21.2858 0.571777"
											stroke="var(--action-main)"
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
		</>
	);
}

import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
export default function save({ attributes }) {
	const { memberLink, cartLink } = attributes;
	return (
		<div {...useBlockProps()}>
			<div className="inner-header">
				<InnerBlocks.Content />
				<div className="right-section">
					<div className="header-search"></div>
					<div className="header-mode-switcher"></div>
					<div className="header-cart-link"></div>
					{cartLink && (
						<div className="header-member-link">
							<a href={cartLink}></a>
						</div>
					)}
					{memberLink && (
						<div className="header-member-link">
							<a href={memberLink}> Member Area</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

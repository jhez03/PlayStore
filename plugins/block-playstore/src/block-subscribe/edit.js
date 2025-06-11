import { __ } from "@wordpress/i18n";
import "./gradient-format-toolbar.js";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	InnerBlocks,
	PanelColorSettings,
} from "@wordpress/block-editor";
import { PanelBody, Button, TextControl } from "@wordpress/components";
import "./editor.css";

export default function Edit({ attributes, setAttributes }) {
	const { backgroundUrl, shortCode, title, description } = attributes;

	const onSelectImage = (img) => {
		setAttributes({ backgroundUrl: img.url });
	};

	const blockProps = useBlockProps({
		className: "playstore-section",
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title="Mailchimp Shortcode" initialOpen={true}>
					<TextControl
						label="Shortcode"
						value={shortCode}
						onChange={(shortcode) => setAttributes({ shortCode: shortcode })}
						help="Paste your Mailchimp form shortcode here. E.g. [mailchimp_form id='123']"
					/>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="relative w-full h-full pt-10 px-5 lg:px-[190px]">
					<div className="absolute inset-0">
						{backgroundUrl ? (
							<img
								src={backgroundUrl}
								alt={__("Background Image", "block-playstore")}
								className="w-full h-full object-cover object-center"
							/>
						) : (
							<div className="playstore-subscribe-placeholder">
								<p>{__("Select a background image", "block-playstore")}</p>
							</div>
						)}
					</div>
					<div className="background-mask absolute inset-0" />
					<div className="relative inset-0 z-2">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectImage}
								allowedTypes={["image"]}
								value={backgroundUrl}
								render={({ open }) => (
									<Button
										variant="secondary"
										onClick={open}
										style={{ marginBottom: 16 }}
									>
										{backgroundUrl
											? __("Replace Background", "block-playstore")
											: __("Select Background", "block-playstore")}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						<div className="subscribe-header w-full grid grid-cols-1 xl:grid-cols-2">
							<div>
								<RichText
									tagName="h1"
									value={title}
									className="text-3xl md:text-6xl font-bold text-[var(--wp--preset--color--primary)] mb-[16px]"
									onChange={(value) => setAttributes({ title: value })}
									allowedFormats={[
										"core/bold",
										"core/italic",
										"core/underline",
										"core/text-color",
										"custom/gradient",
									]}
									placeholder={__(
										"Subscribe to our Newsletter",
										"block-playstore",
									)}
								/>
								<RichText
									tagName="p"
									className="text-[20px] text-[var(--wp--preset--color--text-secondary)] font-normal leading-[32px] mb-[32px]"
									value={description}
									onChange={(value) => setAttributes({ description: value })}
									placeholder={__("Description", "block-playstore")}
								/>
								{/* Render Mailchimp Shortcode */}
								<div>
									{shortCode && (
										<div className="">
											{/* WordPress will render the shortcode frontend-side */}
											<InnerBlocks
												allowedBlocks={[]}
												template={[["core/shortcode", { text: shortCode }]]}
												templateLock="all"
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

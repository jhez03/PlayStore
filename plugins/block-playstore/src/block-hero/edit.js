import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";
import { Button, IconButton, ColorPalette } from "@wordpress/components";

import "./editor.scss";
export default function Edit({ attributes, setAttributes }) {
	const {
		backgroundType = "image",
		backgroundUrl,
		backgroundId,
		headline,
		subheadline,
		buttonText,
		buttonColor,
	} = attributes;

	const onSelectMedia = (media) => {
		setAttributes({
			backgroundUrl: media.url,
			backgroundId: media.id,
			backgroundType: media.type === "video" ? "video" : "image",
		});
	};

	const removeMedia = () => {
		setAttributes({
			backgroundUrl: undefined,
			backgroundId: undefined,
		});
	};
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Button Color", "your-textdomain")}>
					<ColorPalette
						value={buttonColor}
						onChange={(color) => setAttributes({ buttonColor: color })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
					<div className="absolute inset-0">
						{backgroundUrl ? (
							backgroundType === "video" ? (
								<video
									src={backgroundUrl}
									autoPlay
									loop
									muted
									className="object-cover w-full h-full"
								/>
							) : (
								<img
									src={backgroundUrl}
									alt="Hero Background"
									className="object-cover w-full h-full"
								/>
							)
						) : (
							<div className="flex items-center justify-center w-full h-full bg-gray-200">
								<span className="text-gray-500">No background selected</span>
							</div>
						)}
						<div className="absolute inset-0 bg-black/20" />
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								allowedTypes={["image", "video"]}
								value={backgroundId}
								render={({ open }) => (
									<div className="absolute top-4 left-4 z-10 flex space-x-2">
										<Button variant="primary" onClick={open} size="small">
											{backgroundUrl
												? __("Replace Background", "your-textdomain")
												: __("Select Background", "your-textdomain")}
										</Button>
										{backgroundUrl && (
											<IconButton
												icon="dismiss"
												label={__("Remove Background", "your-textdomain")}
												onClick={removeMedia}
											/>
										)}
									</div>
								)}
							/>
						</MediaUploadCheck>
					</div>
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center z-10">
						<div className="max-w-lg">
							<RichText
								tagName="h1"
								className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e0d0f] mb-4"
								value={headline}
								onChange={(value) => setAttributes({ headline: value })}
								placeholder={__("Add headline…", "your-textdomain")}
								allowedFormats={["core/bold", "core/italic"]}
							/>
							<RichText
								tagName="p"
								className="text-base sm:text-lg text-[#0a090a] mb-6 sm:mb-8"
								value={subheadline}
								onChange={(value) => setAttributes({ subheadline: value })}
								placeholder={__("Add subheadline…", "your-textdomain")}
							/>
							<Button
								style={
									buttonColor
										? { backgroundColor: buttonColor, borderColor: buttonColor }
										: {}
								}
								className="text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold"
							>
								<RichText
									tagName="span"
									className="inline-block"
									value={buttonText}
									onChange={(value) => setAttributes({ buttonText: value })}
									placeholder={__("Button label", "your-textdomain")}
									allowedFormats={["core/bold", "core/italic"]}
								/>
							</Button>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

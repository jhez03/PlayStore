import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	IconButton,
	ColorPalette,
	SelectControl,
} from "@wordpress/components";

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
		partners = [],
	} = attributes;

	const addPartner = () => {
		setAttributes({
			partners: [
				...partners,
				{ type: "text", value: "", subvalue: "", style: "", darkValue: "" },
			],
		});
	};

	const updatePartner = (idx, key, val) => {
		const newPartners = [...partners];
		newPartners[idx][key] = val;
		setAttributes({ partners: newPartners });
	};

	const removePartner = (idx) => {
		const newPartners = partners.filter((_, i) => i !== idx);
		setAttributes({ partners: newPartners });
	};

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
			<InspectorControls>
				<PanelBody title={__("Partner Carousel Settings", "your-textdomain")} />
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
						<div className="absolute inset-0 bg-white/20" />
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								allowedTypes={["image", "video"]}
								value={backgroundId}
								render={({ open }) => (
									<div className="absolute top-4 left-4 z-10 flex space-x-2 z-20">
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
				<div className="bg-[#ffffff] py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-center space-x-12 opacity-60">
							{partners.map((partner, idx) => (
								<div key={idx} style={{ position: "relative", minWidth: 140 }}>
									<SelectControl
										label={__("Type", "your-textdomain")}
										value={partner.type}
										options={[
											{ label: "Text", value: "text" },
											{ label: "Image", value: "image" },
										]}
										onChange={(val) => updatePartner(idx, "type", val)}
									/>
									{partner.type === "text" && (
										<>
											<RichText
												tagName="div"
												className={`text-2xl font-bold text-[#0a090a] ${partner.style}`}
												value={partner.value}
												onChange={(value) => updatePartner(idx, "value", value)}
												placeholder={__("Partner Name", "your-textdomain")}
											/>
											<RichText
												tagName="div"
												className="text-sm"
												value={partner.subvalue}
												onChange={(value) =>
													updatePartner(idx, "subvalue", value)
												}
												placeholder={__(
													"Subtext (optional)",
													"your-textdomain",
												)}
											/>
											<SelectControl
												label={__("Style", "your-textdomain")}
												value={partner.style}
												options={[
													{ label: "Normal", value: "" },
													{ label: "Italic", value: "italic" },
												]}
												onChange={(val) => updatePartner(idx, "style", val)}
											/>
										</>
									)}
									{partner.type === "image" && (
										<>
											<MediaUploadCheck>
												<MediaUpload
													onSelect={(img) =>
														updatePartner(idx, "value", img.url)
													}
													allowedTypes={["image"]}
													value={partner.value}
													render={({ open }) => (
														<div style={{ marginBottom: 8 }}>
															{partner.value ? (
																<img
																	src={partner.value}
																	alt=""
																	style={{
																		height: 40,
																		width: "auto",
																		marginBottom: 4,
																		background: "#f3f3f3",
																		borderRadius: 8,
																	}}
																/>
															) : null}
															<Button onClick={open} isSmall variant="primary">
																{partner.value
																	? __("Replace Light Logo", "your-textdomain")
																	: __("Select Light Logo", "your-textdomain")}
															</Button>
														</div>
													)}
												/>
											</MediaUploadCheck>
											<MediaUploadCheck>
												<MediaUpload
													onSelect={(img) =>
														updatePartner(idx, "darkValue", img.url)
													}
													allowedTypes={["image"]}
													value={partner.darkValue}
													render={({ open }) => (
														<div>
															{partner.darkValue ? (
																<img
																	src={partner.darkValue}
																	alt=""
																	style={{
																		height: 40,
																		width: "auto",
																		marginBottom: 4,
																		background: "#222",
																		borderRadius: 8,
																	}}
																/>
															) : null}
															<Button
																onClick={open}
																isSmall
																variant="secondary"
															>
																{partner.darkValue
																	? __("Replace Dark Logo", "your-textdomain")
																	: __("Select Dark Logo", "your-textdomain")}
															</Button>
															<small
																style={{ display: "block", color: "#666" }}
															>
																{__("(Shown in dark mode)", "your-textdomain")}
															</small>
														</div>
													)}
												/>
											</MediaUploadCheck>
										</>
									)}
									<Button
										icon="no"
										label={__("Remove Partner", "your-textdomain")}
										onClick={() => removePartner(idx)}
										isSmall
										variant="secondary"
										style={{ position: "absolute", top: 0, right: 0 }}
									/>
								</div>
							))}
							<Button
								onClick={addPartner}
								variant="primary"
								style={{ height: 50, alignSelf: "center" }}
							>
								{__("Add Partner", "your-textdomain")}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

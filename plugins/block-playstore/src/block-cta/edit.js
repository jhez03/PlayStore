import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
	RichText,
	InnerBlocks,
} from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	IconButton,
	TextControl,
} from "@wordpress/components";
import "./editor.scss";
import { Panel } from "@wordpress/components";
import { RangeControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const {
		header,
		description,
		backgroundUrl,
		ctaIcon,
		ctaImage,
		ctaButtons = [],
	} = attributes;
	const blockProps = useBlockProps({
		className: "playstore-section",
	});
	const onSelectImage = (img) => {
		setAttributes({ backgroundUrl: img.url });
	};
	const updateButton = (index, field, value) => {
		const updated = [...ctaButtons];
		updated[index][field] = value;
		setAttributes({ ctaButtons: updated });
	};

	const addButton = () => {
		setAttributes({
			ctaButtons: [...ctaButtons, { label: "", url: "" }],
		});
	};

	const removeButton = (index) => {
		const updated = [...ctaButtons];
		updated.splice(index, 1);
		setAttributes({ ctaButtons: updated });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Background Image", "block-playstore")}>
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
				</PanelBody>
				<PanelBody title={__("Cta Image", "block-playstore")}>
					{ctaImage && (
						<img
							src={ctaImage}
							style={{ width: 50 }}
							alt={__("Cta Image", "block-playstore")}
						/>
					)}

					<MediaUploadCheck>
						<MediaUpload
							onSelect={(image) => setAttributes({ ctaImage: image.url })}
							allowedTypes={["image"]}
							value={ctaImage}
							render={({ open }) => (
								<Button
									variant="secondary"
									onClick={open}
									style={{ marginBottom: 16 }}
								>
									{ctaImage
										? __("Replace Image", "block-playstore")
										: __("Select Image", "block-playstore")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody title={__("Cta Icon", "block-playstore")}>
					{ctaIcon && (
						<img
							src={ctaIcon}
							alt={__("Cta Icon", "block-playstore")}
							className=""
						/>
					)}

					<MediaUpload
						onSelect={(value) => setAttributes({ ctaIcon: value.url })}
						allowedTypes={["image"]}
						value={ctaIcon}
						render={({ open }) => (
							<Button
								onClick={open}
								variant="secondary"
								style={{ marginBottom: 16 }}
							>
								{ctaIcon
									? __("Replace Icon", "block-playstore")
									: __("Select Icon", "block-playstore")}
							</Button>
						)}
					/>
				</PanelBody>
				<PanelBody
					title={__("CTA Buttons", "block-playstore")}
					initialOpen={true}
				>
					{ctaButtons &&
						ctaButtons.map((btn, idx) => (
							<div
								key={idx}
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: 8,
								}}
							>
								<TextControl
									value={btn.label}
									onChange={(val) => updateButton(idx, "label", val)}
									placeholder={__("Button Label", "block-playstore")}
								/>
								<TextControl
									value={btn.url}
									onChange={(val) => updateButton(idx, "url", val)}
									placeholder={__("Button Url", "block-playstore")}
									style={{ marginLeft: 8 }}
								/>
								<IconButton
									icon="no-alt"
									label={__("Remove", "block-playstore")}
									onClick={() => removeButton(idx)}
									style={{ marginLeft: 8 }}
								/>
							</div>
						))}
					<Button isSecondary onClick={addButton}>
						{__("Add Button", "block-playstore")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="md:p-10 xl:px-[72px] xl:py-[120px]">
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

					<div className="relative inset-0">
						<div className="grid grid-cols-1 md:grid-cols-2 p-[25px] xl:p-[48px] rounded-[8px] backdrop-blur-[12px] border border-solid border-[var(--wp--preset--color--divider-main)]">
							<div>
								{ctaIcon && (
									<img
										src={ctaIcon}
										alt={__("Cta Icon", "block-playstore")}
										className="w-[30px] md:w-20 mb-10"
									/>
								)}
								<RichText
									tagName="h2"
									className="text-[30px] lg:text-[54px] leader-[75px] text-[var(--wp--preset--color--text-primary)] font-bold"
									value={header}
									onChange={(value) => setAttributes({ header: value })}
									placeholder={__("CTA Title", "block-playstore")}
								/>
								<div>
									<RichText
										tagName="p"
										className="text-[20px] max-w-prose text-[var(--wp--preset--color--text-secondary)] font-lato font-normal leader-[32px]"
										value={description}
										onChange={(value) => setAttributes({ description: value })}
										placeholder={__("CTA Description", "block-playstore")}
									/>
								</div>
								<div className="flex text-center gap-[10px] my-[32px]">
									{ctaButtons?.map((btn, idx) => (
										<a
											key={idx}
											href={btn.url}
											className="text-[var(--wp--preset--color--text-primary)] px-[10px] py-[5px] md:px-[32px] md:py-[20px] rounded-[5px] border border-solid border-[var(--wp--preset--color--divider-main)]"
										>
											{btn.label || __("CTA Button")}
										</a>
									))}
								</div>
							</div>
							<div>
								{ctaImage && (
									<img
										className="md:absolute max-xl:w-[40%]  max-lg:top-0 -top-10 right-0 bg-contain bg-no-repeat bg-center"
										src={ctaImage}
										alt={__("Cta Image", "block-playstore")}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

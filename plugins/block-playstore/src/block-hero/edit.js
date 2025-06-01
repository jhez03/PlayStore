import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button, IconButton } from "@wordpress/components";

import "./editor.scss";
export default function Edit({ attributes, setAttributes }) {
	const {
		backgroundType = "image",
		backgroundUrl,
		backgroundId,
		headline,
		subheadline,
		buttonText,
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
						<div className="max-w-lg">Centered text</div>
					</div>
				</section>
			</div>
		</>
	);
}

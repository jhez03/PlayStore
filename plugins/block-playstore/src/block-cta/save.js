import { useBlockProps, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function save({ attributes }) {
	const {
		header,
		description,
		backgroundUrl,
		ctaIcon,
		ctaImage,
		ctaButtons = [],
	} = attributes;

	const blockProps = useBlockProps.save({
		className: "playstore-section",
	});

	return (
		<section {...blockProps}>
			<div className="md:p-10 xl:px-[72px] xl:py-[120px] relative">
				<div className="absolute inset-0">
					{backgroundUrl ? (
						<img
							src={backgroundUrl}
							alt={__("Background Image", "block-playstore")}
							className="w-full h-full object-cover object-center"
						/>
					) : null}
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
							<RichText.Content
								tagName="h2"
								className="text-[30px] lg:text-[54px] leader-[75px] text-[var(--wp--preset--color--text-primary)] font-bold"
								value={header}
							/>
							<div>
								<RichText.Content
									tagName="p"
									className="text-[20px] max-w-prose text-[var(--wp--preset--color--text-secondary)] font-lato font-normal leader-[32px]"
									value={description}
								/>
							</div>
							<div className="flex text-center gap-[10px] my-[32px]">
								{ctaButtons?.map((btn, idx) => (
									<a
										key={idx}
										href={btn.url}
										className="text-[var(--wp--preset--color--text-primary)] px-[10px] py-[5px] md:px-[32px] md:py-[20px] rounded-[5px] border border-solid border-[var(--wp--preset--color--divider-main)]"
									>
										{btn.label || __("cta Button")}
									</a>
								))}
							</div>
						</div>
						<div>
							{ctaImage && (
								<img
									className="md:absolute max-xl:w-[40%] max-lg:top-0 -top-10 right-0 bg-contain bg-no-repeat bg-center"
									src={ctaImage}
									alt={__("Cta Image", "block-playstore")}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

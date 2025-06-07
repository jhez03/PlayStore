import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const {
		backgroundType = "image",
		backgroundUrl,
		headline,
		subheadline,
		buttonText,
		buttonColor,
		partners = [],
	} = attributes;
	const buttonStyle = buttonColor
		? { backgroundColor: buttonColor, borderColor: buttonColor }
		: {};

	return (
		<>
			<div {...useBlockProps.save()}>
				<section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
					<div className="absolute inset-0 z-0">
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
					</div>
					<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
						<div className="max-w-lg">
							<RichText.Content
								tagName="h1"
								className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e0d0f] mb-4"
								value={headline}
							/>
							<RichText.Content
								tagName="p"
								className="text-base sm:text-lg text-[#0a090a] mb-6 sm:mb-8"
								value={subheadline}
							/>
							<button
								type="button"
								style={buttonStyle}
								className="text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold"
							>
								<RichText.Content
									tagName="span"
									className="inline-block"
									value={buttonText}
								/>
							</button>
						</div>
					</div>
				</section>
				<div className="bg-[#ffffff] py-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-center space-x-12 opacity-60">
							{partners.map((partner, idx) => {
								if (partner.type === "text") {
									return (
										<div
											key={idx}
											className={`text-2xl font-bold text-[#0a090a] ${
												partner.style || ""
											}`}
										>
											<RichText.Content value={partner.value} tagName="span" />
											{partner.subvalue && (
												<>
													<br />
													<span className="text-sm">
														<RichText.Content
															value={partner.subvalue}
															tagName="span"
														/>
													</span>
												</>
											)}
										</div>
									);
								}
								if (partner.type === "image") {
									return (
										<div key={idx} className="flex items-center">
											<img
												src={partner.value}
												alt=""
												style={{
													height: 40,
													width: "auto",
													display: "inline-block",
													background: "#f3f3f3",
													borderRadius: 8,
												}}
											/>
										</div>
									);
								}
								return null;
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

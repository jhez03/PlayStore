import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";
import { Button, PanelBody, RangeControl } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "@wordpress/element";
import "./editor.css";

export default function Edit({ attributes, setAttributes }) {
	const { backgroundUrl, header, description, newsCount = 3 } = attributes;

	const onSelectImage = (img) => {
		setAttributes({ backgroundUrl: img.url });
	};

	const blockProps = useBlockProps({
		className: "playstore-section",
	});
	//fetch using getEntityRecords
	// const newsPosts = useSelect(
	// 	(select) =>
	// 		select("core").getEntityRecords("postType", "news", {
	// 			per_page: 3,
	// 			_embed: true,
	// 		}),
	// 	[],
	// );
	const [newsPosts, setNewsPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		apiFetch({
			path: "/playstore/v1/news?per_page=" + newsCount + "&_embed=true",
		})
			.then((posts) => {
				setNewsPosts(posts);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching news posts:", error);
				setLoading(false);
			});
	}, []);
	if (loading) {
		return <p>{__("Loading news posts...", "block-playstore")}</p>;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("News Section Settings", "block-playstore")}>
					<RangeControl
						label={__("Number of News Items", "block-playstore")}
						min={1}
						max={12}
						value={newsCount}
						onChange={(newsCount) => setAttributes({ newsCount })}
					/>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="relative">
					<div className="absolute inset-0 z-0">
						{/* BG image */}
						{backgroundUrl ? (
							<img
								src={backgroundUrl}
								alt="News Background"
								className="w-full h-full object-cover"
							/>
						) : (
							<div>
								<span>{__("No image selected", "block-playstore")}</span>
							</div>
						)}
					</div>
					<div className="background-mask absolute inset-0" />

					<div className="playstore-news-wrapper relative flex flex-col item-center gap-[48px] px-5 xl:px-20 ">
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
						<div className="news-header text-center w-full">
							<RichText
								tagName="h2"
								className="accent-gradient text-[54px] font-bold leading-[75.6px] whitespace-nowrap"
								value={header}
								onChange={(value) => setAttributes({ header: value })}
								placeholder={__("News Section Title…", "block-playstore")}
							/>
							<RichText
								tagName="p"
								className="text-xl text-[var(--wp--preset--color--text-secondary)] font-normal leading-[32px] mt-[24px]"
								value={description}
								onChange={(value) => setAttributes({ description: value })}
								placeholder={__("Section description…", "block-playstore")}
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:gap-[48px] gap-5 mx-auto text-center">
							{newsPosts?.map((news) => (
								<div
									key={news.id}
									className="bg-[var(--wp--preset--color--background-default)]  rounded-lg overflow-hidden shadow-lg"
								>
									<div className="h-2 main-gradient"></div>
									<div className="px-5 py-6 xl:px-[48px] xl:pt-[46px] xl:pb-[24px]">
										<h2 className="text-xl sm:text-2xl md:text-3xl font-bold  accent-gradient ">
											{news.short_title || news.title?.rendered}
										</h2>
									</div>
									<div>
										<img
											className="w-full"
											src={
												news.thumbnail ||
												news._embedded?.["wp:featuredmedia"]?.[0]?.source_url
											}
											alt={news.title?.rendered || "News Thumbnail"}
										/>
									</div>
									<p className="text-[var(--wp--preset--color--text-secondary)] px-5 py-5 xl:px-[48px] xl:py-[24px] text-[20px] font-[400] ">
										{news.excerpt ||
											__("No excerpt available", "block-playstore")}
									</p>
									<div className="pb-[48px] flex justify-center">
										<a
											href={news.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<button className="main-gradient shadow-[0px_16px_24px_0px_rgba(61,175,226,0.48)] rounded-[5px] flex items-center gap-[10px] px-[32px] py-[20px] text-[14px] text-[#FAFAFA]">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M16 2H8C4.5 2 3 4 3 7V17C3 20 4.5 22 8 22H16C19.5 22 21 20 21 17V7C21 4 19.5 2 16 2ZM8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25ZM16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75ZM18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z"
														fill="white"
													/>
												</svg>
												OPEN THE POST
											</button>
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

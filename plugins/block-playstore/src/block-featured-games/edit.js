import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";
import "./editor.css";
import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { PanelBody, RangeControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { header, description, count } = attributes;
	const blockProps = useBlockProps({
		className: "playstore-section",
	});

	const [featuredGames, setFeaturedGames] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		apiFetch({
			path: "/playstore/v1/featured?posts_per_page=" + count,
		})
			.then((data) => {
				setFeaturedGames(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching featured games:", err);
				setLoading(false);
			});
	}, []);
	if (loading) {
		return <p>{__("Loading featured games...", "playstore-woocommerce")}</p>;
	}

	const test = featuredGames?.map((game) => {
		console.log(game);
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Featured Games Settings", "playstore-woocommerce")}
				>
					<RangeControl
						label={__("Set the Featured Games count", "playstore-woocommerce")}
						value={count}
						onChange={(count) => setAttributes({ count })}
					/>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="relative">
					<div className="playstore-game-wrapper relative flex flex-col item-center gap-[48px] px-5 xl:px-20 ">
						<div className="game-header text-center w-full">
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
						<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-[48px] gap-5 mx-auto ">
							{featuredGames?.map((game) => (
								<div key={game.id} className="rounded-[8px] overflow-hidden">
									<div>
										<img className="w-full" src={game.image || ""} />
									</div>
									<div className="text-[var(--wp--preset--color--text-secondary)] gap-2 flex font-normal text-left xl:text-14px">
										{game.sale_price && (
											<div
												className="text-[var(--wp--preset--color--purple-main)]"
												dangerouslySetInnerHTML={{ __html: game.sale_price }}
											/>
										)}
										{game.regular_price && (
											<div
												className="text-[var(--wp--preset--color--text-secondary)] line-through"
												dangerouslySetInnerHTML={{ __html: game.regular_price }}
											/>
										)}
									</div>
									<h2 className="whitespace-nowrap my-[8px] text-[var(--wp--preset--color--text-primary)] xl:text-[18px] overflow-hidden text-ellipsis ">
										{game.title}
									</h2>
									{game.platforms && game.platforms.length > 0 && (
										<div className="flex gap-[12px]">
											{game.platforms?.map((platform) => (
												<div key={game.id}>
													{platform.image && (
														<img src={platform.image} alt={game.title} />
													)}
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

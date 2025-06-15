import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { useSelect } from "@wordpress/data";

export default function Edit() {
	//fetch using getEntityRecords
	const gamesPosts = useSelect(
		(select) =>
			select("core").getEntityRecords("postType", "product", {
				_embed: true,
			}),
		[],
	);
	const blockProps = useBlockProps({
		className: "background-mask",
	});

	return (
		<>
			<section {...blockProps}>
				{gamesPosts ? (
					<div className="games-line-swiper">
						<div className="swiper-wrapper flex gap-[8px] py-[8px] items-start">
							{gamesPosts?.map((game) => (
								<div
									key={game.id}
									className="swiper-slide shrink-0 group cursor-pointer transition-transform hover:scale-105"
								>
									<div className="relative overflow-hidden rounded-lg shadow-lg">
										<a
											href={game.link}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												src={
													game.featured_media?.source_url ||
													game._embedded?.["wp:featuredmedia"]?.[0]?.source_url
												}
												alt={game.title.rendered}
												width="300"
												height="400"
												className="game-cover object-cover transition-all group-hover:brightness-110"
											/>
										</a>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					<p>{__("No games found.", "block-playstore")}</p>
				)}
			</section>
		</>
	);
}

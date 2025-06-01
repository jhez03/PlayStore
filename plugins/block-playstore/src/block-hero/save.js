/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save() {
	return (
		<>
			<div {...useBlockProps.save()}>
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-black/20" />
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
					<div className="max-w-lg">
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e0d0f] mb-4">
							Holiday Sale! <span className="text-[#6f76c0]">30% off</span>
							<br />
							for All Action Games
						</h1>
						<p className="text-base sm:text-lg text-[#0a090a] mb-6 sm:mb-8">
							Save Play Celebrate. Ends 1/17
						</p>
					</div>
				</div>

				<div className="absolute bottom-8 left-0 right-0 hidden lg:block">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-center space-x-12 opacity-80"></div>
					</div>
				</div>
			</div>
		</>
	);
}

import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { games } = attributes;

	return (
		<>
			<div {...useBlockProps()}></div>
		</>
	);
}

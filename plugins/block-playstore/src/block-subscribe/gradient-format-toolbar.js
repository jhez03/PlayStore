import { registerFormatType, toggleFormat } from "@wordpress/rich-text";
import { RichTextToolbarButton } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { Popover, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const name = "custom/gradient";

const GradientUI = ({ isActive, value, onChange }) => {
	const [showPopover, setShowPopover] = useState(false);
	const [gradient, setGradient] = useState(
		"linear-gradient(90deg,#3B9AE1,#ffffff)",
	);

	return (
		<>
			<RichTextToolbarButton
				icon="admin-customizer"
				title={__("Gradient Text", "your-textdomain")}
				onClick={() => setShowPopover(true)}
				isActive={isActive}
			/>
			{showPopover && (
				<Popover position="bottom center" onClose={() => setShowPopover(false)}>
					<div style={{ padding: 16, minWidth: 280 }}>
						<label>
							<span>{__("CSS Gradient", "your-textdomain")}</span>
							<input
								type="text"
								value={gradient}
								onChange={(e) => setGradient(e.target.value)}
								style={{ width: "100%", margin: "6px 0" }}
								placeholder="linear-gradient(90deg,#3B9AE1,#ffffff)"
							/>
						</label>
						<div
							style={{
								background: gradient,
								WebkitBackgroundClip: "text",
								color: "transparent",
								backgroundClip: "text",
								fontWeight: "bold",
								padding: 8,
								fontSize: "1.2em",
								margin: "10px 0",
							}}
						>
							{__("Preview Gradient", "your-textdomain")}
						</div>
						<Button
							variant="primary"
							onClick={() => {
								onChange(
									toggleFormat(value, {
										type: name,
										attributes: {
											style: `background: ${gradient}; -webkit-background-clip: text; color: transparent; background-clip: text;`,
										},
									}),
								);
								setShowPopover(false);
							}}
						>
							{__("Apply Gradient", "your-textdomain")}
						</Button>
					</div>
				</Popover>
			)}
		</>
	);
};

registerFormatType(name, {
	title: __("Gradient Text", "your-textdomain"),
	tagName: "span",
	className: null,
	attributes: {
		style: "style",
	},
	edit: GradientUI,
});

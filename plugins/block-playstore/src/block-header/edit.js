import {
	useBlockProps,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	Button,
	SelectControl,
} from "@wordpress/components";
import "./editor.scss";
import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

function buildMenuTree(menuItems) {
	const itemsById = {};
	const tree = [];

	menuItems.forEach((item) => {
		itemsById[item.id] = { ...item, children: [] };
	});
	menuItems.forEach((item) => {
		if (item.parent && itemsById[item.parent]) {
			itemsById[item.parent].children.push(itemsById[item.id]);
		} else {
			tree.push(itemsById[item.id]);
		}
	});

	return tree;
}
function renderMenuTree(items, level = 0) {
	const ulClass =
		level === 0
			? "playstore-nav-links hidden lg:flex lg:gap-[32px] gap-[10px]"
			: "sub-menu";
	return (
		<ul className={ulClass}>
			{items.map((item) => {
				const hasChildren = item.children && item.children.length > 0;
				const liClass = hasChildren ? "menu-item-has-children" : "";
				return (
					<li key={item.id} className={liClass}>
						<a href={item.url}>{item.title.rendered}</a>
						{hasChildren && (
							<>
								<button className="dropdown-icon playstore-submenu-toggle">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="25"
										viewBox="0 0 24 25"
										fill="var(--wp--preset--color--svg-main, rgb(14,13,15))"
									>
										<path
											d="M8.46997 11.2402L12 14.7602L15.53 11.2402"
											stroke="var(--wp--preset--color--svg-main, rgb(14,13,15))"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
								{renderMenuTree(item.children, level + 1)}
							</>
						)}
					</li>
				);
			})}
		</ul>
	);
}

export default function Edit({ attributes, setAttributes }) {
	const memberLink = attributes.memberLink || "";
	const cartLink = attributes.cartLink || "";
	const logo = attributes.logo || "";

	// Fetch available menus from REST API
	const menus = useSelect((select) => {
		return select("core").getEntityRecords("taxonomy", "nav_menu");
	}, []);

	// Fetch menu items for the selected menu
	const menuItems = useSelect(
		(select) => {
			if (!attributes.selectedMenu) return [];
			return select("core").getEntityRecords("postType", "nav_menu_item", {
				menus: [attributes.selectedMenu],
				per_page: -1,
			});
		},
		[attributes.selectedMenu],
	);
	// Update menuItems attribute when fetched
	useEffect(() => {
		if (menuItems) {
			setAttributes({ menuItems });
		}
	}, [menuItems]);

	// Build menu options for SelectControl
	const menuOptions = menus
		? menus.map((menu) => ({ label: menu.name, value: menu.id }))
		: [];

	// Build tree only if menuItems is loaded and not null
	const tree =
		menuItems && menuItems.length > 0 ? buildMenuTree(menuItems) : [];

	return (
		<>
			<div {...useBlockProps()}>
				<InspectorControls>
					<PanelBody title="Menu Settings" initialOpen={true}>
						<SelectControl
							label="Select Menu"
							value={attributes.selectedMenu}
							options={[{ label: "Select a menu", value: "" }, ...menuOptions]}
							onChange={(value) => setAttributes({ selectedMenu: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<InspectorControls>
					<PanelBody title="Block Settings">
						<TextControl
							label="Member Link"
							value={memberLink}
							onChange={(value) => setAttributes({ memberLink: value })}
						/>
						<TextControl
							label="Cart Link"
							value={cartLink}
							onChange={(value) => setAttributes({ cartLink: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(media) => setAttributes({ logo: media })}
						allowedTypes={["image"]}
						value={logo?.id}
						render={({ open }) => (
							<Button onClick={open} variant="secondary">
								{logo ? "Change Logo" : "Upload Logo"}
							</Button>
						)}
					/>
				</MediaUploadCheck>
				<div className="playstore-header relative w-full bg-[var(--wp--preset--color--background-default)]  py-2 px-8 z-50 text-(--wp--preset--color--text-primary)">
					<div className="inner-header">
						<div className="flex items-center justify-between h-16">
							{/* Desktop Navigation */}
							<nav className="flex items-center  gap-[10px] xl:gap-[48px] ">
								{logo && (
									<img src={logo.url} alt="Logo" className="header-logo" />
								)}
								{tree.length > 0 ? (
									renderMenuTree(tree)
								) : (
									<p>Select a menu to display navigation items.</p>
								)}
							</nav>
							<div className="flex items-center space-x-4 lg:space-x-4 ">
								<div className="header-search cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M22.29 21.66L17.61 16.95C20.97 13.2 20.7 7.44002 16.95 4.05002C13.2 0.660021 7.44002 0.960021 4.05002 4.71002C0.660021 8.46002 0.960021 14.22 4.71002 17.61C8.19002 20.76 13.5 20.76 16.98 17.61L21.69 22.32L22.29 21.66ZM10.83 19.05C6.30002 19.05 2.61002 15.36 2.61002 10.83C2.61002 6.27002 6.30002 2.61002 10.83 2.61002C15.36 2.61002 19.05 6.30002 19.05 10.83C19.05 15.36 15.36 19.05 10.83 19.05Z"
											fill="var(--wp--preset--color--svg-main, rgb(14,13,15))"
											fillOpacity="0.64"
										/>
										<path
											d="M10.8301 3.83984V4.73984C14.1901 4.73984 16.9201 7.46984 16.9201 10.8298H17.8201C17.8201 6.95984 14.7001 3.83984 10.8301 3.83984Z"
											fill="var(--wp--preset--color--svg-main, rgb(14,13,15))"
											fillOpacity="0.64"
										/>
									</svg>
								</div>
								<div className="header-mode-switcher cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="36"
										height="36"
										viewBox="0 0 20 25"
										fill="none"
									>
										<path
											d="M13 18.5V6.5"
											stroke="var(--wp--preset--color--svg-main)"
											strokeOpacity="0.64"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M1 12.5H4"
											stroke="var(--wp--preset--color--svg-main)"
											strokeOpacity="0.64"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M4.50977 4.01025L6.63977 6.14025"
											stroke="var(--wp--preset--color--svg-main)"
											strokeOpacity="0.64"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M13 0.5V3.5"
											stroke="var(--wp--preset--color--svg-main)"
											strokeOpacity="0.64"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M13 24.5V21.5"
											stroke="var(--wp--preset--color--svg-main)"
											strokeOpacity="0.64"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M4.50977 20.9899L6.63977 18.8599"
											stroke="var(--wp--preset--color--svg-main)"
											strokeOpacity="0.64"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M13 18.5C16.3137 18.5 19 15.8137 19 12.5C19 9.18629 16.3137 6.5 13 6.5C9.68629 6.5 7 9.18629 7 12.5C7 15.8137 9.68629 18.5 13 18.5Z"
											stroke="var(--wp--preset--color--svg-main)"
											strokeOpacity="0.64"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								{cartLink && (
									<div className="header-cart-link">
										<a href={cartLink}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="26"
												height="20"
												viewBox="0 0 26 20"
												fill="none"
											>
												<path
													d="M2.71436 6.57178L4.42864 18.5718H21.5715L23.2858 6.57178"
													stroke="var(--wp--preset--color--svg-main, rgb(14, 13, 15))"
													strokeOpacity="0.64"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M7.85693 8.28585L9.57122 1.42871"
													stroke="var(--wp--preset--color--svg-main, rgb(14, 13, 15))"
													strokeOpacity="0.64"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M18.143 8.28585L16.4287 1.42871"
													stroke="var(--wp--preset--color--svg-main, rgb(14, 13, 15))"
													strokeOpacity="0.64"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M1 6.57178H25"
													stroke="var(--wp--preset--color--svg-main, rgb(14, 13, 15))"
													strokeOpacity="0.64"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</a>
									</div>
								)}
								{memberLink && (
									<>
										<div className="hidden lg:block ">
											<a href={memberLink}>Member Area</a>
										</div>
										<div className="lg:hidden ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
											>
												<path
													d="M12.1605 11.62C12.1305 11.62 12.1105 11.62 12.0805 11.62C12.0305 11.61 11.9605 11.61 11.9005 11.62C9.00055 11.53 6.81055 9.25 6.81055 6.44C6.81055 3.58 9.14055 1.25 12.0005 1.25C14.8605 1.25 17.1905 3.58 17.1905 6.44C17.1805 9.25 14.9805 11.53 12.1905 11.62C12.1805 11.62 12.1705 11.62 12.1605 11.62ZM12.0005 2.75C9.97055 2.75 8.31055 4.41 8.31055 6.44C8.31055 8.44 9.87055 10.05 11.8605 10.12C11.9105 10.11 12.0505 10.11 12.1805 10.12C14.1405 10.03 15.6805 8.42 15.6905 6.44C15.6905 4.41 14.0305 2.75 12.0005 2.75Z"
													fill="var(--wp--preset--color--svg-main, rgb(255,255,255))"
													fillOpacity="0.64"
												/>
												<path
													d="M12.1696 22.55C10.2096 22.55 8.23961 22.05 6.74961 21.05C5.35961 20.13 4.59961 18.87 4.59961 17.5C4.59961 16.13 5.35961 14.86 6.74961 13.93C9.74961 11.94 14.6096 11.94 17.5896 13.93C18.9696 14.85 19.7396 16.11 19.7396 17.48C19.7396 18.85 18.9796 20.12 17.5896 21.05C16.0896 22.05 14.1296 22.55 12.1696 22.55ZM7.57961 15.19C6.61961 15.83 6.09961 16.65 6.09961 17.51C6.09961 18.36 6.62961 19.18 7.57961 19.81C10.0696 21.48 14.2696 21.48 16.7596 19.81C17.7196 19.17 18.2396 18.35 18.2396 17.49C18.2396 16.64 17.7096 15.82 16.7596 15.19C14.2696 13.53 10.0696 13.53 7.57961 15.19Z"
													fill="var(--wp--preset--color--svg-main, rgb(255,255,255))"
													fillOpacity="0.64"
												/>
											</svg>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

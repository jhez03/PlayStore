module.exports = {
	content: [
		"./src/block-header/**/*.{js,jsx,ts,tsx,php,scss,css}",
		"./src/block-hero/**/*.{js,jsx,ts,tsx,php,scss,css}",
		"./src/block-games-line/**/*.{js,jsx,ts,tsx,php,scss,css}",
		// Add more block folders as needed
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"blue-main": "var(--wp-preset--color--blue-main)",
				"purple-main": "var(--wp-preset--color--purple-main)",
			},
		},
	},
	plugins: [],
};

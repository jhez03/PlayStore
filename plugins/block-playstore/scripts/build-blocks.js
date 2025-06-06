const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const srcDir = path.join(__dirname, "../src");
const buildDir = path.join(__dirname, "../build");

// Get all block directories
const blockDirs = fs
	.readdirSync(srcDir)
	.filter((dir) => dir.startsWith("block-"))
	.filter((dir) => fs.statSync(path.join(srcDir, dir)).isDirectory());

const isWatch = process.argv.includes("--watch");
const command = isWatch ? "watch" : "build";

console.log(
	`${isWatch ? "Watching" : "Building"} ${blockDirs.length} blocks...`,
);

if (isWatch) {
	// For watch mode, run all processes in parallel
	const { spawn } = require("child_process");

	blockDirs.forEach((blockDir) => {
		const inputPath = `./src/${blockDir}/style.css`;
		const outputPath = `./build/${blockDir}/style-index.css`;

		console.log(`Watching ${blockDir}...`);

		const child = spawn(
			"npx",
			[
				"@tailwindcss/cli",
				"-i",
				inputPath,
				"-o",
				outputPath,
				"--watch",
				"--minify",
			],
			{
				stdio: "inherit",
			},
		);

		child.on("error", (error) => {
			console.error(`Error watching ${blockDir}:`, error);
		});
	});
} else {
	// For build mode, run sequentially
	blockDirs.forEach((blockDir) => {
		const inputPath = `./src/${blockDir}/style.css`;
		const outputPath = `./build/${blockDir}/style-index.css`;

		console.log(`Building ${blockDir}...`);

		try {
			execSync(
				`npx @tailwindcss/cli -i "${inputPath}" -o "${outputPath}" --minify`,
				{
					stdio: "inherit",
				},
			);
		} catch (error) {
			console.error(`Error building ${blockDir}:`, error.message);
			process.exit(1);
		}
	});
}

// Script to update image paths in your codebase
const fs = require("node:fs");
const path = require("node:path");
const { promisify } = require("node:util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

// Function to walk through directories recursively
async function walkDir(dir, fileList = []) {
	const files = await readdirAsync(dir);
	let newFileList = [...fileList];

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = await statAsync(filePath);

		if (
			stat.isDirectory() &&
			!filePath.includes("node_modules") &&
			!filePath.includes(".next") &&
			!filePath.includes(".git")
		) {
			newFileList = await walkDir(filePath, newFileList);
		} else if (
			stat.isFile() &&
			(filePath.endsWith(".tsx") || filePath.endsWith(".ts")) &&
			!filePath.includes("next.config.ts") &&
			!filePath.includes("imagePath.ts")
		) {
			newFileList.push(filePath);
		}
	}

	return newFileList;
}

// Update image references in files
async function updateImagesInFile(filePath) {
	try {
		const content = await readFileAsync(filePath, "utf8");
		let updatedContent = content;

		// Check if the file already imports imagePath
		const hasImagePathImport = /import.*from\s+['"]@\/lib\/imagePath['"]/g.test(
			content,
		);

		// Skip files that don't have image references
		if (
			!content.includes('src="/') &&
			!content.includes("src='/") &&
			!content.includes("url(/") &&
			!content.includes("url('/") &&
			!content.includes('url("/') &&
			!content.includes('maskImage: "url(/')
		) {
			return false;
		}

		// Add import if needed
		if (!hasImagePathImport && filePath.endsWith(".tsx")) {
			// Find the last import statement
			const importRegex = /^import.*from.*/gm;
			const lastImport = Array.from(content.matchAll(importRegex)).pop();

			if (lastImport) {
				const importStatement =
					'import { getImagePath, getBgImagePath } from "@/lib/imagePath";';
				updatedContent = `${content.slice(0, lastImport.index + lastImport[0].length)}
${importStatement}${content.slice(lastImport.index + lastImport[0].length)}`;
			}
		}

		// Update Image component src attributes
		updatedContent = updatedContent.replace(
			/src=["']\/([^"']+)["']/g,
			'src={getImagePath("/$1")}',
		);

		// Update background image URLs in inline styles
		updatedContent = updatedContent.replace(
			/url\(["']\/([^"']+)["']\)/g,
			"url(${getImagePath('/$1')})",
		);
		updatedContent = updatedContent.replace(
			/url\(\/([^)]+)\)/g,
			"url(${getImagePath('/$1')})",
		);

		// Update maskImage URLs
		updatedContent = updatedContent.replace(
			/maskImage:\s*["']url\(\/([^)]+)\)["']/g,
			"maskImage: `url(${getImagePath('/$1')})`",
		);
		updatedContent = updatedContent.replace(
			/WebkitMaskImage:\s*["']url\(\/([^)]+)\)["']/g,
			"WebkitMaskImage: `url(${getImagePath('/$1')})`",
		);

		// For cases that use the string template for backgroundImage in style
		updatedContent = updatedContent.replace(
			/backgroundImage:\s*`url\(\/([^)]+)\)`/g,
			"backgroundImage: `url(${getImagePath('/$1')})`",
		);

		// Update tailwind classes with background images - more complex, may need manual review
		updatedContent = updatedContent.replace(
			/bg-\[url\(['"]?\/([^'"]+)['"]?\)\]/g,
			(match, p1) => {
				return `style={{ backgroundImage: \`url(\${getImagePath('/${p1}')}\` }}`;
			},
		);

		if (content !== updatedContent) {
			await writeFileAsync(filePath, updatedContent, "utf8");
			return true;
		}

		return false;
	} catch (error) {
		console.error(`Error processing file ${filePath}:`, error);
		return false;
	}
}

async function main() {
	try {
		const rootDir = process.cwd();
		const files = await walkDir(rootDir);
		let updatedFilesCount = 0;

		for (const file of files) {
			const updated = await updateImagesInFile(file);
			if (updated) {
				console.log(`Updated: ${path.relative(rootDir, file)}`);
				updatedFilesCount++;
			}
		}

		console.log(`\nUpdated ${updatedFilesCount} files.`);
		console.log(
			"\nProcess complete. Please review the changes and make any necessary adjustments.",
		);
	} catch (error) {
		console.error("Error:", error);
	}
}

main();

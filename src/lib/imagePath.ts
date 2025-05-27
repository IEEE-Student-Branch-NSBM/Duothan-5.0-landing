import getConfig from "next/config";

// Function to determine if we're running on the client
const isClient = typeof window !== "undefined";

// Get the base path from environment variable or default to ""
function getBasePath(): string {
	if (typeof window !== "undefined") {
		// On client, use env variable if set
		return process.env.NEXT_PUBLIC_BASE_PATH || "";
	}
	// On server, use env variable if set
	return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

// Cache the base path value
let cachedBasePath: string | undefined;

export function getImagePath(path: string): string {
	// Use cached value if available
	if (cachedBasePath === undefined) {
		cachedBasePath = getBasePath();
	}

	// Ensure path starts with a slash and doesn't have double slashes
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	// Combine basePath with the image path
	return `${cachedBasePath}${normalizedPath}`;
}

// Helper for CSS background image URLs - useful for styled components and inline styles
export function getBgImagePath(path: string): string {
	const fullPath = getImagePath(path);
	return `url('${fullPath}')`;
}

import getConfig from "next/config";

// Function to determine if we're running on the client
const isClient = typeof window !== "undefined";

// Get the base path in a way that works in both client and server contexts
function getBasePath(): string {
	// For client-side rendering
	if (isClient) {
		const config = getConfig() || { publicRuntimeConfig: { basePath: "" } };
		return config.publicRuntimeConfig?.basePath || "";
	}
	return "/Duothan-5.0-landing";
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

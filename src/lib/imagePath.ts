import getConfig from "next/config";

const isClient = typeof window !== "undefined";
const isDev = process.env.NODE_ENV === "development";

function getBasePath(): string {
	// In development, no base path needed
	if (isDev) {
		return "";
	}

	// Try to get base path from Next.js config first
	if (isClient) {
		try {
			const config = getConfig();
			if (config?.publicRuntimeConfig?.basePath) {
				return config.publicRuntimeConfig.basePath;
			}
		} catch {
			console.warn(
				"Could not get Next.js config, falling back to default base path",
			);
		}
	}

	// Fallback to environment variable or default
	return process.env.PAGES_BASE_PATH || "/Duothan-5.0-landing";
}

let cachedBasePath: string | undefined;

export function getImagePath(path: string): string {
	if (cachedBasePath === undefined) {
		cachedBasePath = getBasePath();
	}

	const normalizedPath = path.startsWith("/") ? path : `/${path}`;

	return `${cachedBasePath}${normalizedPath}`;
}

// Helper for CSS background image URLs - useful for styled components and inline styles
export function getBgImagePath(path: string): string {
	const fullPath = getImagePath(path);
	return `url('${fullPath}')`;
}

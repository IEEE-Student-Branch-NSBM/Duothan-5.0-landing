import getConfig from "next/config";

const isClient = typeof window !== "undefined";
function getBasePath(): string {
	// For client-side rendering
	if (isClient) {
		const config = getConfig() || { publicRuntimeConfig: { basePath: "" } };
		return config.publicRuntimeConfig?.basePath || "";
	}
	return "/Duothan-5.0-landing";
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

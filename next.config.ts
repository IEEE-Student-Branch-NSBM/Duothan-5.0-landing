import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath =
	process.env.PAGES_BASE_PATH || (isProduction ? "/Duothan-5.0-landing" : "");

const nextConfig: NextConfig = {
	output: "export",
	basePath: basePath,
	assetPrefix: basePath,
	images: {
		unoptimized: true,
		remotePatterns: [],
	},
	trailingSlash: true,
	publicRuntimeConfig: {
		basePath: basePath,
	},
};

export default nextConfig;

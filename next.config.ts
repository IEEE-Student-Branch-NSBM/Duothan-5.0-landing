import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	basePath: process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing" : "",
	assetPrefix:
		process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing" : "",
	images: {
		unoptimized: true,
		remotePatterns: [],
	},
	trailingSlash: true,
	publicRuntimeConfig: {
		basePath:
			process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing" : "",
	},
};

export default nextConfig;

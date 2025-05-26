import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	assetPrefix:
		process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing/" : "",
	basePath: process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing" : "",
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	basePath: process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing" : "",
	assetPrefix:
		process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing/" : "",
	images: {
		unoptimized: true,
	},
};

export default nextConfig;

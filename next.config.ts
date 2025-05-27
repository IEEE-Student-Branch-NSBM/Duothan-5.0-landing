import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	basePath: process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing" : "",
	assetPrefix:
		process.env.NODE_ENV === "production" ? "/Duothan-5.0-landing/" : "",
	images: {
		unoptimized: true,
		remotePatterns: [],
		path:
			process.env.NODE_ENV === "production"
				? "https://ieee-student-branch-nsbm.github.io/Duothan-5.0-landing"
				: "",
	},
	trailingSlash: true,
};

export default nextConfig;

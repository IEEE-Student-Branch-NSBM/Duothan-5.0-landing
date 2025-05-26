"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SimpleLoading() {
	const [loading, setLoading] = useState(true);
	const [loadedImages, setLoadedImages] = useState(new Set());
	const [allImagesLoaded, setAllImagesLoaded] = useState(false);

	// List of critical images that need to be loaded before showing the main content
	const criticalImages = [
		"/backdrop_hero.svg",
		"/onlylogo.svg",
		"/hero_samurai_1.svg",
		"/hero_samurai_2.svg",
		"/hero_samurai_3.svg",
		"/duo 5.svg", // Loading screen logo
	];

	useEffect(() => {
		let loadingComplete = false;
		const imagePromises: Promise<void>[] = [];

		// Preload all critical images
		for (const src of criticalImages) {
			const promise = new Promise<void>((resolve, reject) => {
				const img = new window.Image();
				img.src = src;

				img.onload = () => {
					if (!loadingComplete) {
						setLoadedImages((prev) => {
							const newSet = new Set(prev);
							newSet.add(src);
							return newSet;
						});
					}
					resolve();
				};

				img.onerror = () => {
					console.warn(`Failed to load image: ${src}`);
					// Still resolve to not block loading for missing images
					resolve();
				};
			});

			imagePromises.push(promise);
		}

		// Wait for all images to load
		Promise.all(imagePromises).then(() => {
			if (!loadingComplete) {
				setAllImagesLoaded(true);

				// Add a minimum loading time of 1.5 seconds for UX
				const minLoadingTime = 1500;
				const startTime = Date.now();
				const elapsedTime = Date.now() - startTime;
				const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

				setTimeout(() => {
					if (!loadingComplete) {
						setLoading(false);
					}
				}, remainingTime);
			}
		});

		// Fallback timeout - maximum 8 seconds
		const fallbackTimer = setTimeout(() => {
			if (!loadingComplete) {
				console.warn("Loading timeout reached, showing content anyway");
				setLoading(false);
			}
		}, 8000);

		return () => {
			loadingComplete = true;
			clearTimeout(fallbackTimer);
		};
	}, []);

	if (!loading) return null;

	// Calculate loading progress
	const progress = (loadedImages.size / criticalImages.length) * 100;

	return (
		<div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000] px-4">
			{/* Responsive stacked logo container with both logos */}
			<div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center mx-auto">
				{/* Background logo */}
				<img
					src="/onlylogo.svg"
					alt="Background Logo"
					className="absolute w-[480px] h-[480px] sm:w-[640px] sm:h-[640px] md:w-[800px] md:h-[800px]"
					style={{
						filter: "",
						animationName: "pulse",
						animationDuration: "2s",
						animationIterationCount: "infinite",
					}}
				/>
				{/* Foreground logo */}
				<img
					src="/duo 5.svg"
					alt="Duothan Logo"
					className="absolute z-10 w-[270px] h-[270px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px]"
				/>
			</div>

			{/* Loading Progress */}
			<div className="mt-8 w-full max-w-md">
				<div className="text-center mb-4">
					<p className="text-cyan-400 text-sm">
						Get Ready, Player... {Math.round(progress)}%
					</p>
					<p className="text-cyan-400 text-xs opacity-60 mt-1">
						{loadedImages.size} of {criticalImages.length} images loaded
					</p>
				</div>

				{/* Progress Bar */}
				<div className="w-full bg-gray-800 rounded-full h-2 mb-4">
					<div
						className="bg-cyan-400 h-2 rounded-full transition-all duration-300 ease-out"
						style={{ width: `${progress}%` }}
					/>
				</div>

				{/* Status Text */}
				<div className="text-center">
					<p className="text-gray-400 text-xs">
						{allImagesLoaded
							? "Preparing experience..."
							: "Loading critical assets..."}
					</p>
				</div>
			</div>

			<style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.1; }
          50% { opacity: 0.2; }
          100% { opacity: 0.1; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
		</div>
	);
}

"use client";
import { getImagePath } from "@/lib/imagePath";
import { useEffect, useMemo, useState } from "react";

export default function SimpleLoading({
	onComplete,
}: { onComplete?: () => void }) {
	const [loading, setLoading] = useState(true);
	const [loadedImages, setLoadedImages] = useState(new Set());
	const [allImagesLoaded, setAllImagesLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	// List of critical images that need to be loaded before showing the main content
	const criticalImages = useMemo(
		() => [
			getImagePath("/assets/header/logo.svg"),
			getImagePath("/backdrop_hero.svg"),
			getImagePath("/onlylogo.svg"),
			getImagePath("/hero_samurai_1.svg"),
			getImagePath("/hero_samurai_2.svg"),
			getImagePath("/hero_samurai_3.svg"),
			getImagePath("/duo 5.svg"),
			getImagePath("/header_mobile_0.svg"),
			getImagePath("/header_mobile_1.svg"),
			getImagePath("/header_mobile_2.svg"),
			getImagePath("/assets/header/layer3.svg"),
			getImagePath("/assets/header/layer2.svg"),
			getImagePath("/assets/header/layer1.svg"),
			getImagePath("/assets/header/button.svg"),
			getImagePath("/SideSkirt_0.svg"),
			getImagePath("/SideSkirt_1.svg"),
			getImagePath("/SideSkirt_2.svg"),
			getImagePath("/SideSkirt_Decorative.svg"),
			getImagePath("/SideSkirt_Time.svg"),
			getImagePath("/down_tag_1.svg"),
			getImagePath("/down_tag_2.svg"),
			getImagePath("/down_tag_3.svg"),
		],
		[],
	);

	useEffect(() => {
		let loadingComplete = false;
		const imagePromises: Promise<void>[] = [];
		const startTime = Date.now();

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
					// console.error(`Failed to load image: ${src}`);
					setHasError(true);
					reject(new Error(`Failed to load image: ${src}`));
				};
			});

			imagePromises.push(promise);
		}

		// Wait for all images to load
		Promise.all(imagePromises)
			.then(() => {
				if (!loadingComplete) {
					setAllImagesLoaded(true);
					const minLoadingTime = 2000;
					const elapsedTime = Date.now() - startTime;
					const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

					setTimeout(() => {
						if (!loadingComplete) {
							loadingComplete = true;
							setLoading(false);
							if (onComplete) onComplete();
						}
					}, remainingTime);
				}
			})
			.catch(() => {
				// Don't hide loading screen on error - stay on error state
				console.log("Image loading failed");
			});

		// Remove the fallback timeout or make it much longer
		// Only use timeout for true emergencies (network issues, etc.)
		const fallbackTimer = setTimeout(() => {
			if (!loadingComplete) {
				console.warn(
					"Loading timeout reached after 30 seconds. Some images may not have loaded properly.",
				);
				loadingComplete = true;
				setLoading(false);
				if (onComplete) onComplete();
			}
		}, 30000); // Increased to 30 seconds

		return () => {
			loadingComplete = true;
			clearTimeout(fallbackTimer);
		};
	}, [onComplete, criticalImages]);

	if (!loading) return null;

	// Calculate loading progress
	const progress = (loadedImages.size / criticalImages.length) * 100;

	return (
		<div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000] px-4">
			{/* Responsive stacked logo container with both logos */}
			<div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center mx-auto">
				{/* Background logo */}
				<img
					src={getImagePath("/onlylogo.svg")}
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
					src={getImagePath("/assets/header/logo.svg")}
					alt="Duothan Logo"
					className="absolute z-10 w-[270px] h-[270px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px]"
				/>
			</div>

			{/* Loading Progress */}
			<div className="mt-8 w-full max-w-md">
				{hasError ? (
					// Error State
					<div className="text-center">
						<p className="text-red-400 text-sm mb-4">
							An error occurred while loading assets, please refresh
						</p>
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm transition-colors"
						>
							Refresh Page
						</button>
					</div>
				) : (
					// Normal Loading State
					<>
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
					</>
				)}
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

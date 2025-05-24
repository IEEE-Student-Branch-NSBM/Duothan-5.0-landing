"use client";

import { useEffect, useState } from "react";

interface ViewportScalingOptions {
	/**
	 * The target screen width the design was created for (default: 1920)
	 */
	designWidth?: number;

	/**
	 * The target screen height the design was created for (default: 1080)
	 */
	designHeight?: number;

	/**
	 * Minimum scale factor to apply (default: 0.7)
	 */
	minScale?: number;

	/**
	 * Maximum scale factor to apply (default: 1)
	 */
	maxScale?: number;

	/**
	 * Whether to enable debug mode which logs scaling info to console
	 */
	debug?: boolean;
}

export function useViewportScaling({
	designWidth = 1920,
	designHeight = 1080,
	minScale = 0.7,
	maxScale = 1,
	debug = false,
}: ViewportScalingOptions = {}) {
	const [scaleValue, setScaleValue] = useState(1);
	const [viewportInfo, setViewportInfo] = useState({
		width: 0,
		height: 0,
		pixelRatio: 1,
		effectiveWidth: 0,
		effectiveHeight: 0,
	});

	useEffect(() => {
		const calculateScale = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			const pixelRatio = window.devicePixelRatio || 1;

			// Calculate effective dimensions considering pixel ratio
			const effectiveWidth = width * pixelRatio;
			const effectiveHeight = height * pixelRatio;

			setViewportInfo({
				width,
				height,
				pixelRatio,
				effectiveWidth,
				effectiveHeight,
			});

			let scale = 1;

			// Case 1: Small displays (1366x768 and similar)
			if (width <= 1366 && width >= 1200 && height <= 768 && height >= 600) {
				scale = minScale;
			}
			// Case 2: Detect OS scaling directly via pixelRatio
			else if (pixelRatio > 1 && pixelRatio <= 2) {
				// For common OS scale factors like 125% (1.25), 150% (1.5)
				// Apply a scale based on the inverse of the pixel ratio to compensate
				const scaleFactor = 1 / pixelRatio;

				// Scale only if the screen resolution appears to be affected by OS scaling
				if (width <= 1920 * 0.9) {
					// Adjust for various scaling levels (120%, 125%, 150%)
					if (pixelRatio >= 1.1 && pixelRatio < 1.3) {
						// For 120-125% scaling
						scale = Math.max(minScale, Math.min(0.85, scaleFactor * 1.05));
					} else if (pixelRatio >= 1.3 && pixelRatio <= 1.7) {
						// For 150% scaling
						scale = Math.max(minScale, Math.min(0.8, scaleFactor));
					} else {
						// Other scaling factors
						scale = Math.max(minScale, Math.min(maxScale, scaleFactor));
					}
				}
			}
			// Case 3: Screens with 1080p native resolution or similar
			else if (
				// Detect screens close to 1080p that might need scaling
				width >= 1600 &&
				width <= 1920 &&
				height >= 900 &&
				height <= 1080 &&
				width < designWidth
			) {
				// Apply light scaling based on width ratio
				const widthRatio = width / designWidth;
				scale = Math.max(0.85, Math.min(0.95, widthRatio));
			}

			if (debug) {
				console.log({
					viewport: { width, height, pixelRatio },
					effective: { width: effectiveWidth, height: effectiveHeight },
					calculatedScale: scale,
				});
			}

			setScaleValue(scale);
		};

		calculateScale();
		window.addEventListener("resize", calculateScale);
		return () => window.removeEventListener("resize", calculateScale);
	}, [designWidth, minScale, maxScale, debug]);

	// Function to help developers test different device pixel ratios and screen sizes
	const simulateScreenSize = (
		simulatedWidth: number,
		simulatedHeight: number,
		simulatedRatio: number,
	) => {
		const calculateSimulatedScale = () => {
			// Use the simulated values instead of window properties
			const width = simulatedWidth;
			const height = simulatedHeight;
			const pixelRatio = simulatedRatio;

			const effectiveWidth = width * pixelRatio;
			const effectiveHeight = height * pixelRatio;

			let scale = 1;

			// Same scaling logic as above
			if (width <= 1366 && width >= 1200 && height <= 768 && height >= 600) {
				scale = minScale;
			} else if (pixelRatio > 1 && pixelRatio <= 2) {
				const scaleFactor = 1 / pixelRatio;

				if (width <= 1920 * 0.9) {
					if (pixelRatio >= 1.1 && pixelRatio < 1.3) {
						scale = Math.max(minScale, Math.min(0.85, scaleFactor * 1.05));
					} else if (pixelRatio >= 1.3 && pixelRatio <= 1.7) {
						scale = Math.max(minScale, Math.min(0.8, scaleFactor));
					} else {
						scale = Math.max(minScale, Math.min(maxScale, scaleFactor));
					}
				}
			} else if (
				width >= 1600 &&
				width <= 1920 &&
				height >= 900 &&
				height <= 1080 &&
				width < designWidth
			) {
				const widthRatio = width / designWidth;
				scale = Math.max(0.85, Math.min(0.95, widthRatio));
			}

			return {
				scale,
				viewport: {
					width,
					height,
					pixelRatio,
					effectiveWidth,
					effectiveHeight,
				},
				scaleStyle: scale !== 1 ? { transform: `scale(${scale})` } : {},
			};
		};

		return calculateSimulatedScale();
	};

	return {
		scale: scaleValue,
		viewport: viewportInfo,
		scaleStyle: scaleValue !== 1 ? { transform: `scale(${scaleValue})` } : {},
		// Export the simulation function for testing
		simulateScreenSize,
	};
}

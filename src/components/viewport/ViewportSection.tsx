"use client";

import React from "react";
import type { ReactNode } from "react";
import { useViewportScaling } from "./useViewportScaling";

interface ViewportSectionProps {
	children: ReactNode;
	className?: string;
	id?: string;
	/**
	 * The target design width (default: 1920)
	 */
	designWidth?: number;
	/**
	 * The target design height (default: 1080)
	 */
	designHeight?: number;
	/**
	 * Disable auto-scaling for this section
	 */
	disableScaling?: boolean;
}

/**
 * ViewportSection - A wrapper component for content within the Viewport
 * This provides consistent styling and ensures proper animation handling
 * Automatically scales content for different display sizes and OS scale settings
 */
const ViewportSection: React.FC<ViewportSectionProps> = ({
	children,
	className = "",
	id,
	designWidth = 1920,
	designHeight = 1080,
	disableScaling = false,
}) => {
	const { scaleStyle } = useViewportScaling({
		designWidth,
		designHeight,
		minScale: 0.7,
		maxScale: 1,
	});

	// Check if this section contains a footer
	const hasFooter = React.Children.toArray(children).some(
		(child) => React.isValidElement(child) && child.type.name === "Footer",
	);

	return (
		<section
			id={id}
			className={`relative ${hasFooter ? "md:min-h-screen" : "min-h-screen"} w-full flex flex-col items-center justify-center px-4 md:px-10 ${className}`}
		>
			<div
				className={`w-full max-w-7xl mx-auto flex flex-col items-center ${hasFooter ? "md:justify-center" : "justify-center"}`}
				style={disableScaling ? {} : scaleStyle}
			>
				{children}
			</div>
		</section>
	);
};

export default ViewportSection;

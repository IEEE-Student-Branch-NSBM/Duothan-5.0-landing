"use client";

import type React from "react";
import type { ReactNode } from "react";

interface ViewportSectionProps {
	children: ReactNode;
	className?: string;
	id?: string;
}

/**
 * ViewportSection - A wrapper component for content within the Viewport
 * This provides consistent styling and ensures proper animation handling
 */
const ViewportSection: React.FC<ViewportSectionProps> = ({
	children,
	className = "",
	id,
}) => {
	return (
		<section
			id={id}
			className={`relative min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 ${className}`}
		>
			{children}
		</section>
	);
};

export default ViewportSection;

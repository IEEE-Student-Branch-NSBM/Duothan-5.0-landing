"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import TimelineCard from "./timelinecard";

type TimelineItem = {
	id: number;
	title: string;
	description: string;
	position: "left" | "right";
	markerPosition: {
		mobile: number;
		desktop: number;
	};
	customStyles?: {
		mobile?: React.CSSProperties;
		desktop?: React.CSSProperties;
	};
};

export default function Timeline() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Define marker positions for mobile and desktop
	const markerPositions = {
		mobile: [
			5, // Top marker
			180, // First card marker
			340, // Second card marker
			500, // Third card marker
			660, // Fourth card marker
			780, // Bottom marker
		],
		desktop: [
			0, // Top marker
			143, // First card marker
			280, // Second card marker
			420, // Third card marker
			560, // Fourth card marker
			750, // Bottom marker
		],
	};

	const [items] = useState<TimelineItem[]>([
		{
			id: 1,
			title: "First Milestone",
			description: "Description of the first milestone",
			position: "right",
			markerPosition: {
				mobile: markerPositions.mobile[1],
				desktop: markerPositions.desktop[1],
			},
			customStyles: {
				mobile: {
					top: "80px",
				},
				desktop: {
					top: "59px",
					right: "90px",
				},
			},
		},
		{
			id: 2,
			title: "Second Milestone",
			description: "Description of the second milestone,Description of the ",
			position: "left",
			markerPosition: {
				mobile: markerPositions.mobile[2],
				desktop: markerPositions.desktop[2],
			},
			customStyles: {
				mobile: {
					top: "240px",
				},
				desktop: {
					top: "195px",
					left: "92px",
				},
			},
		},
		{
			id: 3,
			title: "Third Milestone",
			description: "Description of the third milestone",
			position: "right",
			markerPosition: {
				mobile: markerPositions.mobile[3],
				desktop: markerPositions.desktop[3],
			},
			customStyles: {
				mobile: {
					top: "400px",
				},
				desktop: {
					top: "335px",
					right: "90px",
				},
			},
		},
		{
			id: 4,
			title: "Fourth Milestone",
			description: "Description of the fourth milestone",
			position: "left",
			markerPosition: {
				mobile: markerPositions.mobile[4],
				desktop: markerPositions.desktop[4],
			},
			customStyles: {
				mobile: {
					top: "560px",
					right: "120px",
				},
				desktop: {
					top: "475px",
					left: "92px",
				},
			},
		},
	]);

	// Calculate total height based on the last marker position plus some padding
	markerPositions.mobile[markerPositions.mobile.length - 1] + 15;
	markerPositions.desktop[markerPositions.desktop.length - 1] + 50;

	// Generate unique IDs for reliable keys instead of using array indices
	const getDesktopMarkerId = (index: number) =>
		`desktop-marker-${markerPositions.desktop[index]}-${index}`;
	const getMobileMarkerId = (index: number) =>
		`mobile-marker-${markerPositions.mobile[index]}-${index}`;

	return (
		<div className="bg-black px-4 py-4 relative min-h-screen h-200 flex flex-col items-center justify-center w-full max-w-[1170px] mx-auto">
			{/* Desktop/Tablet Timeline (image-based) */}
			<div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-1/6">
				<Image
					src="/timeline.svg"
					alt="Timeline"
					width={100}
					height={800}
					className="h-190 w-full object-contain"
					priority
				/>

				{/* Desktop/Tablet markers */}
				{markerPositions.desktop.map((position, index) => (
					<div
						key={getDesktopMarkerId(index)}
						className="absolute left-1/2 -translate-x-1/2 w-4 h-4"
						style={{ top: `${position}px` }}
					>
						{/* Add rendering for top and bottom markers */}
						{(index === 0 || index === markerPositions.desktop.length - 1) && (
							<div className="absolute w-5 h-5 bg-teal-300 top-2.5 left-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45" />
						)}

						{/* Existing diamond markers for card positions */}
						{index > 0 && index < markerPositions.desktop.length - 1 && (
							<>
								<div className="absolute w-5 h-5 bg-cyan-600 opacity-40 animate-pulse rotate-45" />
								<div className="absolute w-4 h-4 bg-teal-300 top-2.5 left-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45" />
							</>
						)}
					</div>
				))}
			</div>

			{/* Mobile Timeline (hardcoded zigzag SVG) */}
			<div className="sm:hidden absolute left-0 w-full px-4">
				<svg
					width="100%"
					height={mobileHeight}
					viewBox={`0 0 100 ${mobileHeight}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="overflow-visible"
					preserveAspectRatio="none"
					aria-labelledby="timelineTitle"
					role="img"
				>
					<title id="timelineTitle">Project Timeline Zigzag Path</title>
					{/* Zigzag path */}
					<path
						d="M10,24 L10,140 L0,180 L10,220 L10,300 L0,340 L10,380 L10,460 L0,500 L10,540 L10,620 L0,660 L10,700 L10,780"
						stroke="#d946ef"
						strokeWidth="1"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="filter drop-shadow-md"
					/>
				</svg>

				{/* Mobile markers at zigzag points */}
				{markerPositions.mobile.map((position, index) => {
					// Alternate x position for zigzag
					const xPos = index % 2 === 0 ? "12.5%" : "12.5%";

					return (
						<div
							key={getMobileMarkerId(index)}
							className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4"
							style={{
								top: `${position}px`,
								left: xPos,
							}}
						>
							{/* Top and bottom markers */}
							{(index === 0 || index === markerPositions.mobile.length - 1) && (
								<div className="absolute w-5 h-5 bg-teal-300 rotate-45" />
							)}

							{/* Timeline point markers */}
							{index > 0 && index < markerPositions.mobile.length - 1 && (
								<>
									<div className="absolute w-5 h-5 bg-cyan-600 opacity-40 animate-pulse rotate-45" />
									<div className="absolute w-4 h-4 bg-teal-300 top-2 left-2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
								</>
							)}
						</div>
					);
				})}
			</div>

			{/* Timeline cards */}
			<div className="relative w-full h-full">
				{items.map((item, index) => (
					<div
						key={item.id}
						className="absolute"
						style={{
							...(isMobile
								? {
										...item.customStyles?.mobile,
										left: index % 2 === 0 ? "calc(20% - 3px)" : "auto",
										right: index % 2 === 0 ? "auto" : "calc(20% - 78px)",
									}
								: item.customStyles?.desktop),
						}}
					>
						{/* Connecting line - only visible on desktop/tablet */}
						<div
							className="hidden sm:block absolute top-29 w-8 h-0.5 bg-fuchsia-500"
							style={{
								transform: "translateY(-18px)",
								left: item.position === "left" ? "auto" : "-32px",
								right: item.position === "right" ? "auto" : "-32px",
							}}
						/>

						{/* Connecting line - only visible on mobile */}
						<div
							className="sm:hidden absolute top-29 h-0.5 bg-fuchsia-500"
							style={{
								transform: "translateY(-29px)",
								width: index % 2 === 0 ? "20px" : "20px",
								left: index % 2 === 0 ? "-20px" : "auto",
								right: index % 2 === 0 ? "auto" : "280px",
							}}
						/>

						<TimelineCard
							title={item.title}
							description={item.description}
							position={
								isMobile ? (index % 2 === 0 ? "right" : "left") : item.position
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

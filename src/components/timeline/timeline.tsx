"use client";

import { useState } from "react";
import Card from "./timelinecard";

export default function Timeline() {
	type TimelineItem = {
		id: number;
		position: "left1" | "right1" | "left2" | "right2";
		title: string;
		description: string;
	};

	const [items] = useState<TimelineItem[]>([
		{
			id: 1,
			position: "right1",
			title: "First Milestone",
			description: "Description of the first milestone",
		},
		{
			id: 2,
			position: "left2",
			title: "Second Milestone",
			description: "Description of the second milestone",
		},
		{
			id: 3,
			position: "right1",
			title: "Third Milestone",
			description: "Description of the third milestone",
		},
		{
			id: 4,
			position: "left2",
			title: "Fourth Milestone",
			description: "Description of the fourth milestone",
		},
	]);

	return (
		<div className="bg-black px-4 lg:px-0 max-h-1.5dvh flex flex-col items-center justify-center relative w-full max-w-[1170px] mx-auto">
			<div
				className="relative max-w-4xl w-full py-16 m-0 bg-none"
				style={{ height: "800px" }}
			>
				{/* SVG Timeline with zigzag pattern */}
				<svg
					className="absolute left-1/2 transform -translate-x-1/2 h-full w-1/6 top-5 p-0"
					viewBox="0 0 120 800"
					preserveAspectRatio="none"
				>
					<title>Timeline</title>
					{/* Top diamond */}
					<rect
						x="0"
						y="20"
						width="20"
						height="20"
						fill="#5eead4"
						transform="rotate(45, 50, 70)"
					/>

					{/* Bottom diamond */}
					<rect
						x="70"
						y="710"
						width="20"
						height="20"
						fill="#5eead4"
						transform="rotate(45, 50, 690)"
					/>

					{/* Zigzag line */}
					<path
						d="M50,24 L50,140 L10,180 L50,220 L50,270 L90,310 L50,350 L50,400 L10,440 L50,480 L50,530 L90,570 L50,610 L50,720"
						stroke="#d946ef"
						strokeWidth="2.5"
						fill="none"
					/>

					{/* Glowing diamond markers */}
					{/* First marker */}
					<rect
						x="44"
						y="170"
						width="18"
						height="18"
						fill="#0891b2"
						transform="rotate(45, 50, 176)"
						opacity="0.4"
					>
						<animate
							attributeName="opacity"
							values="0.4;0.8;0.4"
							dur="2s"
							repeatCount="indefinite"
						/>
					</rect>
					<rect
						x="46"
						y="172"
						width="14"
						height="14"
						fill="#5eead4"
						transform="rotate(45, 50, 176)"
					/>

					{/* Second marker */}
					<rect
						x="44"
						y="300"
						width="18"
						height="18"
						fill="#0891b2"
						transform="rotate(45, 50, 306)"
						opacity="0.4"
					>
						<animate
							attributeName="opacity"
							values="0.4;0.8;0.4"
							dur="2s"
							repeatCount="indefinite"
						/>
					</rect>
					<rect
						x="46"
						y="302"
						width="14"
						height="14"
						fill="#5eead4"
						transform="rotate(45, 50, 306)"
					/>

					{/* Third marker */}
					<rect
						x="44"
						y="430"
						width="18"
						height="18"
						fill="#0891b2"
						transform="rotate(45, 50, 436)"
						opacity="0.4"
					>
						<animate
							attributeName="opacity"
							values="0.4;0.8;0.4"
							dur="2s"
							repeatCount="indefinite"
						/>
					</rect>
					<rect
						x="46"
						y="432"
						width="14"
						height="14"
						fill="#5eead4"
						transform="rotate(45, 50, 436)"
					/>

					{/* Fourth marker */}
					<rect
						x="44"
						y="560"
						width="18"
						height="18"
						fill="#0891b2"
						transform="rotate(45, 50, 566)"
						opacity="0.4"
					>
						<animate
							attributeName="opacity"
							values="0.4;0.8;0.4"
							dur="2s"
							repeatCount="indefinite"
						/>
					</rect>
					<rect
						x="46"
						y="562"
						width="14"
						height="14"
						fill="#5eead4"
						transform="rotate(45, 50, 566)"
					/>

					{/* Horizontal connecting lines */}
					<line
						x1="60"
						y1="180"
						x2="105"
						y2="180"
						stroke="#d946ef"
						strokeWidth="2"
					/>
					<line
						x1="40"
						y1="310"
						x2="0"
						y2="310"
						stroke="#d946ef"
						strokeWidth="2"
					/>
					<line
						x1="60"
						y1="440"
						x2="105"
						y2="440"
						stroke="#d946ef"
						strokeWidth="2"
					/>
					<line
						x1="40"
						y1="570"
						x2="0"
						y2="570"
						stroke="#d946ef"
						strokeWidth="2"
					/>
				</svg>

				{/* Timeline items */}
				<div className="relative z-10 w-full h-full">
					{/* First card - top right */}
					<div className="absolute top-[20px] right-0">
						<Card
							position="right1"
							title={items[0].title}
							description={items[0].description}
						/>
					</div>

					{/* Second card - middle left */}
					<div className="absolute top-[150px] left-0">
						<Card
							position="left2"
							title={items[1].title}
							description={items[1].description}
						/>
					</div>

					{/* Third card - bottom right */}
					<div className="absolute top-[280px] right-0">
						<Card
							position="right1"
							title={items[2].title}
							description={items[2].description}
						/>
					</div>

					{/* Fourth card - bottom left */}
					<div className="absolute top-[410px] left-0">
						<Card
							position="left2"
							title={items[3].title}
							description={items[3].description}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import { Electrolize } from "next/font/google";
import Image from "next/image";
import React from "react";

const electrolize = Electrolize({
	subsets: ["latin"],
	weight: ["400"],
});

type CardProps = {
	title: string;
	description: string;
	position: "left1" | "right1" | "left2" | "right2";
};

export default function Card({ title, description, position }: CardProps) {
	// Determine if this is a left or right card
	const isRightCard = position === "right1" || position === "right2";

	return (
		<div
			className={`relative w-[433px] h-[193px] ${isRightCard ? "ml-auto" : "mr-auto"}`}
		>
			{/* Conditional SVG rendering based on position */}
			{position === "left1" && (
				<Image
					src="/timelinecardleft.svg"
					alt="Left1 timeline card"
					width={433}
					height={193}
					className="absolute z-0 w-full h-full object-cover -ml-11"
				/>
			)}
			{position === "right1" && (
				<Image
					src="/timelinecardright.svg"
					alt="Right1 timeline card"
					width={433}
					height={193}
					className="absolute z-0 w-full h-full object-cover ml-10"
				/>
			)}
			{position === "left2" && (
				<Image
					src="/timelinecardleft.svg"
					alt="Left2 timeline card"
					width={433}
					height={193}
					className="absolute z-0 w-full h-full object-cover -ml-15"
				/>
			)}
			{position === "right2" && (
				<Image
					src="/timelinecardright.svg"
					alt="Right2 timeline card"
					width={433}
					height={193}
					className="absolute z-0 w-full h-full object-cover ml-10"
				/>
			)}

			{/* Content overlay */}
			<div
				className={`absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-between p-6 ${isRightCard ? "items-end text-right" : "items-start text-left"}`}
			>
				<div className="flex-1" /> {/* Spacer */}
				<div className={`${isRightCard ? "pr-8" : "pl-8"}`}>
					<h3
						className={`${electrolize.className} text-xl text-[#a2ebff] font-bold mb-2`}
					>
						{title}
					</h3>
					<p className={`text-white text-sm ${electrolize.className}`}>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}

"use client";

import { Electrolize } from "next/font/google";
import Image from "next/image";

const electrolize = Electrolize({
	subsets: ["latin"],
	weight: ["400"],
});

type CardProps = {
	title: string;
	description: string;
	position: "left" | "right";
};

export default function TimelineCard({
	title,
	description,
	position,
}: CardProps) {
	const cardImage =
		position === "left" ? "/timelinecardleft.svg" : "/timelinecardright.svg";

	return (
		<div
			className={`relative
       // Mobile size
      w-[280px] h-[140px]
      
      // Desktop size (matches your original SVG dimensions)
      sm:w-[433px] sm:h-[193px]
    `}
		>
			{/* Card background image */}
			<Image
				src={cardImage}
				alt={`${position} timeline card`}
				width={433}
				height={193}
				className="absolute z-0 w-full h-full object-cover"
			/>

			{/* Content */}
			<div
				className={`
        absolute z-10 w-full h-full flex flex-col justify-between p-2 sm:p-6
        ${position === "right" ? "items-end sm:items-start" : "items-start"}
      `}
			>
				<div className="flex-1" />
				<div className={`${position === "right" ? "pr-4 sm:pl-8" : "pl-8"}`}>
					<h3
						className={`${electrolize.className} text-lg sm:text-xl text-[#a2ebff] font-bold mb-2`}
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

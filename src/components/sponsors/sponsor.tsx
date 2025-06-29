"use client";

import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

// Import custom font
const readyplayerone = localFont({
	src: "../../../public/font.otf",
	display: "swap",
});

// Define sponsor types
interface Sponsor {
	id: number;
	img: string;
	altText?: string;
}

// Define sponsor data with direct image paths
const TITLE_PARTNERS: Sponsor[] = [
	{
		id: 1,
		img: "/assets/sponsor/NSBM-LOGO.png",
		altText: "NSBM Green University",
	},
];

const BRONZE_PARTNERS: Sponsor[] = [
	{
		id: 2,
		img: "/assets/sponsor/logo-trans.png",
		altText: "codearch",
	},
	{
		id: 3,
		img: "/assets/sponsor/ogoLogo.png",
		altText: "ogo",
	},
];

const BEVERAGE_PARTNERS: Sponsor[] = [
	{
		id: 4,
		img: "/assets/sponsor/sunquick-logo.png",
		altText: "sunquick",
	},
];

// Sponsor card component
const SponsorCard = ({
	img,
	altText = "Sponsor logo",
}: {
	img: string;
	url?: string;
	altText?: string;
}) => {
	const cardContent = (
		<div className="relative w-full h-full transition-all duration-300 hover:scale-105 group">
			<div className="w-full h-[130px] relative flex items-center justify-center">
				{/* Subtract SVG card background */}
				<div className="absolute inset-0 flex items-center justify-center">
					<Image
						src="/assets/sponsor/Subtract.svg"
						alt="Card background"
						width={200}
						height={160}
						className="object-contain"
						priority
					/>
				</div>

				{/* Sponsor logo */}
				<div
					className={`relative z-10 ${altText === "codearch" ? "bg-[#1a1a1a]" : "bg-white"} flex items-center justify-center w-[125px] h-[60px]`}
				>
					<Image
						src={img}
						alt={altText || "Sponsor logo"}
						width={120}
						height={50}
						className="object-contain max-w-full p-1 max-h-full"
					/>
				</div>
			</div>
		</div>
	);

	return cardContent;
};

// Main component
export default function Sponsor() {
	return (
		<section className="w-full lg:pt-16 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Title Partners */}
				<div className="mb-8">
					<h3
						className={cn(
							"text-xl md:text-2xl text-center text-[#e957dd]",
							readyplayerone.className,
						)}
					>
						TITLE PARTNER
					</h3>
					<div className="flex justify-center">
						{TITLE_PARTNERS.map((sponsor) => (
							<div
								key={`title-partner-${sponsor.id}`}
								className="w-full max-w-md"
							>
								<SponsorCard img={sponsor.img} altText={sponsor.altText} />
							</div>
						))}
					</div>
				</div>

				{/* Bronze Partners */}
				<div className="mb-8">
					<h3
						className={cn(
							"text-xl md:text-2xl text-center text-[#e957dd]",
							readyplayerone.className,
						)}
					>
						BRONZE PARTNERS
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6 max-w-2xl mx-auto">
						{BRONZE_PARTNERS.map((sponsor) => (
							<div key={`bronze-partner-${sponsor.id}`}>
								<SponsorCard img={sponsor.img} altText={sponsor.altText} />
							</div>
						))}
					</div>
				</div>

				{/* Beverage Partners */}
				<div>
					<h3
						className={cn(
							"text-xl md:text-2xl text-center text-[#e957dd]",
							readyplayerone.className,
						)}
					>
						BEVERAGE PARTNER
					</h3>
					<div className="flex justify-center">
						{BEVERAGE_PARTNERS.map((sponsor) => (
							<div
								key={`beverage-partner-${sponsor.id}`}
								className="w-full max-w-md"
							>
								<SponsorCard img={sponsor.img} altText={sponsor.altText} />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

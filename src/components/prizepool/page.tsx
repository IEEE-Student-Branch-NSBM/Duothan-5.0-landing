"use client";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { getImagePath } from "@/lib/imagePath";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";

const readyplayerone = localFont({
	src: "../../../public/font.otf",
	display: "swap",
});

interface PrizeCardProps {
	place: string;
	amount: string;
	imageUrl: string;
	variant: "first" | "second" | "third";
}

const PrizeCard: React.FC<PrizeCardProps> = ({
	place,
	amount,
	// imageUrl parameter is defined but not used in the component
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	imageUrl,
	variant,
}) => {
	const bgCardSrc = getImagePath("/prize_pool_1.svg");
	const borderCardSrc = getImagePath("/prize_pool_0.svg");

	// Format place to ensure numbers are properly displayed
	const formatPlace = (place: string) => {
		// Extract the number from the place string (e.g., "1st", "2nd", "3rd")
		const match = place.match(/(\d+)([a-zA-Z]+)/);
		if (!match) return place;

		const [/* full match */ , number, suffix] = match;
		return (
			<>
				<span className="font-sans font-bold pr-1">{number}</span>
				{suffix} Place
			</>
		);
	};

	// Format amount to ensure numbers display properly
	const formatAmount = (amount: string) => {
		// Extract numbers from the amount string (e.g., "LKR 50,000")
		return amount.split(" ").map((part, index) => {
			// Generate a more reliable unique key using the part content and position
			const key = `${part}-${index}-${place}`;
			// If part contains digits, wrap it in a span with web-safe font
			if (/\d/.test(part)) {
				return (
					<span key={key} className="font-sans">
						{part}
					</span>
				);
			}
			return <span key={key}>{part} </span>;
		});
	};

	// Set different card positions and animations based on variant
	const cardVariants = {
		first: {
			y: [0, -5, 0],
			transition: {
				duration: 2,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			},
			zIndex: 20,
		},
		second: {
			y: [0, -3, 0],
			transition: {
				duration: 2.5,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
				delay: 0.3,
			},
			zIndex: 10,
		},
		third: {
			y: [0, -3, 0],
			transition: {
				duration: 2.5,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
				delay: 0.6,
			},
			zIndex: 10,
		},
	};

	return (
		<motion.div
			className="relative"
			variants={cardVariants}
			animate={variant}
			initial="initial"
		>
			<div className="relative flex justify-center items-center">
				{/* Background card */}
				<div className="relative scale-90 opacity-25">
					<Image
						src={bgCardSrc}
						alt="Prize card background"
						width={279}
						height={381}
					/>
				</div>

				{/* Border/Glow card */}
				<div
					className={`absolute inset-0 -z-10 ${variant === "first" ? "opacity-90 animate-pulse" : "opacity-70"}`}
				>
					<Image
						src={borderCardSrc}
						alt="Prize card border"
						width={306}
						height={409}
						className={
							variant === "first"
								? "drop-shadow-[0_0_5px_rgba(25,211,255,5)]"
								: ""
						}
					/>
				</div>

				{/* Content */}
				<div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-6">
					{/* Place title */}
					<div
						className={`${readyplayerone.className} text-center text-lg text-white`}
					>
						{formatPlace(place)}
					</div>

					{/* Trophy image */}
					<div className="relative w-40 h-40 flex items-center justify-center">
						<div className="bg-gray-700/50 w-full h-full flex items-center justify-center">
							<Image
								src={imageUrl}
								alt="Custom trophy"
								width={160}
								height={60}
								className="object-contain"
							/>
						</div>
					</div>

					{/* Prize amount */}
					<div
						className={`${readyplayerone.className} text-center text-lg text-white mt-4`}
					>
						{formatAmount(amount)}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const MobileCarousel = () => {
	const [api, setApi] = useState<CarouselApi | null>(null);
	const [current, setCurrent] = useState(0);

	// Format place to ensure numbers are properly displayed
	const formatPlaceMobile = (place: string) => {
		// Extract the number from the place string (e.g., "1st", "2nd", "3rd")
		const match = place.match(/(\d+)([a-zA-Z]+)/);
		if (!match) return place;

		const [/* full match */ , number, suffix] = match;
		return (
			<>
				<span className="font-sans">{number}</span>
				{suffix} Place
			</>
		);
	};

	// Format amount to ensure numbers display properly
	const formatAmount = (amount: string) => {
		// Extract numbers from the amount string (e.g., "LKR 50,000")
		return amount.split(" ").map((part, index) => {
			// Generate a more reliable unique key using the part content and position
			const key = `mobile-${part}-${index}`;
			// If part contains digits, wrap it in a span with web-safe font
			if (/\d/.test(part)) {
				return (
					<span key={key} className="font-sans">
						{part}
					</span>
				);
			}
			return <span key={key}>{part} </span>;
		});
	};

	// Monitor slide changes
	useEffect(() => {
		if (!api) return;

		const handleSlideChange = () => {
			setCurrent(api.selectedScrollSnap());
		};

		api.on("select", handleSlideChange);
		setCurrent(api.selectedScrollSnap());

		return () => {
			api.off("select", handleSlideChange);
		};
	}, [api]);

	const prizeData = [
		{
			place: "2nd Place",
			amount: "LKR 30,000",
			imageUrl: getImagePath("/assets/PricePool/2nd_Place.jpg"),
		},
		{
			place: "1st Place",
			amount: "LKR 50,000",
			imageUrl: getImagePath("/assets/PricePool/1st_Place.jpg"),
		},
		{
			place: "3rd Place",
			amount: "LKR 30,000",
			imageUrl: getImagePath("/assets/PricePool/3rd_Place.jpg"),
		},
	];

	return (
		<Carousel
			opts={{
				loop: true,
				align: "center",
			}}
			plugins={[
				Autoplay({
					delay: 3000,
					stopOnMouseEnter: true,
					stopOnInteraction: false,
				}),
			]}
			className="w-full relative"
			setApi={setApi}
		>
			<CarouselContent className="ml-0 px-4">
				{prizeData.map((prize, index) => (
					<CarouselItem
						key={`prize-${prize.place}`}
						className="pl-0 flex items-center justify-center"
					>
						<motion.div
							className="w-64 h-96 relative flex flex-col items-center justify-center"
							animate={{
								y: [0, -5, 0],
							}}
							transition={{
								duration: 2,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
								delay: index * 0.2,
							}}
						>
							<div className="relative">
								{/* Background card */}
								<div className="relative scale-90 opacity-25">
									<Image
										src={getImagePath("/prize_pool_1.svg")}
										alt="Prize card background"
										width={279}
										height={381}
									/>
								</div>

								{/* Border/Glow card */}
								<div
									className={`absolute inset-0 -z-10 ${prize.place === "1st Place" ? "opacity-90 animate-pulse" : "opacity-70"}`}
								>
									<Image
										src={getImagePath("/prize_pool_0.svg")}
										alt="Prize card border"
										width={306}
										height={409}
										className={
											prize.place === "1st Place"
												? "drop-shadow-[0_0_20px_rgba(25,211,255,1.5)]"
												: ""
										}
									/>
								</div>

								{/* Content */}
								<div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-6">
									<div
										className={`${readyplayerone.className} text-center text-lg text-white`}
									>
										{formatPlaceMobile(prize.place)}
									</div>
									<div className="relative w-40 h-40 flex items-center justify-center">
										<Image
											src={prize.imageUrl}
											alt="Custom trophy"
											width={140}
											height={60}
											className="object-contain"
										/>
									</div>
									<div
										className={`${readyplayerone.className} text-center text-lg text-white mt-4`}
									>
										{formatAmount(prize.amount)}
									</div>
								</div>
							</div>
						</motion.div>
					</CarouselItem>
				))}
			</CarouselContent>

			<div className="flex justify-center mt-4 gap-2 md:gap-4 items-center">
				{prizeData.map((prize, index) => (
					<button
						type="button"
						key={`indicator-${prize.place}`}
						onClick={() => api?.scrollTo(index)}
						className={`w-8 sm:w-10 lg:w-12 h-[5px] rounded-[5px] transition-all duration-300 ${
							current === index ? "bg-[#19D3FF]" : "bg-[#19D3FF] opacity-30"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</Carousel>
	);
};

export default function PrizePool() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div
				className={`${readyplayerone.className} text-3xl md:text-4xl lg:text-5xl text-center text-[#19D3FF] mb-12 drop-shadow-[0_0_8px_rgba(25,211,255,0.8)] animate-pulse`}
			>
				THE WINNERS VAULT
			</div>

			<div className="w-full hidden lg:flex flex-row justify-center items-center gap-4">
				{/* Prize cards layout - second place, first place, third place */}
				<PrizeCard
					place="2nd Place"
					amount="LKR 30,000"
					imageUrl={getImagePath("/assets/PricePool/2nd_Place.jpg")}
					variant="second"
				/>
				<PrizeCard
					place="1st Place"
					amount="LKR 50,000"
					imageUrl={getImagePath("/assets/PricePool/1st_Place.jpg")}
					variant="first"
				/>
				<PrizeCard
					place="3rd Place"
					amount="LKR 20,000"
					imageUrl={getImagePath("/assets/PricePool/3rd_Place.jpg")}
					variant="third"
				/>
			</div>

			{/* Mobile/Responsive version for smaller screens */}
			<div className="lg:hidden mt-12 w-full">
				<MobileCarousel />
			</div>
		</div>
	);
}

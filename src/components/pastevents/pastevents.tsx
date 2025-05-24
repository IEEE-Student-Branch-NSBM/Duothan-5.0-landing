"use client";
import Card from "@/components/pastevents/eventcard";
import Autoplay from "embla-carousel-autoplay";
import localFont from "next/font/local";
import React, { useState, useEffect } from "react";

// Import shadcn components
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const readyplayerone = localFont({ src: "../../../public/font.otf" });

const events = [
	{
		key: 1,
		title: "Duothon 1.0",
		image: "/background.png",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
	{
		key: 2,
		title: "Duothon 2.0",
		image: "/profile.png",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
	{
		key: 3,
		title: "Duothon 3.0",
		image: "/profile.png",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
	{
		key: 4,
		title: "Duothon 4.0",
		image: "/profile.png",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
];

export default function PastEvents() {
	const [api, setApi] = useState<CarouselApi>();
	const [isAnimating, setIsAnimating] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [viewportSize, setViewportSize] = useState("sm");

	// Detect screen size
	useEffect(() => {
		const checkScreenSize = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setIsMobile(true);
				setViewportSize("sm");
			} else if (width >= 768 && width < 1024) {
				setIsMobile(false);
				setViewportSize("md");
			} else {
				setIsMobile(false);
				setViewportSize("lg");
			}
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const handlePrevious = () => {
		if (isAnimating || !api) return;
		setIsAnimating(true);
		api.scrollPrev();
		setTimeout(() => setIsAnimating(false), 500);
	};

	const handleNext = () => {
		if (isAnimating || !api) return;
		setIsAnimating(true);
		api.scrollNext();
		setTimeout(() => setIsAnimating(false), 1000);
	};

	return (
		<div className="h-full px-4 lg:px-0 flex flex-col items-center w-full max-w-[1070px] my-20 mx-auto">
			<div className="w-full max-w-7xl">
				<Carousel
					opts={{
						loop: true,
						align: "start",
						slidesToScroll: 1,
						containScroll: "trimSnaps",
					}}
					plugins={
						isMobile
							? [
									Autoplay({
										delay: 2000,
										stopOnMouseEnter: true,
										stopOnInteraction: false,
									}),
								]
							: []
					}
					className="w-full relative"
					setApi={setApi}
				>
					<CarouselContent className="ml-0">
						{events.map((event) => (
							<CarouselItem
								key={event.key}
								className={`pl-0 ${
									viewportSize === "sm"
										? "basis-full"
										: viewportSize === "md"
											? "basis-1/2"
											: "basis-1/3"
								}`}
							>
								<div className="mb-6 relative flex items-center justify-center">
									<Card
										title={event.title}
										image={event.image}
										description={event.description}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					<CarouselPrevious className="hidden" />
					<CarouselNext className="hidden" />

					{/* Custom arrow buttons */}
					<button
						type="button"
						onClick={handlePrevious}
						disabled={isAnimating}
						className="absolute left-3 lg:-left-2 top-1/2 -translate-y-1/2 z-20 disabled:opacity-50 hidden md:block "
						aria-label="Previous event"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 36"
							fill="none"
						>
							<title>Previous Slide</title>
							<path
								d="M15 5L5 18L15 31"
								stroke="#ed00da"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>

					<button
						type="button"
						onClick={handleNext}
						disabled={isAnimating}
						className="absolute right-2 lg:-right-2 top-1/2 -translate-y-1/2 z-20 disabled:opacity-50 hidden md:block"
						aria-label="Next event"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 36"
							fill="none"
						>
							<title>Next Slide</title>
							<path
								d="M9 5L19 18L9 31"
								stroke="#ed00da"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</Carousel>
			</div>
		</div>
	);
}

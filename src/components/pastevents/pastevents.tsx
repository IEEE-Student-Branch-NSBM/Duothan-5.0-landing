"use client";
import Card from "@/components/pastevents/eventcard";
import Autoplay from "embla-carousel-autoplay";
// import localFont from "next/font/local";
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

// const readyplayerone = localFont({ src: "../../../public/font.otf" });

const events = [
	{
		key: 1,
		title: "Duothon 1.0",
		image: "/assets/pastEvent/Duothan1.jpg",
		description:
			"Duothan 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting to the COVID-19 pandemic, we organized it as a fully virtual event. But even with the challenges, the energy and enthusiasm were unreal.",
	},
	{
		key: 2,
		title: "Duothon 2.0",
		image: "/assets/pastEvent/duathon2.png",
		description:
			"By 2022, we were finally able to bring Duothan to life on campus, and it was such an exciting shift. After having our very first edition virtually, Duothan 2.0 took place physically at NSBM, following all the health and safety guidelines from local authorities.",
	},
	{
		key: 3,
		title: "Duothon 3.0",
		image: "/assets/pastEvent/duathon3.png",
		description:
			"Duothan 3.0 was successfully held as a physical event in the year 2023, and it is also open for all the universities. Duothan 3.0 was arranged as a Buildathon. Participants had to rebuild a half-built application according to the given guidelines. They could use any programming language they prefer.",
	},
	{
		key: 4,
		title: "Duothon 4.0",
		image: "/assets/pastEvent/duathon4.png",
		description:
			"Duothan 4.0, organized by the IEEE Student Branch of NSBM, was successfully held as an exciting and competitive buildathon that brought together undergraduates from across Sri Lanka.",
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
		<div className="h-full px-0 flex flex-col items-center w-full max-w-[1070px] my-20 mx-auto">
			<div className="w-full max-w-7xl flex justify-center">
				<Carousel
					opts={{
						loop: true,
						align: "center",
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
					<CarouselContent
						className={`${viewportSize === "sm" ? "mx-auto" : "ml-0"}`}
					>
						{events.map((event) => (
							<CarouselItem
								key={event.key}
								className={`${
									viewportSize === "sm"
										? "basis-full px-0 flex justify-center"
										: viewportSize === "md"
											? "basis-1/2 pl-0"
											: "basis-1/3 pl-0"
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

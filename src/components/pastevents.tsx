"use client";
import localFont from "next/font/local";
import React, { useState } from "react";
import Card from "./ui/eventcard";

const readyplayerone = localFont({ src: "../../public/font.otf" });

const events = [
	{
		key: 1,
		title: "Duothon 1.0",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
	{
		key: 2,
		title: "Duothon 2.0",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
	{
		key: 3,
		title: "Duothon 3.0",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
	{
		key: 4,
		title: "Duothon 4.0",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
];

export default function PastEvents() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	const [cardsToShow, setCardsToShow] = useState(1);

	React.useEffect(() => {
		const handleResize = () => {
			setCardsToShow(window.innerWidth >= 768 ? 3 : 1);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handlePrevious = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prev) => {
			const newIndex = prev > 0 ? prev - 1 : events.length - cardsToShow;
			setTimeout(() => setIsAnimating(false), 500);
			return newIndex;
		});
	};

	const handleNext = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prev) => {
			const newIndex = prev < events.length - cardsToShow ? prev + 1 : 0;
			setTimeout(() => setIsAnimating(false), 500);
			return newIndex;
		});
	};

	const translateValue =
		cardsToShow === 1 ? `-${currentIndex * 100}%` : `-${currentIndex * 33.33}%`;

	return (
		<div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 py-16">
			<p
				className={`text-3xl md:text-4xl text-center text-[#a2ebff] mb-8 pt-20 lg:pt-0 ${readyplayerone.className}`}
			>
				OUR PAST EVENTS
			</p>

			<div className="w-full max-w-7xl relative">
				<button
					type="button"
					onClick={handlePrevious}
					disabled={isAnimating}
					className="absolute left-3 lg:-left-2 md:-left-9 top-1/2 -translate-y-1/2 z-20 text-[#ed00da] disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label="Previous event"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<title>Previous Event Arrow</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				<div className="overflow-hidden relative">
					<div
						className="flex transition-transform ease-in-out duration-500"
						style={{ transform: `translateX(${translateValue})` }}
					>
						{events.map((event) => (
							<div
								key={event.key}
								className={`${cardsToShow === 1 ? "w-full" : "w-full md:w-1/3"} flex-shrink-0 px-3 flex justify-center`}
							>
								<div className="py-4 px-2 mb-6">
									<Card title={event.title} description={event.description} />
								</div>
							</div>
						))}
					</div>
				</div>

				<button
					type="button"
					onClick={handleNext}
					disabled={isAnimating}
					className="absolute right-2 lg:-right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 text-[#ed00da] disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label="Next event"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<title>Next Event Arrow</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

"use client";

import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

const readyplayerone = localFont({
	src: "../../../public/font.otf",
	display: "swap",
});

interface Sponsor {
	id: number;
	img: string;
	url?: string;
	altText?: string;
}

const SPONSORS_GROUP_1: Sponsor[] = [
	{
		id: 1,
		img: "/SpLogo/sponsors1.svg",
		url: "https://sponsor1.com",
		altText: "Sponsor 1",
	},
	{
		id: 2,
		img: "/SpLogo/sponsors2.svg",
		url: "https://sponsor2.com",
		altText: "Sponsor 2",
	},
	{
		id: 3,
		img: "/SpLogo/sponsors3.svg",
		url: "https://sponsor3.com",
		altText: "Sponsor 3",
	},
	{
		id: 4,
		img: "/SpLogo/sponsors4.svg",
		url: "https://sponsor4.com",
		altText: "Sponsor 4",
	},
];

const SPONSORS_GROUP_2: Sponsor[] = [
	{
		id: 5,
		img: "/SpLogo/sponsors5.svg",
		url: "https://sponsor5.com",
		altText: "Sponsor 5",
	},
	{
		id: 6,
		img: "/SpLogo/sponsors6.svg",
		url: "https://sponsor6.com",
		altText: "Sponsor 6",
	},
	{
		id: 7,
		img: "/SpLogo/sponsors7.svg",
		url: "https://sponsor7.com",
		altText: "Sponsor 7",
	},
	{
		id: 8,
		img: "/SpLogo/sponsors8.svg",
		url: "https://sponsor8.com",
		altText: "Sponsor 8",
	},
];

type ViewportSize = "small-mobile" | "mobile" | "tablet" | "desktop";

interface SponsorCardProps {
	img: string;
	url?: string;
	altText?: string;
	viewportSize: ViewportSize;
}

const CARD_SIZES: Record<
	ViewportSize,
	{
		width: number;
		height: number;
		padding: string;
		imageMaxWidth: number;
		imageMaxHeight: number;
		bgSize: string;
	}
> = {
	"small-mobile": {
		width: 140,
		height: 70,
		padding: "p-1",
		imageMaxWidth: 120,
		imageMaxHeight: 50,
		bgSize: "contain",
	},
	mobile: {
		width: 160,
		height: 80,
		padding: "p-2",
		imageMaxWidth: 140,
		imageMaxHeight: 60,
		bgSize: "contain",
	},
	tablet: {
		width: 200,
		height: 100,
		padding: "p-3",
		imageMaxWidth: 180,
		imageMaxHeight: 80,
		bgSize: "contain",
	},
	desktop: {
		width: 240,
		height: 120,
		padding: "p-4",
		imageMaxWidth: 220,
		imageMaxHeight: 100,
		bgSize: "contain",
	},
};

const SponsorCard = React.memo(
	({ img, url, altText = "Sponsor logo", viewportSize }: SponsorCardProps) => {
		const { width, height, padding, imageMaxWidth, imageMaxHeight, bgSize } =
			CARD_SIZES[viewportSize];

		const cardContent = (
			<div
				className="relative mx-auto transition-all duration-300 hover:scale-105 flex items-center justify-center"
				style={{
					width: `${width}px`,
					height: `${height}px`,
				}}
			>
				<div
					className="absolute inset-0 bg-no-repeat bg-center"
					style={{
						backgroundImage: "url('/sponsors.svg')",
						backgroundSize: bgSize,
					}}
					aria-hidden="true"
				/>
				<div className="relative z-10 w-full h-full flex items-center justify-center">
					<div
						className={`w-full h-full flex items-center justify-center ${padding}`}
					>
						<div
							style={{
								maxWidth: `${imageMaxWidth}px`,
								maxHeight: `${imageMaxHeight}px`,
								width: "50%",
								height: "50%",
								position: "relative",
							}}
						>
							<Image
								src={img}
								alt={altText || "Sponsor logo"}
								fill
								className="object-contain"
								sizes={`(max-width: 380px) ${imageMaxWidth}px, 
                       (max-width: 768px) ${imageMaxWidth}px,
                       ${imageMaxWidth}px`}
								priority={false}
								loading="lazy"
							/>
						</div>
					</div>
				</div>
			</div>
		);

		return url ? (
			<Link
				href={url}
				target="_blank"
				rel="noopener noreferrer nofollow"
				className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a2ebff] focus-visible:ring-offset-2 rounded-md"
				aria-label={
					altText ? `Visit ${altText} website` : "Visit sponsor website"
				}
			>
				{cardContent}
			</Link>
		) : (
			cardContent
		);
	},
);

SponsorCard.displayName = "SponsorCard";

interface CarouselWithProgressProps {
	sponsors: Sponsor[];
	delay: number;
	viewportSize: ViewportSize;
}

const CarouselWithProgress = React.memo(
	({ sponsors, delay, viewportSize }: CarouselWithProgressProps) => {
		const [api, setApi] = useState<CarouselApi>();
		const [current, setCurrent] = useState(0);
		const [count, setCount] = useState(0);

		const calculateSegmentProgress = useCallback(
			(current: number, segmentIndex: number, total: number) => {
				const segmentSize = Math.ceil(total / 3);
				const segmentStart = segmentIndex * segmentSize;
				const segmentEnd = (segmentIndex + 1) * segmentSize;

				if (current < segmentStart) return 0;
				if (current >= segmentEnd) return 100;

				return ((current - segmentStart + 1) / segmentSize) * 100;
			},
			[],
		);

		useEffect(() => {
			if (!api) return;

			setCount(api.scrollSnapList().length);
			setCurrent(api.selectedScrollSnap());

			const onSelect = () => {
				setCurrent(api.selectedScrollSnap());
			};

			api.on("select", onSelect);
			return () => {
				api.off("select", onSelect);
			};
		}, [api]);

		const segmentIds = ["segment-1", "segment-2", "segment-3"];

		return (
			<div className="w-full">
				<Carousel
					setApi={setApi}
					plugins={[
						Autoplay({
							delay: delay * 1000,
							stopOnMouseEnter: true,
							stopOnInteraction: false,
						}),
					]}
					opts={{
						loop: true,
						align: "start",
						slidesToScroll:
							viewportSize === "small-mobile"
								? 1
								: viewportSize === "mobile"
									? 2
									: 1,
					}}
					className="w-full relative"
				>
					<CarouselContent className="-ml-1">
						{sponsors.map((sponsor) => (
							<CarouselItem
								key={`sponsor-${sponsor.id}`}
								className={
									viewportSize === "small-mobile"
										? "basis-full pl-1"
										: viewportSize === "mobile"
											? "basis-1/2 pl-1"
											: viewportSize === "tablet"
												? "basis-1/3"
												: "basis-full"
								}
							>
								<div className="p-1 flex justify-center">
									<SponsorCard
										img={sponsor.img}
										url={sponsor.url}
										altText={sponsor.altText}
										viewportSize={viewportSize}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					{viewportSize !== "desktop" && (
						<div className="mt-4 flex justify-center gap-1 px-4">
							{segmentIds.map((segmentId, index) => {
								const segmentSize = Math.ceil(count / 3);
								const isActive =
									current >= index * segmentSize &&
									current < (index + 1) * segmentSize;
								const progress = calculateSegmentProgress(
									current,
									index,
									count,
								);

								return (
									<div
										key={segmentId}
										className={`h-[4px] rounded-full ${
											viewportSize === "small-mobile"
												? "w-4"
												: viewportSize === "mobile"
													? "w-6"
													: "w-12"
										} relative`}
										style={{
											backgroundColor: isActive
												? "rgba(162, 235, 255, 0.3)"
												: "rgba(209, 213, 219, 0.3)",
										}}
										aria-hidden="true"
									>
										<div
											className={`absolute top-0 left-0 h-full rounded-full ${
												isActive ? "bg-[#a2ebff]" : "bg-gray-200 opacity-30"
											}`}
											style={{
												width: `${progress}%`,
												transition: "width 0.4s ease",
											}}
										/>
									</div>
								);
							})}
						</div>
					)}
				</Carousel>
			</div>
		);
	},
);

CarouselWithProgress.displayName = "CarouselWithProgress";

const Sponsors = () => {
	const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
	const [isClient, setIsClient] = useState(false);

	const checkScreenSize = useCallback(() => {
		const width = window.innerWidth;
		if (width < 380) {
			setViewportSize("small-mobile");
		} else if (width < 768) {
			setViewportSize("mobile");
		} else if (width >= 768 && width < 1024) {
			setViewportSize("tablet");
		} else {
			setViewportSize("desktop");
		}
	}, []);

	useEffect(() => {
		setIsClient(true);
		checkScreenSize();
		const resizeListener = () => checkScreenSize();
		window.addEventListener("resize", resizeListener);
		return () => {
			window.removeEventListener("resize", resizeListener);
		};
	}, [checkScreenSize]);

	const renderSponsors = useCallback(
		(sponsors: Sponsor[], isFirstRow: boolean) => {
			if (!isClient) {
				return <div className="h-[120px] w-full" />;
			}

			if (viewportSize === "desktop") {
				return (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-6xl">
						{sponsors.map((sponsor) => (
							<div
								key={`desktop-sponsor-${sponsor.id}`}
								className="flex justify-center"
							>
								<SponsorCard
									img={sponsor.img}
									url={sponsor.url}
									altText={sponsor.altText}
									viewportSize={viewportSize}
								/>
							</div>
						))}
					</div>
				);
			}

			return (
				<div className="px-4">
					<CarouselWithProgress
						sponsors={sponsors}
						delay={isFirstRow ? 3.5 : 3}
						viewportSize={viewportSize}
					/>
				</div>
			);
		},
		[isClient, viewportSize],
	);

	return (
		<section className="py-6 sm:py-8 md:py-12 px-4 w-full max-w-7xl mx-auto">
			<h2
				className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-[#a2ebff] mb-6 sm:mb-8 md:mb-12 ${readyplayerone.className}`}
			>
				OUR SPONSORS
			</h2>

			<div className="mb-8 sm:mb-12 md:mb-16">
				<h3
					className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-center text-[#e957dd] mb-4 sm:mb-6 md:mb-8 ${readyplayerone.className}`}
				>
					TITLE SPONSORS
				</h3>
				{renderSponsors(SPONSORS_GROUP_1, true)}
			</div>

			<div>
				<h3
					className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-center text-[#e957dd] mb-4 sm:mb-6 md:mb-8 ${readyplayerone.className}`}
				>
					ASSOCIATE SPONSORS
				</h3>
				{renderSponsors(SPONSORS_GROUP_2, false)}
			</div>
		</section>
	);
};

Sponsors.displayName = "Sponsors";

export default Sponsors;

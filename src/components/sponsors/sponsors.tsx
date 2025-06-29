"use client";

import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { getImagePath } from "@/lib/imagePath";
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
	width?: number;
	height?: number;
	altText?: string;
	customSize?: {
		width?: number;
		height?: number;
		maxWidth?: number;
		maxHeight?: number;
	};
}

const SPONSORS_GROUP_1: Sponsor[] = [
	{
		id: 1,
		img: getImagePath("/assets/sponsor/NSBM-LOGO.png"),
		url: "https://sponsor1.com",
		width: 100,
		height: 100,
		altText: "Sponsor 1",
		customSize: {
			width: 70,
			height: 70,
			maxWidth: 140,
			maxHeight: 100,
		},
	},
	/* {
		id: 2,
		img: getImagePath("/SpLogo/sponsors2.svg"),
		url: "https://sponsor2.com",
		altText: "Sponsor 2",
	}, */
	// {
	// 	id: 3,
	// 	img: getImagePath("/SpLogo/sponsors3.svg"),
	// 	url: "https://sponsor3.com",
	// 	altText: "Sponsor 3",
	// },
	// {
	// 	id: 4,
	// 	img: getImagePath("/SpLogo/sponsors4.svg"),
	// 	url: "https://sponsor4.com",
	// 	altText: "Sponsor 4",
	// },
];

const SPONSORS_GROUP_2: Sponsor[] = [
	{
		id: 5,
		img: getImagePath("assets/sponsor/Logo Official.png"),
		url: "https://sponsor5.com",
		altText: "Sponsor 5",
		customSize: {
			width: 80, // Make this one a bit wider
			height: 60,
			maxWidth: 160,
			maxHeight: 90,
		},
	},
	{
		id: 6,
		img: getImagePath("assets/sponsor/ogoLogo.jpg"),
		url: "https://sponsor6.com",
		altText: "Sponsor 6",
		customSize: {
			width: 65,
			height: 65,
			maxWidth: 130,
			maxHeight: 130,
		},
	},
	// {
	// 	id: 7,
	// 	img: getImagePath("/SpLogo/sponsors7.svg"),
	// 	url: "https://sponsor7.com",
	// 	altText: "Sponsor 7",
	// },
	// {
	// 	id: 8,
	// 	img: getImagePath("/SpLogo/sponsors8.svg"),
	// 	url: "https://sponsor8.com",
	// 	altText: "Sponsor 8",
	// },
];

const SPONSORS_GROUP_3: Sponsor[] = [
	{
		id: 5,
		img: getImagePath("assets/sponsor/INTERNATIONAL HORIZONTAL CMYK.png"),
		url: "https://sponsor5.com",
		altText: "Sponsor 5",
		customSize: {
			width: 90, // This one needs to be wide for horizontal logo
			height: 50,
			maxWidth: 180,
			maxHeight: 80,
		},
	},
	{
		id: 6,
		img: getImagePath("/SpLogo/sponsors6.svg"),
		url: "https://sponsor6.com",
		altText: "Sponsor 6",
		customSize: {
			width: 60,
			height: 60,
			maxWidth: 120,
			maxHeight: 120,
		},
	},
	// {
	// 	id: 7,
	// 	img: getImagePath("/SpLogo/sponsors7.svg"),
	// 	url: "https://sponsor7.com",
	// 	altText: "Sponsor 7",
	// },
	// {
	// 	id: 8,
	// 	img: getImagePath("/SpLogo/sponsors8.svg"),
	// 	url: "https://sponsor8.com",
	// 	altText: "Sponsor 8",
	// },
];

type ViewportSize = "small-mobile" | "mobile" | "tablet" | "desktop";

interface SponsorCardProps {
	img: string;
	url?: string;
	altText?: string;
	viewportSize: ViewportSize;
	cardSizeMultiplier?: number;
	customSize?: {
		width?: number;
		height?: number;
		maxWidth?: number;
		maxHeight?: number;
	};
}

const BASE_CARD_SIZES: Record<
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
		width: 112,
		height: 56,
		padding: "p-1",
		imageMaxWidth: 96,
		imageMaxHeight: 40,
		bgSize: "contain",
	},
	mobile: {
		width: 128,
		height: 64,
		padding: "p-2",
		imageMaxWidth: 112,
		imageMaxHeight: 48,
		bgSize: "contain",
	},
	tablet: {
		width: 160,
		height: 80,
		padding: "p-3",
		imageMaxWidth: 144,
		imageMaxHeight: 64,
		bgSize: "contain",
	},
	desktop: {
		width: 192,
		height: 96,
		padding: "p-4",
		imageMaxWidth: 176,
		imageMaxHeight: 80,
		bgSize: "contain",
	},
};

const getAdjustedCardSizes = (viewportSize: ViewportSize, multiplier = 1) => {
	const baseSize = BASE_CARD_SIZES[viewportSize];
	return {
		width: baseSize.width * multiplier,
		height: baseSize.height * multiplier,
		padding: baseSize.padding,
		imageMaxWidth: baseSize.imageMaxWidth * multiplier,
		imageMaxHeight: baseSize.imageMaxHeight * multiplier,
		bgSize: baseSize.bgSize,
	};
};

const SponsorCard = React.memo(
	({
		img,
		url,
		altText = "Sponsor logo",
		viewportSize,
		cardSizeMultiplier = 1,
		customSize,
	}: SponsorCardProps) => {
		const { width, height, padding, imageMaxWidth, imageMaxHeight, bgSize } =
			getAdjustedCardSizes(viewportSize, cardSizeMultiplier);

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
						backgroundImage: `url(${getImagePath("/sponsors.svg")})`,
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
								maxWidth: customSize?.maxWidth
									? `${customSize.maxWidth}px`
									: `${imageMaxWidth}px`,
								maxHeight: customSize?.maxHeight
									? `${customSize.maxHeight}px`
									: `${imageMaxHeight}px`,
								width: customSize?.width ? `${customSize.width}%` : "50%",
								height: customSize?.height ? `${customSize.height}%` : "50%",
								position: "relative",
							}}
						>
							<Image
								src={img}
								alt={altText || "Sponsor logo"}
								fill
								className="object-cover"
								sizes={`(max-width: 380px) ${customSize?.maxWidth || imageMaxWidth}px, 
                       (max-width: 768px) ${customSize?.maxWidth || imageMaxWidth}px,
                       ${customSize?.maxWidth || imageMaxWidth}px`}
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
				const segmentSize = Math.ceil(total / 2);
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

		const segmentIds = ["segment-1", "segment-2"];

		const getCardSizeMultiplier = () => {
			if (viewportSize === "desktop") {
				if (sponsors.length === 2) return 1.5;
				if (sponsors.length === 3) return 1.2;
			} else if (viewportSize === "tablet") {
				if (sponsors.length === 2) return 1.3;
			}
			return 1;
		};

		const shouldAutoplay = !(viewportSize === "mobile" && sponsors.length <= 2);

		const shouldShowProgress =
			viewportSize !== "desktop" &&
			sponsors.length > 2 &&
			!(viewportSize === "tablet" && sponsors.length === 3);

		return (
			<div className="w-full">
				<Carousel
					setApi={setApi}
					plugins={[
						Autoplay({
							delay: delay * 1000,
							stopOnMouseEnter: true,
							stopOnInteraction: false,
							playOnInit: shouldAutoplay,
						}),
					]}
					opts={{
						loop: true,
						align: "start",
						slidesToScroll:
							viewportSize === "small-mobile"
								? 1
								: viewportSize === "mobile"
									? sponsors.length <= 2
										? 1
										: 2
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
											? sponsors.length <= 2
												? "basis-1/2 pl-1"
												: "basis-1/2 pl-1"
											: viewportSize === "tablet"
												? sponsors.length <= 2
													? "basis-1/2 pl-1"
													: "basis-1/3"
												: "basis-full"
								}
							>
								<div className="p-1 flex justify-center">
									<SponsorCard
										img={sponsor.img}
										url={sponsor.url}
										altText={sponsor.altText}
										viewportSize={viewportSize}
										cardSizeMultiplier={getCardSizeMultiplier()}
										customSize={sponsor.customSize}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>

					{shouldShowProgress && (
						<div className="mt-4 flex justify-center gap-1 px-4">
							{segmentIds.map((segmentId, index) => {
								const segmentSize = Math.ceil(count / 2);
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
					<div
						className={`grid ${
							sponsors.length === 2
								? "grid-cols-2"
								: sponsors.length === 3
									? "grid-cols-3"
									: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
						} gap-4 mx-auto max-w-6xl`}
					>
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
									customSize={sponsor.customSize}
									cardSizeMultiplier={
										sponsors.length === 2
											? 1.5
											: sponsors.length === 3
												? 1.2
												: 1
									}
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
		<section className="py-6 sm:py-8 md:py-20 px-4 w-full max-w-7xl mx-auto">
			{/* <div className="mb-4 sm:mb-8 md:mb-12"> */}
			<div>
				<h3
					className={`text-lg sm:text-lg md:text-xl lg:text-2xl text-center text-[#e957dd] mb-4 sm:mb-2 md:mb-4 ${readyplayerone.className}`}
				>
					TITLE SPONSORS
				</h3>
				{renderSponsors(SPONSORS_GROUP_1, true)}
			</div>

			<div>
				<h3
					className={`text-lg sm:text-lg md:text-xl lg:text-2xl text-center text-[#e957dd] mb-4 sm:mb-2 md:mb-4 ${readyplayerone.className}`}
				>
					BRONZE PARTNER
				</h3>
				{renderSponsors(SPONSORS_GROUP_2, true)}
			</div>

			<div>
				<h3
					className={`text-lg sm:text-lg md:text-xl lg:text-2xl text-center text-[#e957dd] mb-4 sm:mb-2 md:mb-4 ${readyplayerone.className}`}
				>
					BEVERAGES PARTNER
				</h3>
				{renderSponsors(SPONSORS_GROUP_3, true)}
			</div>
			{/* <div className="text-center text-xs text-gray-400 mt-2">
				Subaru Company is our official knowledge partner
			</div> */}
		</section>
	);
};

Sponsors.displayName = "Sponsors";

export default Sponsors;

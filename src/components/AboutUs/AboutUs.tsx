"use client";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

export default function AboutUs() {
	const [api, setApi] = useState<CarouselApi>();
	const [isMobile, setIsMobile] = useState(false);
	const [current, setCurrent] = useState(0);

	// Update current index when carousel slides
	useEffect(() => {
		if (!api) return;

		const onSelect = () => {
			setCurrent(api.selectedScrollSnap());
		};

		api.on("select", onSelect);
		// Call once to set initial slide
		setCurrent(api.selectedScrollSnap());

		return () => {
			api.off("select", onSelect);
		};
	}, [api]);

	// Detect screen size
	useEffect(() => {
		const checkScreenSize = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const aboutSections = [
		{
			id: 1,
			title: "IEEE STUDENT BRANCH OF NSBM",
			content:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
		},
		{
			id: 2,
			title: "DUOTHON",
			content:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
		},
	];

	return (
		<div className="px-4 lg:px-0  flex flex-col  relative w-full max-w-[1170px] mx-auto">
			<div className="z-10 flex flex-col items-center justify-center w-full  py-12">
				{isMobile ? (
					// Mobile view with carousel
					<Carousel
						opts={{
							loop: true,
							align: "start",
							containScroll: "trimSnaps",
						}}
						plugins={[
							Autoplay({
								delay: 5000,
								stopOnMouseEnter: true,
								stopOnInteraction: false,
							}),
						]}
						className="w-full relative flex flex-col h-full"
						setApi={setApi}
					>
						<CarouselContent className="ml-0 flex-grow flex items-center">
							{aboutSections.map((section) => (
								<CarouselItem
									key={section.id}
									className="pl-0 flex items-center justify-center h-full"
								>
									<div className="flex flex-col items-center justify-center w-full mx-auto">
										<p className="text-m md:text-xl text-center text-[#e957dd]">
											{section.title}
										</p>
										<p className="text-sm md:text-m text-white text-center w-full pt-3 px-5 md:px-20">
											{section.content}
										</p>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className="flex justify-center mt-4 gap-2">
							{aboutSections.map((section, index) => (
								<button
									type="button"
									key={section.id}
									onClick={() => api?.scrollTo(index)}
									className={`w-2 h-2 rounded-full transition-all ${
										current === index
											? "bg-[#e957dd] scale-125"
											: "bg-gray-400 opacity-70"
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</Carousel>
				) : (
					// Desktop view without carousel
					<>
						<div className="flex flex-col items-center justify-center w-full pt-6 md:pt-9">
							<p className="text-xl md:text-xl text-center text-[#e957dd]">
								IEEE STUDENT BRANCH OF NSBM
							</p>
							<p className="text-base md:text-m text-white text-center w-full pt-3 px-5 md:px-20">
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry&#39;s standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages
							</p>
						</div>

						<div className="flex flex-col items-center justify-center pt-5 md:pt-8 max-w-7xl">
							<p className="text-l md:text-2xl text-[#e957dd]">DUOTHON</p>
							<p className="text-base md:text-m text-white text-center w-full pt-3 px-5 md:px-20">
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry&#39;s standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

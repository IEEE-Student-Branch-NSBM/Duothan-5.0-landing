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
				"The IEEE Student Branch of NSBM Green University was established in 2015 to foster undergraduate and graduate student interest in electrical and computing specializations. We are handling IEEE service events in and out of thecampus, coordinating and facilitating opportunities to meet corporate representatives, and establishing relationships with other student branches in Sri Lanka and all over the entire globe.",
		},
		{
			id: 2,
			title: "DUOTHON 5.0",
			content:
				"After four successful editions, we're back and bigger, bolder, and more inspiring than ever,The IEEE Student Branch of NSBM, in collaboration with the IEEE Computer Society of NSBM and the IEEE Women in Engineering Affinity Group of NSBM, proudly presents Duothan 5.0, a national-level hackathon designed to challenge and empower undergraduates from across Sri Lanka.",
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
						<div className="flex justify-center mt-4 gap-2 md:gap-4 items-center">
							{aboutSections.map((section, index) => (
								<button
									type="button"
									key={section.id}
									onClick={() => api?.scrollTo(index)}
									className={`w-8 sm:w-10 lg:w-12 h-[5px] rounded-[5px] transition-all duration-300 ${
										current === index
											? "bg-[#A2EBFF]"
											: "bg-[#A2EBFF] opacity-30"
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</Carousel>
				) : (
					// Desktop view without carousel
					<>
						<div className="flex flex-col items-center justify-center w-full pt-6">
							<p className="text-xl md:text-3xl text-center text-[#e957dd]">
								IEEE STUDENT BRANCH OF NSBM
							</p>
							<p className="text-base md:text-lg text-white text-center w-full pt-3 px-5 md:px-20">
								The IEEE Student Branch of NSBM Green University was established
								in 2015 to foster undergraduate and graduate student interest in
								electrical and computing specializations. We are handling IEEE
								service events in and out of thecampus, coordinating and
								facilitating opportunities to meet corporate representatives,
								and establishing relationships with other student branches in
								Sri Lanka and all over the entire globe.
							</p>
						</div>

						<div className="flex flex-col items-center justify-center pt-5 md:pt-8 max-w-7xl">
							<p className="text-l md:text-3xl text-[#e957dd]">DUOTHON</p>
							<p className="text-base md:text-lg text-white text-center w-full pt-3 px-5 md:px-20">
								After four successful editions, we're back and bigger, bolder,
								and more inspiring than ever,The IEEE Student Branch of NSBM, in
								collaboration with the IEEE Computer Society of NSBM and the
								IEEE Women in Engineering Affinity Group of NSBM, proudly
								presents Duothan 5.0, a national-level hackathon designed to
								challenge and empower undergraduates from across Sri Lanka.
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

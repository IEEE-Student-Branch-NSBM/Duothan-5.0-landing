// components/ContactUs.tsx
"use client";

import ContactCard from "@/components/contactus/contactcard";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import type React from "react";
import { useEffect, useState } from "react";

const contactData = [
	{
		id: 1,
		name: "GEETH INDUWARA",
		title: "Chairperson",
		image: "",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "email@gmail.com",
	},
	{
		id: 2,
		name: "JAYASANKA ARIYARATHNE",
		title: "Vice Chairperson",
		image: "",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "email@gmail.com",
	},
	{
		id: 3,
		name: "PASANDI SAMARASINGHE",
		title: "Secretary",
		image: "",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "email@gmail.com",
	},
	{
		id: 4,
		name: "SITHUM SANKAJITH",
		title: "Treasurer",
		image: "",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "email@gmail.com",
	},
	{
		id: 5,
		name: "KUMUDITHA RANASINGHE",
		title: "Chairperson",
		image: "",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "email@gmail.com",
	},
	{
		id: 6,
		name: "RAVINDU RAJAPAKSHA",
		title: "Chairperson",
		image: "",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "email@gmail.com",
	},
];

const ContactUs: React.FC = () => {
	const [current, setCurrent] = useState(0);
	const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
	const totalSlides = contactData.length;
	const groupSize = 3; // Number of cards per group for pagination dots
	const totalGroups = Math.ceil(totalSlides / groupSize);

	// Listen for slide changes via carousel API
	useEffect(() => {
		if (!carouselApi) return;

		const handleSlideChange = () => {
			setCurrent(carouselApi.selectedScrollSnap());
		};

		carouselApi.on("select", handleSlideChange);
		// Set initial slide index
		setCurrent(carouselApi.selectedScrollSnap());

		return () => {
			carouselApi.off("select", handleSlideChange);
		};
	}, [carouselApi]);

	return (
		<div className="relative min-h-screen w-full py-6 sm:py-8 lg:py-0">
			<div className="relative w-full min-h-screen flex items-center overflow-hidden">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 lg:gap-12">
						{/* Left column */}
						<div className="w-full lg:w-2/5 xl:w-1/3">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-10 text-[#A2EBFF] font-[Electrolize]">
								CONTACT US
							</h2>
							<p className="text-white mb-6 sm:mb-8 lg:mb-10 font-[Electrolize] text-base sm:text-lg lg:text-xl xl:text-[22px] leading-relaxed">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
								pellentesque, neque ut tempor vulputate, nisi purus varius elit,
								nec molestie tellus nulla non eros. Vivamus venenatis, nisi id
								accumsa
							</p>
						</div>

						{/* Right column */}
						<div className="w-full lg:w-3/5">
							<div className="relative">
								<Carousel
									opts={{
										align: "start",
										loop: true,
									}}
									className="w-full"
									setApi={setCarouselApi}
								>
									<CarouselContent>
										{contactData.map((contact) => (
											<CarouselItem
												key={contact.id}
												className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-full xl:basis-1/2"
											>
												<div className="p-2 sm:p-3 lg:pl-32 xl:p-5">
													<ContactCard
														name={contact.name}
														title={contact.title}
														image={contact.image}
														linkedin={contact.linkedin}
														phone={contact.phone}
														email={contact.email}
													/>
												</div>
											</CarouselItem>
										))}
									</CarouselContent>
								</Carousel>

								{/* Navigation controls */}
								<div className="relative flex items-center justify-center mt-4 sm:mt-6 lg:mt-8 space-x-4">
									<button
										type="button"
										className="text-[#A2EBFF] hover:text-[#A2EBFF] transition-colors center"
										onClick={() => carouselApi?.scrollPrev()}
									>
										<svg
											width="32"
											height="32"
											className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
											viewBox="0 0 24 24"
											fill="none"
										>
											<title>Previous Slide</title>
											<path
												d="M15 18l-6-6 6-6"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>

									{/* Pagination indicators */}
									<div className="mx-2 sm:mx-4 lg:mx-16">
										<div className="flex space-x-2 items-center">
											{Array.from({ length: totalGroups }).map(
												(_, dotIndex) => {
													const activeGroup = Math.floor(current / groupSize);
													const isActive = dotIndex === activeGroup;

													return (
														<div
															key={dotIndex * groupSize}
															className={`h-1 rounded-full transition-all duration-300 ${
																isActive
																	? "w-6 sm:w-8 lg:w-10 bg-[#A2EBFF]"
																	: "w-3 sm:w-4 lg:w-6 bg-[#A2EBFF] opacity-50"
															}`}
														/>
													);
												},
											)}
										</div>
									</div>

									<button
										type="button"
										className="text-[#A2EBFF] hover:text-[#A2EBFF] transition-colors p-2"
										onClick={() => carouselApi?.scrollNext()}
									>
										<svg
											width="32"
											height="32"
											className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
											viewBox="0 0 24 24"
											fill="none"
										>
											<title>Next Slide</title>
											<path
												d="M9 18l6-6-6-6"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;

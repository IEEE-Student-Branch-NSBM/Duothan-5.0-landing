// components/ContactUs.tsx
"use client";
import ContactCard from "@/components/contactus/contactcard";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import localFont from "next/font/local";
import type React from "react";
import { useEffect, useState } from "react";

const readyplayerone = localFont({
	src: "../../fonts/font.otf",
});

const contactData = [
	{
		id: 1,
		name: "Kumuditha Ranasinghe",
		title: "‘Chairperson - Duothan 5.0",
		image: "/profile.png",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "kumuditharanasinghe@ieee.org",
	},
	{
		id: 2,
		name: "Ravindu Rajapaksha",
		title: "Chairperson - Duothan 5.0",
		image: "/profile.png",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "ravindurajapaksha@ieee.org",
	},
	{
		id: 3,
		name: "Ravindu Rajapaksha",
		title: "Chairperson - Duothan 5.0",
		image: "/profile.png",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "ravindurajapaksha@ieee.org",
	},
	{
		id: 4,
		name: "Kumuditha Ranasinghe",
		title: "Chairperson - Duothan 5.0",
		image: "/profile.png",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "kumuditharanasinghe@ieee.org",
	},
	{
		id: 5,
		name: "Ravindu Rajapaksha",
		title: "Chairperson - Duothan 5.0",
		image: "/profile.png",
		linkedin: "https://www.linkedin.com/in/-123456789/",
		phone: "+94123456789",
		email: "ravindurajapaksha@ieee.org",
	},
];

const ContactUs: React.FC = () => {
	const [current, setCurrent] = useState(0);
	const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
	const totalSlides = contactData.length;
	const groupSize = 2; // Number of cards per group for pagination dots
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
		<div className="scale-80 relative bg-transparent px-4 lg:px-0 h-full flex items-center w-full max-w-[1170px] mx-auto">
			<div className="relative w-full max-h-screen  overflow-hidden">
				<div className="flex flex-col lg:flex-row  justify-between ">
					{/* Left column */}
					<div className="w-full lg:w-2/5 xl:w-1/3">
						<h2
							className={`text-3xl py-4 md:text-4xl leading-[100%] text-center lg:text-left tracking-[0.03em] font-normal mb-4 sm:mb-6 lg:mb-10 text-[#A2EBFF] ${readyplayerone.className}`}
						>
							CONTACT US
						</h2>

						<p className="text-white mb-6 sm:mb-8 lg:mb-10 font-[Electrolize] text-base sm:text-lg lg:text-xl xl:text-[22px] leading-relaxed text-center lg:text-left">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							pellentesque, neque ut tempor vulputate, nisi purus varius elit,
							nec molestie tellus nulla non eros. Vivamus venenatis, nisi id
							accumsa
						</p>
					</div>

					{/* Right column */}
					<div className="w-full py-4 sm:text-center lg:w-3/5">
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
											className="basis-full  md:basis-1/2 "
										>
											<div className="flex justify-center ">
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
							<div className="px-6 md:px-0 relative flex items-center justify-center mt-4 sm:mt-4 lg:mt-1 space-x-4">
								<button
									type="button"
									className="text-[#A2EBFF] hover:text-[#A2EBFF] transition-colors p-2"
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
								<div className="w-full ">
									<div className="flex space-x-2 md:space-x-4 items-center justify-center">
										{Array.from({ length: totalGroups }).map((_, dotIndex) => {
											const activeGroup = Math.floor(current / groupSize);
											const isActive = dotIndex === activeGroup;

											return (
												<div
													key={dotIndex * groupSize}
													className={`w-[44px] h-[5px] rounded-[5px] items-center transition-all duration-300 ${
														isActive
															? "w-8 sm:w-10 lg:w-12 bg-[#A2EBFF]"
															: "w-8 sm:w-10 lg:w-12 bg-[#A2EBFF] opacity-30"
													}`}
												/>
											);
										})}
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
	);
};

export default ContactUs;

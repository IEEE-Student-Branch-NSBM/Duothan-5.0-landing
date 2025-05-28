// components/ContactUs.tsx
"use client";
import ContactCard from "@/components/contactus/contactcard";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { getImagePath } from "@/lib/imagePath";
import localFont from "next/font/local";
import type React from "react";
import { useEffect, useState } from "react";

const readyplayerone = localFont({
	src: "../../fonts/font.otf",
});

const contactData = [
	{
		id: 1,
		name: "Geeth Induwara",
		title: "Chairperson - IEEE Student Branch of NSBM",
		image: getImagePath("/profile.png"),
		linkedin:
			"https://www.linkedin.com/in/geethinduwara?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BwO7F30K2T7mnrm9MWYV9Pg%3D%3D",
		phone: "+94773623718",
		email: "geethinduwara@ieee.org",
	},
	{
		id: 2,
		name: "Jayasanka Ariyaratne",
		title: "Vice Chairperson - IEEE Student Branch of NSBM",
		image: getImagePath("/profile.png"),
		linkedin:
			"https://www.linkedin.com/in/jayasanka-ariyaratne?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bvd6eSph0Q2C91JY4E6nTxQ%3D%3D",
		phone: "+94123456789",
		email: "jayasankaariyaratne@ieee.org",
	},
	{
		id: 3,
		name: "Sithum Sankajith",
		title: "Treasurer - IEEE Student Branch of NSBM",
		image: getImagePath("/profile.png"),
		linkedin:
			"https://www.linkedin.com/in/sithum-sankajith?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Buw%2FoNUZzRGm%2BytPRPtf3tQ%3D%3D",
		phone: "+94775524461",
		email: "sithumsankajith@ieee.org",
	},
	{
		id: 4,
		name: "Kumuditha Ranasinghe",
		title: "webMaster - IEEE Student Branch of NSBM",
		image: getImagePath("/profile.png"),
		linkedin:
			"https://www.linkedin.com/in/kumuditha-ranasinghe-078a23254?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B9%2FS%2BWSl8RDGVswH4%2BP5RXA%3D%3D",
		phone: "+94123456789",
		email: "kumuditharanasinghe@ieee.org",
	},
	{
		id: 5,
		name: "Ravindu Rajapaksha",
		title: "Chairperson - Duothan 5.0",
		image: getImagePath("/profile.png"),
		linkedin:
			"https://www.linkedin.com/in/ravindu-rajapaksha-9b4415308?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BuDn5UM3GSo6zXuJdfa1GVQ%3D%3D",
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
							Questions, glitches, or just curious? Our squad is ready to
							assist. Reach out, connect, and let us guide you through the
							DUOTHON experience. The mission support is always online.
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

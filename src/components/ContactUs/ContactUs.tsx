"use client";
import type React from "react";
import Slider from "react-slick";
import ContactCard from "./ContactCard";
import { ContactData } from "./ContactData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContactUs: React.FC = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 400,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="relative bg-transparent px-4 lg:px-0 h-full flex items-center w-full max-w-[1170px] mx-auto py-20">
			<div className="relative w-full max-h-screen overflow-hidden">
				<div className="flex flex-col lg:flex-row justify-between">
					{/* Left column */}
					<div className="w-full lg:w-2/5 xl:w-1/3">
						<h2 className="text-3xl py-4 md:text-4xl leading-[100%] text-center lg:text-left tracking-[0.03em] font-normal mb-4 sm:mb-6 lg:mb-10 text-[#A2EBFF]">
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
						<div className="relative [&_.slick-dots]:!flex [&_.slick-dots]:!justify-center [&_.slick-dots]:!items-center [&_.slick-dots]:!gap-2 [&_.slick-dots]:!-bottom-10 [&_.slick-dots_li]:!m-0 [&_.slick-dots_li_div]:!opacity-30 [&_.slick-dots_li.slick-active_div]:!opacity-100 [&_.slick-dots_li.slick-active_div]:!bg-[#A2EBFF]">
							<Slider {...settings}>
								{ContactData.map((contact) => (
									<div key={contact.id} className="px-2">
										<div className="flex justify-center">
											<ContactCard
												name={contact.name}
												title={contact.title}
												image={contact.image}
												linkedin={contact.linkedin}
												phone={contact.phone}
												email={contact.email}
											/>
										</div>
									</div>
								))}
							</Slider>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;

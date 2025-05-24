"use client";
import Slider from "react-slick";
import { PastEventData } from "./PastEventData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PastEventCard from "@/components/PastEvents/PastEventCard";

export default function PastEvents() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 400,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="h-full px-4 lg:px-0 flex flex-col items-center w-full max-w-[1170px] my-20 mx-auto">
			<p className="text-3xl md:text-4xl text-center text-[#a2ebff] mb-8 pt-20 lg:py-20">
				OUR PAST EVENTS
			</p>

			<div className="w-full max-w-7xl">
				<Slider {...settings}>
					{PastEventData.map((event) => (
						<div key={event.key} className="p-2 mb-6">
							<PastEventCard
								title={event.title}
								image={event.image}
								description={event.description}
							/>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}

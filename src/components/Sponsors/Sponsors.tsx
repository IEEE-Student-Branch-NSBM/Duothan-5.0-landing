"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AssociateSponsors, type Sponsor, TitleSponsors } from "./SponsorData";

interface SponsorCardProps {
	img: string;
	url?: string;
	altText?: string;
}

const SponsorCard = React.memo(
	({ img, url, altText = "Sponsor logo" }: SponsorCardProps) => {
		const cardContent = (
			<div className="relative mx-auto transition-all duration-300 hover:scale-105 flex items-center justify-center w-60 h-32">
				<div
					className="absolute inset-0 bg-no-repeat bg-center bg-contain"
					style={{
						backgroundImage: "url('/sponsors.svg')",
					}}
					aria-hidden="true"
				/>
				<div className="relative z-10 w-full h-full flex items-center justify-center p-4">
					<div className="w-full h-full flex items-center justify-center">
						<div className="max-w-52 max-h-24 w-1/2 h-1/2 relative">
							<Image
								src={img || "/placeholder.svg"}
								alt={altText || "Sponsor logo"}
								fill
								className="object-contain"
								sizes="220px"
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

interface SponsorSliderProps {
	sponsors: Sponsor[];
}

const SponsorSlider = ({ sponsors }: SponsorSliderProps) => {
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
		<div className="w-full max-w-6xl mx-auto px-4">
			<Slider {...settings}>
				{sponsors.map((sponsor) => (
					<div key={`sponsor-${sponsor.id}`} className="px-2">
						<div className="flex justify-center">
							<SponsorCard
								img={sponsor.img}
								url={sponsor.url}
								altText={sponsor.altText}
							/>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

const Sponsors = () => {
	return (
		<section className="py-12 px-4 w-full max-w-7xl mx-auto">
			<h2 className="text-4xl text-center text-[#a2ebff] mb-12">
				OUR SPONSORS
			</h2>

			<div className="mb-16">
				<h3 className="text-3xl text-center text-[#e957dd] mb-8">
					TITLE SPONSORS
				</h3>
				<SponsorSlider sponsors={TitleSponsors} />
			</div>

			<div>
				<h3 className="text-3xl text-center text-[#e957dd] mb-8">
					ASSOCIATE SPONSORS
				</h3>
				<SponsorSlider sponsors={AssociateSponsors} />
			</div>
		</section>
	);
};

Sponsors.displayName = "Sponsors";

export default Sponsors;

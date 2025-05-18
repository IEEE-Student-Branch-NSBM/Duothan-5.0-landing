"use client";

import SCard from "@/components/sponsors/sponsorscard";
import localFont from "next/font/local";
import React from "react";

const readyplayerone = localFont({
	src: "../../../public/font.otf",
	display: "swap",
});

interface Sponsor {
	id: number;
	img: string;
	url?: string;
}

const sponsorsGroup1: Sponsor[] = [
	{ id: 1, img: "SpLogo/sponsors1.svg", url: "https://sponsor1.com" },
	{ id: 2, img: "SpLogo/sponsors2.svg", url: "https://sponsor2.com" },
	{ id: 3, img: "SpLogo/sponsors3.svg", url: "https://sponsor3.com" },
	{ id: 4, img: "SpLogo/sponsors4.svg", url: "https://sponsor4.com" },
];

const sponsorsGroup2: Sponsor[] = [
	{ id: 5, img: "SpLogo/sponsors5.svg", url: "https://sponsor5.com" },
	{ id: 6, img: "SpLogo/sponsors6.svg", url: "https://sponsor6.com" },
	{ id: 7, img: "SpLogo/sponsors7.svg", url: "https://sponsor7.com" },
	{ id: 8, img: "SpLogo/sponsors8.svg", url: "https://sponsor8.com" },
];

export default function Sponsors() {
	return (
		<section className="bg-black py-20 px-6 md:px-10 lg:px-40 w-full max-w-[1170px] items-center mx-auto my-20">
			{/* min-h-screen px-4 lg:px-40 bg-black flex flex-col items-center w-full max-w-[1170px] my-20 mx-auto */}
			<h2
				className={`text-3xl md:text-4xl text-center text-[#a2ebff] mb-16 ${readyplayerone.className}`}
			>
				OUR SPONSORS
			</h2>

			{/* First Sponsor Group */}
			<div className="mb-20">
				<h3
					className={`text-2xl md:text-3xl text-center text-[#e957dd] mb-10 ${readyplayerone.className}`}
				>
					LOREM IPSUM
				</h3>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
					{sponsorsGroup1.map((sponsor) => (
						<SCard key={sponsor.id} img={sponsor.img} url={sponsor.url} />
					))}
				</div>
			</div>

			{/* Second Sponsor Group */}
			<div>
				<h3
					className={`text-2xl md:text-3xl text-center text-[#e957dd] mb-10 ${readyplayerone.className}`}
				>
					LOREM IPSUM
				</h3>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
					{sponsorsGroup2.map((sponsor) => (
						<SCard key={sponsor.id} img={sponsor.img} url={sponsor.url} />
					))}
				</div>
			</div>
		</section>
	);
}

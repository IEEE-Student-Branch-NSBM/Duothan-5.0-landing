import React from "react";

import { Electrolize } from "next/font/google";

const electrolize = Electrolize({
	subsets: ["latin"],
	weight: ["400"],
});

type CardProps = {
	title: string;
	description: string;
	image: string;
};

export default function Card({ title, description, image }: CardProps) {
	return (
		<div className="w-76 h-96 relative">
			<div className="absolute top-18 left-20">
				<div className="relative">
					<div className="absolute transform rotate-45 bg-black  w-33 h-39 -top-36 -left-36 z-1" />
				</div>
			</div>

			<div className="changethis absolute top-26 left-29">
				<div className="relative">
					<div className="absolute transform rotate-45 border-2 border-pink-500 w-19 h-29 -top-36 -left-36 z-10" />
				</div>
			</div>

			<div className="w-full h-full relative overflow-hidden border-2 border-pink-500  p-3">
				<div className="absolute top-0 left-0">
					<div className="relative">
						<div className="absolute transform rotate-45 bg-black w-60 h-60 -top-36 -left-36 z-1" />
					</div>
				</div>

				<div className="absolute -top-2 left-0">
					<div className="relative">
						<div className="absolute transform rotate-45 border-2 border-pink-500  w-55 h-65 -top-36 -left-36 z-10" />
					</div>
				</div>

				<div className="bg-white h-2/4 w-full relative">{image}</div>

				<div className={`bg-black h-1/4 w-full pt-3 ${electrolize.className}`}>
					<h2 className="text-cyan-200 text-2xl font-medium">{title}</h2>
					<p className="text-white text-sm text-justify">{description}</p>
				</div>
			</div>
		</div>
	);
}

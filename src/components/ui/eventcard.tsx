import { Electrolize } from "next/font/google";
import Image from "next/image";
import React from "react";

const electrolize = Electrolize({
	subsets: ["latin"],
	weight: ["400"],
});

type CardProps = {
	title: string;
	description: string;
};

export default function Card({ title, description }: CardProps) {
	return (
		<div className="relative w-full max-w-[300px]">
			<Image
				src="/eventcard.svg"
				alt="event"
				width={300}
				height={500}
				className="relative z-0"
			/>
			<div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center px-6">
				<h3
					className={`${electrolize.className} text-xl text-[#a2ebff] text-start font-bold mb-2 pt-44`}
				>
					{title}
				</h3>
				<p className={`text-white text-sm ${electrolize.className}`}>
					{description}
				</p>
			</div>
		</div>
	);
}

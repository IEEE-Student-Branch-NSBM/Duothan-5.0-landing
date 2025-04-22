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
		<div className="w-73 h-96 relative">
			<div className="absolute top-18 left-20">
				<div className="relative">
					<div className="absolute transform rotate-45 bg-black w-33 h-39 -top-36 -left-36 z-1" />
				</div>
			</div>

			<div className="rotate-225 absolute top-10 left-9 z-1">
				<div className="absolute top-25 left-24">
					<div className="relative">
						<div className="absolute transform rotate-45 border-2 border-[#ed00da] w-24 h-24 -top-36 -left-36" />
					</div>
				</div>
			</div>

			<div className="rotate-225 absolute top-10 left-9 z-5">
				<div className="absolute top-[115px] left-[42.99px]">
					<div className="relative">
						<div className="absolute transform rotate-90 border-t-2 border-[#ed00da] w-34 h-17 -top-36 -left-36" />
					</div>
				</div>
			</div>

			<div className="absolute top-[223px] left-[137.9px] z-5">
				<div className="relative">
					<div className="absolute transform rotate-225 bg-black w-2 h-3 -top-36 -left-36" />
				</div>
			</div>

			<div className="absolute top-[126.9px] left-[230px] z-5">
				<div className="relative">
					<div className="absolute transform rotate-225 bg-black w-2 h-5 -top-36 -left-36" />
				</div>
			</div>

			<div className="absolute top-[126.9px] left-[230px] z-5">
				<div className="relative">
					<div className="absolute transform rotate-225 bg-black w-2 h-2 -top-36 -left-36" />
				</div>
			</div>

			<div className="w-full h-full relative overflow-hidden border-2 border-[#ed00da] rounded-sm p-3 pb-9">
				<div className="absolute top-0 left-0">
					<div className="relative">
						<div className="absolute transform rotate-45 bg-black w-60 h-60 -top-36 -left-36 z-4" />
					</div>
				</div>

				<div className="absolute -top-2 left-0">
					<div className="relative">
						<div className="absolute transform rotate-45 border-2 border-[#ed00da]  w-55 h-65 -top-36 -left-36 z-4" />
					</div>
				</div>

				<div className="bg-white h-2/4 w-full relative z-3">{image}</div>

				<div className={`bg-black h-1/4 w-full pt-3 ${electrolize.className}`}>
					<h2 className="text-cyan-200 text-2xl font-medium">{title}</h2>
					<p className="text-white text-sm text-justify">{description}</p>
				</div>
			</div>

			<div className="absolute bottom-0 left-5">
				<div className="relative">
					<div className="absolute transform bg-[#ed00da] w-33 h-2 z-1" />
				</div>
			</div>
			<div className="absolute -bottom-1 left-[9px]">
				<div className="relative">
					<div className="absolute transform bg-black rotate-60 w-4 h-4 z-1" />
				</div>
			</div>
			<div className="absolute -bottom-1 right-[145px]">
				<div className="relative">
					<div className="absolute transform bg-black rotate-30 w-4 h-4 z-1" />
				</div>
			</div>

			<div className="absolute top-45 right-[115.99px]">
				<div className="relative">
					<div className="absolute transform rotate-90 bg-[#ed00da] w-60 h-2 z-1" />
				</div>
			</div>

			<div className="absolute top-74 right-[-3px]">
				<div className="relative">
					<div className="absolute transform bg-black rotate-45 w-4 h-4 z-1" />
				</div>
			</div>

			<div className="absolute top-[54.9px] right-[-3px]">
				<div className="relative">
					<div className="absolute transform bg-black rotate-45 w-4 h-4 z-1" />
				</div>
			</div>
		</div>
	);
}

import { getImagePath } from "@/lib/imagePath";
import Image from "next/image";
import React from "react";

type CardProps = {
	title: string;
	image: string;
	description: string;
};

export default function Card({ title, image, description }: CardProps) {
	return (
		<div className="relative w-[300px] h-[388.7px] mx-auto">
			<Image
				src={getImagePath("/eventcard.svg")}
				alt="card background"
				fill
				className="object-center rounded-lg z-0"
			/>

			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 ">
				<div className="w-[260px] h-[180px] mr-3 mt-2 mb-48 rounded-[2px] z-10 relative ">
					<div
						className="absolute inset-0 overflow-hidden"
						style={{
							maskImage: `url(${getImagePath("/eventmask.svg")})`,
							WebkitMaskImage: `url(${getImagePath("/eventmask.svg")})`,
							maskRepeat: "no-repeat",
							WebkitMaskRepeat: "no-repeat",
						}}
					>
						<Image
							src={image.startsWith("http") ? image : getImagePath(image)}
							alt="profile"
							fill
							className=""
						/>
					</div>
				</div>
				<div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center pl-3 pr-5">
					<p
						className={
							"font-[Electrolize] text-[25px] text-[#a2ebff] text-start font-bold  pt-40 pb-1"
						}
					>
						{title}
					</p>
					<p
						className={
							"text-white text-[14px] text-sm md:text-xs font-[Electrolize]"
						}
					>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}

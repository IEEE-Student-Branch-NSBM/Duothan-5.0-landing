import Image from "next/image";
import React from "react";

type CardProps = {
	title: string;
	image: string;
	description: string;
};

export default function Card({ title, image, description }: CardProps) {
	return (
		<div className="relative w-[255px] h-[343.7px]">
			<Image
				src="/eventcard.svg"
				alt="card background"
				fill
				className="object-center rounded-lg z-0"
			/>

			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 ">
				<div className="w-[230.5px] h-[155px] ml-1 mb-41.5 rounded-[2px] z-10 mr-2 relative ">
					<div className="absolute inset-0 overflow-hidden mask-[url('/eventimage.svg')] [mask-repeat:no-repeat]">
						<Image src={image} alt="profile" fill className="object-cover" />
					</div>
				</div>
				<div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center pl-3 pr-5">
					<p
						className={
							"font-[Electrolize] text-[23px] text-[#a2ebff] text-start font-bold  pt-35"
						}
					>
						{title}
					</p>
					<p
						className={
							"text-white text-[12px] text-sm md:text-xs font-[Electrolize]"
						}
					>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}

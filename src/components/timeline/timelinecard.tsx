"use client";
import { getImagePath } from "@/lib/imagePath";

interface CardProps {
	title: string;
	description: string;
	position: "left" | "right";
}

export default function Card({ title, description, position }: CardProps) {
	return (
		<div className="relative w-full">
			{position === "left" ? (
				// Left card for desktop
				<div className="relative hidden md:block">
					<img
						src={getImagePath("/fullcardtimeline.svg")}
						alt="Timeline card"
						className="w-full h-full object-contain"
					/>
					<div className="absolute top-6 -left-2 w-full h-full flex flex-col justify-center pl-8 pr-16">
						<h3 className="text-white text-xl font-bold mb-2">{title}</h3>
						<p className="text-gray-300">{description}</p>
					</div>
				</div>
			) : (
				// Right card for desktop/
				<div className="relative hidden md:block">
					<img
						src={getImagePath("/fullcardright.svg")}
						alt="Timeline card"
						className="w-full h-full object-contain"
					/>
					<div className="absolute top-3 left-10 w-full h-full flex flex-col justify-center pr-8 pl-16 inset-0 z-10">
						<h3 className="text-white text-xl font-bold mb-2">{title}</h3>
						<p className="text-gray-300">{description}</p>
					</div>
				</div>
			)}

			{/* Mobile view card - visible only on small screens */}
			<div className="relative md:hidden">
				<img
					src={getImagePath("/fullcardright.svg")}
					alt="Timeline card"
					className="w-full h-full object-contain"
				/>
				<div className="absolute top-3 -left-1 w-full h-full flex flex-col justify-center pr-8 pl-16 inset-0 z-10">
					<h3 className="text-white text-[14px] font-semibold mb-2">{title}</h3>
					<p className="text-gray-300 text-[10px]">{description}</p>
				</div>
			</div>
		</div>
	);
}

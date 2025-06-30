"use client";
import { getImagePath } from "@/lib/imagePath";
import { useState } from "react";
import Card from "./timelinecard";
export default function Timeline() {
	const [items] = useState([
		{
			id: 1,
			position: "left",
			title: "Registration Opens",
			description: "July 1st, 2025",
		},
		{
			id: 2,
			position: "right",
			title: "Registration Closes",
			description: "July 10th, 2025",
		},
		{
			id: 3,
			position: "left",
			title: "Initial Stage",
			description: "11th of July, 2025",
		},
		{
			id: 4,
			position: "right",
			title: "Competition Begins",
			description: "16th July, 2025",
		},
	]);
	return (
		<div>
			{/* Desktop view */}
			<div className="hidden lg:flex relative w-full max-w-[1170px] h-[550px]">
				<div className="absolute left-1/2 transform -translate-x-1/2 h-full">
					<img
						src={getImagePath("/timelinecompleet.svg")}
						alt="Timeline"
						className="h-full object-contain z-0"
					/>
				</div>
				<div className="flex flex-row w-full">
					<div className="flex flex-col w-full ml-4">
						{items
							.filter((_, i) => i % 2 === 1)
							.map((item, index) => (
								<div
									key={item.id}
									className={`flex justify-start w-full ${index === 0 ? "mt-[110px] -mb-[70px]" : "mt-16"}`}
								>
									<Card
										title={item.title}
										description={item.description}
										position="left"
									/>
								</div>
							))}
					</div>
					<div className="flex flex-col w-full -ml-40">
						{items
							.filter((_, i) => i % 2 === 0)
							.map((item, index) => (
								<div
									key={item.id}
									className={`flex justify-start w-full ${index === 0 ? "-mb-[56px] mt-[12px]" : "mt-12"}`}
								>
									<Card
										title={item.title}
										description={item.description}
										position="right"
									/>
								</div>
							))}
					</div>
				</div>
			</div>
			{/* Tablet view */}
			<div className="hidden md:flex lg:hidden max-w-[768px] mx-auto fixed mb-40">
				<div className="absolute left-1/2 transform -translate-x-1/2">
					<img
						src={getImagePath("/timelinecompleet.svg")}
						alt="Timeline"
						className="h-full object-contain"
					/>
				</div>
				<div className="flex flex-row w-full">
					<div className="flex flex-col w-full">
						{[items[1], items[3]].map((item, index) => (
							<div
								key={item.id}
								className={`flex justify-start w-full ml-2 ${index === 0 ? "mt-58" : "mt-34"}`}
							>
								<Card
									title={item.title}
									description={item.description}
									position="left"
								/>
							</div>
						))}
					</div>
					<div className="flex flex-col w-full">
						{[items[0], items[2]].map((item, index) => (
							<div
								key={item.id}
								className={`flex justify-start w-full ml-auto ${index === 0 ? "mt-25" : "mt-32"}`}
							>
								<Card
									title={item.title}
									description={item.description}
									position="right"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Mobile view */}
			<div className="md:hidden flex relative w-[370px] h-[584px] mx-auto">
				<div className="absolute left-6 top-0 h-full">
					<img
						src={getImagePath("/mobileTimeline.svg")}
						alt="Mobile Timeline"
						className="h-full object-contain"
					/>
				</div>
				<div className="flex flex-col w-full h-full overflow-hidden">
					<div className="flex flex-col w-full">
						<div className="flex justify-start w-3/4 ml-8 mt-5">
							<Card
								title={items[0].title}
								description={items[0].description}
								position="right"
							/>
						</div>
						<div className="flex justify-start w-3/4 ml-8 mt-5">
							<Card
								title={items[1].title}
								description={items[1].description}
								position="right"
							/>
						</div>
						<div className="flex justify-start w-3/4 ml-8 mt-4">
							<Card
								title={items[2].title}
								description={items[2].description}
								position="right"
							/>
						</div>
						<div className="flex justify-start w-3/4 ml-8 mt-5">
							<Card
								title={items[3].title}
								description={items[3].description}
								position="right"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

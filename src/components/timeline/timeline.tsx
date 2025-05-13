"use client";
import { useState } from "react";
import Card from "./timelinecard";

export default function Timeline() {
	const [items] = useState([
		{
			id: 1,
			position: "left",
			title: "First Milestone",
			description: "Description of the first milestoneDescription",
		},
		{
			id: 2,
			position: "left",
			title: "Second Milestone",
			description: "Description of the second milestone",
		},
		{
			id: 3,
			position: "right",
			title: "Third Milestone",
			description: "Description of the third milestone",
		},
		{
			id: 4,
			position: "right",
			title: "Fourth Milestone",
			description: "Description of the fourth milestone",
		},
	]);

	return (
		<div className="bg-non px-4 lg:px-0 flex flex-col items-center relative w-full max-w-[1170px] mx-auto mb-40">
			{/* Desktop view */}
			<div className="hidden lg:flex relative w-full max-w-[1170px] mx-auto">
				<div className="absolute left-1/2 transform -translate-x-1/2">
					<img
						src="/timelinecompleet.svg"
						alt="Timeline"
						className="h-full object-contain"
					/>
				</div>
				<div className="flex flex-row w-full">
					<div className="flex flex-col w-full">
						{items
							.filter((_, i) => i % 2 === 1)
							.map((item, index) => (
								<div
									key={item.id}
									className={`flex justify-start w-full ml-5 ${index === 0 ? "mt-47" : "mt-14"}`}
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
						{items
							.filter((_, i) => i % 2 === 0)
							.map((item, index) => (
								<div
									key={item.id}
									className={`flex justify-start w-full ml-auto ${index === 0 ? "mt-13" : "mt-12"}`}
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
			<div className="hidden md:flex lg:hidden relative w-full max-w-[768px] mx-auto">
				<div className="absolute left-1/2 transform -translate-x-1/2">
					<img
						src="/timelinecompleet.svg"
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
			<div className="md:hidden flex items-start relative w-full max-w-[448px] mx-auto">
				<div className="absolute left-4 top-0 h-146">
					<img
						src="/mobileTimeline.svg"
						alt="Mobile Timeline"
						className="h-full object-contain"
					/>
				</div>
				<div className="flex flex-col w-full">
					{items.map((item, index) => (
						<div
							key={item.id}
							className={`flex justify-start w-3/4 ml-5 ${index === 0 ? "mt-16" : index === 1 ? "mt-4.5" : "mt-4"}`}
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
	);
}

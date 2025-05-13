"use client";
import { useState } from "react";
import Card from "./timelinecard";

export default function Timeline() {
	type TimelineItem = {
		id: number;
		position: "left" | "right";
		title: string;
		description: string;
	};

	const [items] = useState<TimelineItem[]>([
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
		<div className="bg-black px-4 lg:px-0 flex flex-col items-center  relative w-full max-w-[1170px] mx-auto mb-10">
			{/* Desktop view: Timeline with centered vertical line and cards on alternating sides */}
			<div className="hidden md:flex flex-col justify-center relative w-full max-w-[1170px] mx-auto">
				{/* Center timeline - desktop */}
				<div className="absolute left-1/2 transform -translate-x-1/2  fix">
					<img
						src="/timelinecompleet.svg"
						alt="Timeline"
						className="h-full object-contain"
					/>
				</div>

				{/* Timeline items in a column - desktop view */}
				<div className="flex flex-col w-full">
					<div className="flex justify-end w-1/2 ml-auto">
						<Card
							title={items[0].title}
							description={items[0].description}
							position="right"
						/>
					</div>

					<div className="flex justify-start w-1/2">
						<Card
							title={items[1].title}
							description={items[1].description}
							position="left"
						/>
					</div>

					<div className="flex justify-end w-1/2 ml-auto">
						<Card
							title={items[2].title}
							description={items[2].description}
							position="right"
						/>
					</div>

					<div className="flex justify-start w-1/2">
						<Card
							title={items[3].title}
							description={items[3].description}
							position="left"
						/>
					</div>
				</div>
			</div>

			{/* Mobile view: Vertical timeline with all cards on the right */}
			<div className="md:hidden flex flex-col items-start justify-center relative w-full max-w-[500px] mx-auto">
				{/* Left-aligned timeline - mobile */}
				<div className="absolute left-4 top-0 h-full">
					<img
						src="/mobileTimeline.svg"
						alt="Mobile Timeline"
						className="h-full object-contain"
					/>
				</div>

				{/* Timeline items in a single column for mobile */}
				<div className="flex flex-col w-full pl-12 pb-3 space-y-6">
					{items.map((item) => (
						<div key={item.id} className="flex flex-col">
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

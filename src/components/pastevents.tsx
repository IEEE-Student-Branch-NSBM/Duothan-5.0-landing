import localFont from "next/font/local";
import React from "react";
import Card from "./ui/card";

const readyplayerone = localFont({ src: "../../public/font.otf" });

const events = [
	{
		key: 1,
		title: "Duothon 1.0",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
	{
		key: 2,
		title: "Duothon 1.0",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
	{
		key: 3,
		title: "Duothon 1.0",
		description:
			"Duothon 1.0 was our very first step into the world of competitive coding at NSBM, held back in 2021. Since the world was still adjusting, Duothon 1.0 was our very first step into the world of competitive coding at first step into the world of competitive coding at",
	},
];

export default function PastEvents() {
	return (
		<div className="min-h-screen bg-black flex flex-col items-center justify-center gap-25">
			<p
				className={`text-3xl md:text-4xl text-center text-[#e957dd] mb-4 ${readyplayerone.className}`}
			>
				OUR PAST EVENTS
			</p>

			<div className="grid grid-cols-3 gap-25">
				{events.map((event) => (
					<Card
						key={event.key}
						title={event.title}
						description={event.description}
						image={"/"}
					/>
				))}
			</div>
		</div>
	);
}

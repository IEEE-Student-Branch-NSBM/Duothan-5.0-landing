import { Electrolize } from "next/font/google";
import localFont from "next/font/local";

const electrolize = Electrolize({
	subsets: ["latin"],
	weight: ["400"],
});

const readyplayerone = localFont({ src: "../../public/font.otf" });

export default function AboutUs() {
	return (
		<main
			className="min-h-screen flex flex-col items-center justify-center relative"
			style={{ backgroundImage: "url('/background.png')" }}
		>
			<div className="absolute inset-0 bg-black/50 bg-opacity-0 z-0" />

			<div className="z-10 flex flex-col items-center justify-center w-full px-4 md:px-8 py-12">
				<p
					className={`text-3xl md:text-4xl text-center text-[#e957dd] mb-4 ${readyplayerone.className}`}
				>
					ABOUT US
				</p>

				<div className="flex flex-col items-center justify-center pt-6 md:pt-9 max-w-7xl">
					<p
						className={`text-xl md:text-2xl text-center text-[#a2ebff] ${readyplayerone.className}`}
					>
						IEEE STUDENT BRANCH OF NSBM
					</p>
					<p
						className={`text-base md:text-xl text-white text-center w-full md:w-4/5 lg:w-[900px] pt-3 ${electrolize.className}`}
					>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry&#39;s standard dummy
						text ever since the 1500s, when an unknown printer took a galley of
						type and scrambled it to make a type specimen book. It has survived
						not only five centuries, but also the leap into electronic
						typesetting, remaining essentially unchanged. It was popularised in
						the 1960s with the release of Letraset sheets containing Lorem Ipsum
						passages
					</p>
				</div>

				<div className="flex flex-col items-center justify-center pt-10 md:pt-14 max-w-7xl">
					<p
						className={`text-xl md:text-2xl text-[#a2ebff] ${readyplayerone.className}`}
					>
						DUOTHON
					</p>
					<p
						className={`text-base md:text-xl text-white text-center w-full md:w-4/5 lg:w-[900px] pt-3 ${electrolize.className}`}
					>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry&#39;s standard dummy
						text ever since the 1500s, when an unknown printer took a galley of
						type and scrambled it to make a type specimen book. It has survived
						not only five centuries, but also the leap into electronic
						typesetting, remaining essentially unchanged. It was popularised in
						the 1960s with the release of Letraset sheets containing Lorem Ipsum
						passages
					</p>
				</div>
			</div>
		</main>
	);
}

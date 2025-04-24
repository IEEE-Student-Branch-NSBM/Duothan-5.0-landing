import { Electrolize } from "next/font/google";
import localFont from "next/font/local";

const electrolize = Electrolize({
	subsets: ["latin"],
	weight: ["400"],
});

const readyplayerone = localFont({ src: "../../../public/font.otf" });

export default function AboutUs() {
	return (
		<main className="bg-black px-4 lg:px-0 max-h-screen flex flex-col items-center justify-center relative w-full max-w-[1170px] mx-auto">
			<div className="z-10 flex flex-col items-center justify-center w-full  py-12">
				<p
					className={`text-3xl md:text-4xl text-center text-[#a2ebff] mb-4 ${readyplayerone.className}`}
				>
					ABOUT US
				</p>

				<div className="flex flex-col items-center justify-center w-full pt-6 md:pt-9">
					<p
						className={`text-xl md:text-2xl text-center text-[#e957dd] ${readyplayerone.className}`}
					>
						IEEE STUDENT BRANCH OF NSBM
					</p>
					<p
						className={`text-base md:text-xl text-white text-center w-full  pt-3 ${electrolize.className}`}
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
						className={`text-xl md:text-2xl text-[#e957dd] ${readyplayerone.className}`}
					>
						DUOTHON
					</p>
					<p
						className={`text-base md:text-xl text-white text-center w-full  pt-3 ${electrolize.className}`}
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

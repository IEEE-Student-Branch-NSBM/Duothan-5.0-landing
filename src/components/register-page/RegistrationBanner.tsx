"use client";
import RegisterButton from "@/components/register-page/RegisterButton";
import localFont from "next/font/local";
import Image from "next/image";
import { useRef } from "react";

const readyplayerone = localFont({ src: "../../../public/font.otf" });

export default function RegistrationBanner() {
	const bannerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const samuraiRef = useRef<HTMLDivElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	return (
		<div className={`${readyplayerone.className}`}>
			<div
				ref={bannerRef}
				className="relative w-full max-w-7xl mx-auto overflow-visible z-10"
			>
				{/* Desktop Samurai Image */}
				<div
					ref={samuraiRef}
					className="absolute z-20 left-1 md:-left-20 -top-4 md:-top-32 w-[500px] h-[510px] hidden md:block justify-center items-center"
				>
					<Image
						src="/samurai.png"
						alt="Samurai Warrior"
						fill
						className="object-contain scale-102"
						sizes="(max-width: 768px) 90vw, 800px"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent mix-blend-overlay" />
				</div>

				<div className="flex flex-col md:flex-row items-center p-5 md:p-12 pb-14 border-1 border-[#E957DD] bg-transparent shadow-2xl relative overflow-visible backdrop-blur-[2px]">
					{/* <div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-60 blur-md" />
					<div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-30 blur-lg" /> */}

					<div className="absolute top-3 left-4 text-[10px] text-cyan-400/70 font-mono">
						<div ref={terminalRef}>Duothan 5.0</div>
					</div>

					<div className="w-full md:h-50 md:ml-auto flex flex-col items-end mt-4 md:mt-0 md:pr-0 max-w-3xl">
						<h2
							ref={titleRef}
							className="text-2xl md:text-4xl font-bold mb-6 text-right text-cyan-400 tracking-wide w-full leading-tight relative "
							style={{
								textShadow: "0 0 15px rgba(0, 255, 240, 0.5)",
							}}
						>
							<span className="relative inline-block">
								REGISTRATIONS ARE OPEN
							</span>
						</h2>

						<p
							ref={descRef}
							className="text-gray-200 text-right mb-8 text-xs max-w-3xl ml-auto mr-0 pl-16 md:pl-40 lg:pl-64 w-full leading-relaxed"
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							pellentesque, neque ut tempor vulputate, nisi purus varius elit.{" "}
							<span className="text-cyan-400 font-bold">Join us</span> for an
							unforgettable experience with cutting-edge technology and
							innovative challenges.
						</p>

						<div className="flex justify-end w-full">
							<RegisterButton />
						</div>

						<div className="relative z-20 w-full h-[280px] mt-6 md:hidden flex justify-center items-center">
							<div className="relative w-[100px] h-[100px] top-5">
								<Image
									src="/samurai.png"
									alt="Samurai Warrior"
									fill
									className="object-contain scale-522"
									sizes="280px"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent mix-blend-overlay" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

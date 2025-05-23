"use client";
import RegisterButton from "@/components/register-page/RegisterButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const readyplayerone = localFont({ src: "../../../public/font.otf" });

export default function RegistrationBanner() {
	const [glitchActive, setGlitchActive] = useState(false);
	const bannerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const samuraiRef = useRef<HTMLDivElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger, TextPlugin);

		// Terminal text effect
		animateTerminalText();

		// Animation timeline
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: bannerRef.current,
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		});

		// Add animations to timeline
		tl.from(bannerRef.current, {
			opacity: 0,
			duration: 0.8,
			ease: "power2.out",
		})
			.from(
				samuraiRef.current,
				{
					y: -30,
					opacity: 0,
					duration: 0.6,
					ease: "back.out(1.7)",
				},
				"-=0.4",
			)
			.from(
				titleRef.current,
				{
					y: -20,
					opacity: 0,
					duration: 0.5,
					ease: "power1.out",
					onComplete: () => {
						initGlitchEffect();
					},
				},
				"-=0.3",
			)
			.from(
				descRef.current,
				{
					y: 20,
					opacity: 0,
					duration: 0.5,
					ease: "power1.out",
				},
				"-=0.3",
			);

		return () => {
			// Clean up scroll trigger
			for (const trigger of ScrollTrigger.getAll()) {
				trigger.kill(false);
			}
		};
	}, []);

	// Initialize glitch effect on title
	const initGlitchEffect = () => {
		if (!titleRef.current) return;

		// Create random glitch intervals
		const glitchInterval = setInterval(
			() => {
				setGlitchActive(true);
				setTimeout(() => setGlitchActive(false), 200);
			},
			Math.random() * 5000 + 3000,
		);

		return () => clearInterval(glitchInterval);
	};

	// Animate terminal text
	const animateTerminalText = () => {
		if (!terminalRef.current) return;

		const commands = [
			"initializing system...",
			"loading user profiles...",
			"accessing registration modules...",
			"authenticating credentials...",
			"system ready",
		];

		const timeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });

		commands.forEach((text, index) => {
			timeline.to(terminalRef.current, {
				duration: 1,
				text: `> ${text}`,
				ease: "none",
				delay: index === 0 ? 0 : 0.8,
			});
		});
	};

	return (
		<div
			className={`${readyplayerone.className} flex justify-center items-center min-h-screen bg-transparent p-7 overflow-hidden`}
		>
			<div
				ref={bannerRef}
				className="relative w-full max-w-7xl mx-auto rounded-xl overflow-visible z-10"
			>
				{/* Desktop Samurai Image */}
				<div
					ref={samuraiRef}
					className="absolute z-20 left-1 xl:left-10 -top-4 xl:-top-0 w-[600px] h-[710px] hidden xl:block justify-center items-center"
				>
					<Image
						src="/samurai.png"
						alt="Samurai Warrior"
						fill
						className="object-contain scale-102"
						sizes="(max-width: 768px) 90vw, 600px"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent mix-blend-overlay" />
				</div>

				<div className="flex flex-col xl:flex-row items-center p-5 xl:p-12 pb-14 rounded-xl border-2 border-[#E957DD] bg-transparent shadow-2xl relative overflow-visible mt-60 backdrop-blur-[2px]">
					<div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-60 blur-md" />
					<div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-30 blur-lg" />

					<div className="absolute top-3 left-4 text-[10px] text-cyan-400/70 font-mono">
						<div ref={terminalRef}> initializing system...</div>
					</div>

					<div className="w-full xl:w-3/5 xl:ml-auto flex flex-col mt-4 xl:mt-0 xl:pr-8 max-w-3xl">
						<h2
							ref={titleRef}
							className={`text-2xl xl:text-4xl font-bold mb-6 text-center xl:text-right text-cyan-400 tracking-wide w-full leading-tight relative ${glitchActive ? "glitch-text" : ""}`}
							style={{
								textShadow: "0 0 15px rgba(0, 255, 240, 0.5)",
							}}
						>
							<span className="relative inline-block">
								REGISTRATIONS ARE OPEN
								{glitchActive && (
									<>
										<span className="absolute top-0 left-0 w-full text-pink-500 opacity-70 transform translate-x-[2px] translate-y-[-2px]">
											REGISTRATIONS ARE OPEN
										</span>
										<span className="absolute top-0 left-0 w-full text-cyan-400 opacity-70 transform translate-x-[-2px] translate-y-[2px]">
											REGISTRATIONS ARE OPEN
										</span>
									</>
								)}
							</span>
						</h2>

						<p
							ref={descRef}
							className="text-gray-200 text-center xl:text-right mb-8 text-xs max-w-3xl mx-auto xl:ml-auto xl:mr-0 w-full leading-relaxed"
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							pellentesque, neque ut tempor vulputate, nisi purus varius elit.{" "}
							<span className="text-cyan-400 font-bold">Join us</span> for an
							unforgettable experience with cutting-edge technology and
							innovative challenges.
						</p>

						<RegisterButton />

						<div className="relative z-20 w-full h-[280px] mt-6 xl:hidden flex justify-center items-center">
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

			<style jsx global>{`

				@keyframes glitch {
					0% {
						transform: translate(0);
					}
					20% {
						transform: translate(-2px, 2px);
					}
					40% {
						transform: translate(-2px, -2px);
					}
					60% {
						transform: translate(2px, 2px);
					}
					80% {
						transform: translate(2px, -2px);
					}
					100% {
						transform: translate(0);
					}
				}
			`}</style>
		</div>
	);
}

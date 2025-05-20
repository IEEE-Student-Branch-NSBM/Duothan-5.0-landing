"use client";
import RegisterButton from "@/components/register-page/RegisterButton";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Import the Ready Player One font
const readyplayerone = localFont({ src: "../../../public/font.otf" });

export default function MobileRegistrationBanner() {
	const [glitchActive, setGlitchActive] = useState(false);
	const bannerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const samuraiRef = useRef<HTMLDivElement>(null);
	const scanlineRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
					y: 10,
					opacity: 0,
					duration: 0.5,
					ease: "power1.out",
				},
				"-=0.2",
			)
			.from(
				buttonRef.current,
				{
					y: 10,
					opacity: 0,
					duration: 0.5,
					ease: "power1.out",
				},
				"-=0.2",
			)
			.from(
				samuraiRef.current,
				{
					y: 20,
					opacity: 0,
					duration: 0.6,
					ease: "back.out(1.7)",
				},
				"-=0.2",
			);

		// Scanline animation
		if (scanlineRef.current) {
			gsap.fromTo(
				scanlineRef.current,
				{
					y: -100,
					opacity: 0.15,
				},
				{
					y: "100vh",
					opacity: 0.15,
					duration: 1.5,
					ease: "none",
					repeat: -1,
				},
			);
		}

		// Terminal text effect
		if (terminalRef.current) {
			const commands = [
				"initializing...",
				"loading profiles...",
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
		}

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

	return (
		<div className={`${readyplayerone.className} md:hidden block w-full p-2`}>
			<div
				ref={bannerRef}
				className="w-full aspect-[9/16] max-w-xs mx-auto rounded-xl overflow-hidden border-2 border-[#E957DD] bg-gray-900 shadow-lg relative"
			>
				{/* Border glow effect */}
				<div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-60 blur-md -z-10" />

				{/* Scanline effect */}
				<div
					ref={scanlineRef}
					className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent z-10"
				/>

				{/* Terminal text */}
				<div className="absolute top-2 left-2 text-[8px] text-cyan-400/70 font-mono z-20">
					<div ref={terminalRef}>initializing...</div>
				</div>

				<div className="flex flex-col h-full p-4 items-center">
					{/* Title */}
					<h2
						ref={titleRef}
						className={`text-xl font-bold mt-6 mb-4 text-center text-cyan-400 tracking-wide w-full ${glitchActive ? "glitch-text" : ""}`}
						style={{ textShadow: "0 0 10px rgba(0, 255, 240, 0.5)" }}
					>
						<span className="relative inline-block">
							REGISTRATIONS
							<br />
							ARE OPEN
							{glitchActive && (
								<>
									<span className="absolute top-0 left-0 w-full text-pink-500 opacity-70 transform translate-x-[2px] translate-y-[-2px]">
										REGISTRATIONS
										<br />
										ARE OPEN
									</span>
									<span className="absolute top-0 left-0 w-full text-cyan-400 opacity-70 transform translate-x-[-2px] translate-y-[2px]">
										REGISTRATIONS
										<br />
										ARE OPEN
									</span>
								</>
							)}
						</span>
					</h2>

					{/* Description */}
					<p
						ref={descRef}
						className="text-gray-200 text-center mb-5 text-xs leading-relaxed px-2"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
						pellentesque, neque ut tempor vulputate, nisi purus varius elit.
					</p>

					{/* Button */}
					<div ref={buttonRef} className="mb-6">
						<RegisterButton />
					</div>

					{/* Samurai Image */}
					<div
						ref={samuraiRef}
						className="absolute top-73 w-[660px] h-[500px] flex-grow max-h-[50%] flex justify-center items-center"
					>
						<Image
							src="/samurai.png"
							alt="Samurai Warrior"
							fill
							className="object-contain object-bottom"
							sizes="(max-width: 640px) 90vw"
							priority
						/>

						{/* Energy aura effect */}
						<div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20 blur-2xl">
							<motion.div
								className="w-full h-full bg-gradient-to-t from-cyan-400/30 to-transparent"
								animate={{
									opacity: [0.2, 0.4, 0.2],
								}}
								transition={{
									duration: 4,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							/>
						</div>
					</div>
				</div>

				{/* Circuit pattern overlay */}
				<div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 100 200"
						preserveAspectRatio="none"
					>
						<title>Pattern Overlay</title>
						<path
							d="M10,50 L30,50 L40,40 L60,40 L70,50 L90,50"
							stroke="#2a9fff"
							strokeWidth="0.5"
							fill="none"
						/>
						<path
							d="M10,70 L20,70 L30,80 L50,80 L60,70 L90,70"
							stroke="#E957DD"
							strokeWidth="0.5"
							fill="none"
						/>
						<path
							d="M50,10 L50,190"
							stroke="#2a9fff"
							strokeWidth="0.5"
							fill="none"
							opacity="0.3"
						/>
						<path
							d="M30,10 L30,190"
							stroke="#E957DD"
							strokeWidth="0.5"
							fill="none"
							opacity="0.2"
						/>
						<path
							d="M70,10 L70,190"
							stroke="#E957DD"
							strokeWidth="0.5"
							fill="none"
							opacity="0.2"
						/>
					</svg>
				</div>
			</div>

			<style jsx global>{`
        .glitch-text {
          animation: glitch 0.2s infinite;
        }

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

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

export default function RegistrationBannerDesktop() {
	const [glitchActive, setGlitchActive] = useState(false);
	const bannerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const samuraiRef = useRef<HTMLDivElement>(null);
	const scanlineRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const particlesRef = useRef<HTMLDivElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger, TextPlugin);

		// Create grid background
		createGridBackground();

		// Create cyberpunk particles

		// Scanline animation
		animateScanlines();

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

	// Create animated grid background
	const createGridBackground = () => {
		if (!gridRef.current) return;

		const grid = gridRef.current;
		const gridSize = 30;
		const cols = Math.ceil(window.innerWidth / gridSize);
		const rows = Math.ceil(window.innerHeight / gridSize);

		grid.innerHTML = "";

		// Create vertical lines
		for (let i = 0; i <= cols; i++) {
			const line = document.createElement("div");
			line.className = "absolute top-0 bottom-0 w-[1px] bg-cyan-500/10";
			line.style.left = `${i * gridSize}px`;
			grid.appendChild(line);

			// Random pulse animation
			if (Math.random() > 0.7) {
				gsap.to(line, {
					opacity: 0.3,
					duration: Math.random() * 2 + 1,
					repeat: -1,
					yoyo: true,
				});
			}
		}

		// Create horizontal lines
		for (let i = 0; i <= rows; i++) {
			const line = document.createElement("div");
			line.className = "absolute left-0 right-0 h-[1px] bg-cyan-500/10";
			line.style.top = `${i * gridSize}px`;
			grid.appendChild(line);

			// Random pulse animation
			if (Math.random() > 0.7) {
				gsap.to(line, {
					opacity: 0.3,
					duration: Math.random() * 2 + 1,
					repeat: -1,
					yoyo: true,
				});
			}
		}

		// Add perspective effect
		gsap.to(grid, {
			rotateX: 50,
			duration: 0,
		});

		// Create wave animation
		gsap.to(grid, {
			z: 30,
			duration: 10,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
		});
	};
	// Animate scanlines
	const animateScanlines = () => {
		if (!scanlineRef.current) return;

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
			className={`${readyplayerone.className} flex justify-center items-center min-h-screen bg-transparent p-4 overflow-hidden`}
		>
			{/* Background elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				{/* Grid background */}
				<div
					ref={gridRef}
					className="absolute inset-0 transform-gpu perspective-1000 opacity-30"
				/>

				{/* Particles effect */}
				<div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

				{/* Scanline effect */}
				<div
					ref={scanlineRef}
					className="fixed w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
				/>
			</div>

			<div
				ref={bannerRef}
				className="relative w-full max-w-7xl mx-auto rounded-xl overflow-visible z-10"
			>
				{/* Samurai image with enhanced positioning and effects */}
				<div
					ref={samuraiRef}
					className="absolute z-20 left-1 md:left-10 -top-4 md:-top-0 w-[600px] h-[720px]"
				>
					<Image
						src="/samurai.png"
						alt="Samurai Warrior"
						fill
						className="object-contain"
						sizes="(max-width: 768px) 90vw, 600px"
						priority
					/>

					{/* Enhanced energy aura effect */}
					<div className="absolute inset-0  opacity-20 blur-3xl rounded-full transform scale-75 translate-y-20">
						{/* Pulsating animation */}
						<motion.div
							className="w-full h-full rounded-full bg-cyan-400/20"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.2, 0.4, 0.2],
							}}
							transition={{
								duration: 4,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
					</div>

					{/* Digital noise overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent mix-blend-overlay" />
				</div>

				<div className="flex flex-col md:flex-row items-center p-5 md:p-12 pt-28 pb-14 rounded-xl border-2 border-[#E957DD] bg-transparent shadow-2xl relative overflow-visible mt-60 backdrop-blur-[2px]">
					{/* Enhanced border effects */}
					<div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-60 blur-md" />
					<div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-30 blur-lg" />

					{/* Digital circuit pattern overlay */}
					<div className="absolute inset-0 overflow-hidden opacity-20">
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 300 100"
							preserveAspectRatio="none"
						>
							<title>Digital Circuit overlay</title>
							<path
								d="M10,50 L50,50 L60,40 L100,40 L110,50 L200,50 L210,40 L290,40"
								stroke="#2a9fff"
								strokeWidth="1"
								fill="none"
							/>
							<path
								d="M10,60 L30,60 L40,70 L120,70 L130,60 L170,60 L180,70 L290,70"
								stroke="#E957DD"
								strokeWidth="1"
								fill="none"
							/>
						</svg>
					</div>

					<div className="absolute top-3 left-4 text-[10px] text-cyan-400/70 font-mono">
						<div ref={terminalRef}> initializing system...</div>
					</div>

					{/* Content area with improved spacing */}
					<div className="w-full md:w-3/5 md:ml-auto flex flex-col mt-12 md:mt-0 md:pr-8 max-w-3xl">
						<h2
							ref={titleRef}
							className={`text-2xl md:text-4xl font-bold mb-6 text-center md:text-right text-cyan-400 tracking-wide w-full leading-tight relative ${glitchActive ? "glitch-text" : ""}`}
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

						{/* Description text with improved styling - smaller font */}
						<p
							ref={descRef}
							className="text-gray-200 text-center md:text-right mb-8 text-xs max-w-3xl mx-auto md:ml-auto md:mr-0 w-full leading-relaxed"
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							pellentesque, neque ut tempor vulputate, nisi purus varius elit.{" "}
							<span className="text-cyan-400 font-bold">Join us</span> for an
							unforgettable experience with cutting-edge technology and
							innovative challenges.
						</p>

						{/* Enhanced button container - slightly reduced scale */}
						<RegisterButton />
					</div>
				</div>

				{/* Enhanced decorative elements connecting samurai to container - smaller */}
				<div className="absolute top-60 left-44 md:left-56 w-20 h-20 bg-transparent border-l-2 border-t-2 border-pink-500 transform -rotate-45 opacity-60" />

				{/* Additional decorative circuit lines - slightly smaller */}
				<div className="absolute -bottom-6 right-10 w-36 h-36">
					<svg width="100%" height="100%" viewBox="0 0 100 100">
						<title>Decorative overlay</title>
						<path
							d="M0,50 L20,50 L30,40 L70,40 L80,50 L100,50"
							stroke="#E957DD"
							strokeWidth="1.5"
							fill="none"
							strokeDasharray="5,5"
						/>
						<path
							d="M0,60 L30,60 L40,70 L60,70 L70,60 L100,60"
							stroke="#2a9fff"
							strokeWidth="1.5"
							fill="none"
							strokeDasharray="5,5"
						/>
					</svg>
				</div>

				{/* Digital data stream - smaller dots */}
				<div className="absolute h-36 w-[1px] top-[30%] right-[10%] overflow-hidden">
					<div className="h-full w-full relative">
						{Array.from({ length: 8 }).map((_, i) => (
							<motion.div
								key={`data-stream-${i}-${Math.random()}`}
								className="absolute w-[2px] h-[2px] bg-cyan-400 left-0"
								style={{ top: `${i * 12}%` }}
								animate={{
									top: ["0%", "100%"],
									opacity: [0, 1, 0],
								}}
								transition={{
									duration: 2,
									delay: i * 0.2,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								}}
							/>
						))}
					</div>
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

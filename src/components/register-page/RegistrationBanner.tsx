"use client";
import RegisterButton from "@/components/register-page/RegisterButton";
import { getImagePath } from "@/lib/imagePath";
import { motion } from "framer-motion";
import gsap from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Import the Ready Player One font
const readyplayerone = localFont({ src: "../../../public/font.otf" });

export default function RegistrationBanner() {
	const [glitchActive, setGlitchActive] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const bannerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const samuraiRef = useRef<HTMLDivElement>(null);
	const scanlineRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	// Flag to track if animations are initialized
	const [animationsInitialized, setAnimationsInitialized] = useState(false);
	// Track section visibility for viewport integration
	const [isVisible, setIsVisible] = useState(false);
	// Observer to detect when component is in viewport
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();

		// Register GSAP plugins
		gsap.registerPlugin(TextPlugin);

		// Add resize listener
		window.addEventListener("resize", checkMobile);

		// Create intersection observer to detect when element is in viewport
		observerRef.current = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.2 }, // Start when 20% visible
		);

		// Observe the banner element
		if (bannerRef.current) {
			observerRef.current.observe(bannerRef.current);
		}

		return () => {
			// Remove resize listener
			window.removeEventListener("resize", checkMobile);

			// Clean up observer
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	// Initialize or reinitialize animations when component becomes visible
	useEffect(() => {
		if (!isVisible) return;

		// Clean up any existing animations
		gsap.killTweensOf([
			bannerRef.current,
			samuraiRef.current,
			titleRef.current,
			descRef.current,
			gridRef.current,
			scanlineRef.current,
			terminalRef.current,
		]);

		// Terminal text effect
		animateTerminalText();

		if (!animationsInitialized) {
			// Animation timeline that runs when section becomes visible
			const tl = gsap.timeline({
				delay: 0.3, // Short delay before animation starts
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
						onComplete: () => {
							setAnimationsInitialized(true);
						},
					},
					"-=0.3",
				);
		} else {
			// If animations were already played once, just make sure elements are visible
			gsap.set(
				[
					bannerRef.current,
					samuraiRef.current,
					titleRef.current,
					descRef.current,
				],
				{ opacity: 1, y: 0 },
			);

			// Restart glitch effect
			initGlitchEffect();
		}
	}, [isVisible, animationsInitialized]);

	// Glitch interval ref to track and clear interval
	const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Initialize glitch effect on title
	const initGlitchEffect = () => {
		if (!titleRef.current) return;

		// Clear existing intervals if they exist
		if (glitchIntervalRef.current) {
			clearInterval(glitchIntervalRef.current);
			glitchIntervalRef.current = null;
		}

		if (glitchTimeoutRef.current) {
			clearTimeout(glitchTimeoutRef.current);
			glitchTimeoutRef.current = null;
		}

		// Create new random glitch intervals
		glitchIntervalRef.current = setInterval(
			() => {
				setGlitchActive(true);
				glitchTimeoutRef.current = setTimeout(
					() => setGlitchActive(false),
					200,
				);
			},
			Math.random() * 5000 + 3000,
		);

		// Return cleanup function
		return () => {
			if (glitchIntervalRef.current) {
				clearInterval(glitchIntervalRef.current);
				glitchIntervalRef.current = null;
			}
			if (glitchTimeoutRef.current) {
				clearTimeout(glitchTimeoutRef.current);
				glitchTimeoutRef.current = null;
			}
		};
	};

	// Cleanup glitch effect on unmount
	useEffect(() => {
		return () => {
			if (glitchIntervalRef.current) {
				clearInterval(glitchIntervalRef.current);
			}
			if (glitchTimeoutRef.current) {
				clearTimeout(glitchTimeoutRef.current);
			}
		};
	}, []);

	const animateTerminalText = () => {
		if (!terminalRef.current) return;

		// Kill any existing animations on the terminal
		gsap.killTweensOf(terminalRef.current);

		// Reset to initial state
		if (terminalRef.current) {
			terminalRef.current.textContent = "";
		}

		const commands = [
			"initializing system...",
			"loading user profiles...",
			"accessing registration modules...",
			"authenticating credentials...",
			"system ready",
		];

		// Create new timeline with a unique ID for better tracking
		const timeline = gsap.timeline({
			repeat: -1,
			repeatDelay: 5,
			id: "terminal-text-timeline",
		});

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
			className={`${readyplayerone.className} flex justify-center items-center min-h-screen bg-transparent p-4 sm:p-6 overflow-hidden opacity-100 animate-in`}
		>
			<div
				ref={bannerRef}
				className="relative w-full max-w-7xl mx-auto rounded-xl overflow-visible z-10"
			>
				{/* Samurai image - Position based on device size */}
				{!isMobile ? (
					<div
						ref={samuraiRef}
						className="absolute z-20 left-1 md:left-10 -top-4 md:-top-50 w-[450px] md:w-[600px] h-[520px] md:h-[720px] flex justify-start"
					>
						<Image
							src={getImagePath("/samurai.png")}
							alt="Samurai Warrior"
							fill
							className="object-contain"
							sizes="(max-width: 768px) 450px, 600px"
							priority
						/>

						{/* Enhanced energy aura effect */}
						<div className="absolute inset-0 opacity-20 blur-3xl rounded-full transform scale-75 translate-y-20">
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
				) : null}

				<div className="flex flex-col h-[600px] lg:h-[360px] md:flex-row items-center p-4 sm:p-6 md:p-12 pt-8 md:pt-28 pb-10 sm:pb-14 border-2 border-[#E957DD] bg-transparent shadow-2xl relative overflow-visible backdrop-blur-[2px]">
					{/* Enhanced border effects */}
					<div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-60 blur-md" />
					<div className="absolute inset-0 rounded-xl border-2 border-[#E957DD] opacity-30 blur-lg" />

					{/* Digital circuit pattern overlay */}
					<div className="absolute inset-0 overflow-hidden opacity-20 md:block hidden">
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

					<div className="absolute top-2 sm:top-3 left-2 sm:left-4 text-[8px] sm:text-[10px] text-cyan-400/70 font-mono">
						<div ref={terminalRef}> initializing system...</div>
					</div>

					{/* Content area with improved spacing */}
					<div className="w-full md:w-380 md:h-50 md:ml-auto flex flex-col mt-6 sm:mt-8 md:mt-0 md:pr-8 max-w-7xl">
						<h2
							ref={titleRef}
							className={`text-xl xs:text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center md:text-right text-cyan-400 tracking-wide w-full leading-tight relative ${glitchActive ? "glitch-text" : ""}`}
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

						{/* Description text with improved styling */}
						<p
							ref={descRef}
							className="text-gray-200 text-center md:text-right mb-6 md:mb-8 text-xs max-w-3xl mx-auto md:ml-auto md:mr-0 w-full leading-relaxed px-2 sm:px-0"
						>
							The portal is live and the arena awaits. Get ready to take on
							thrilling quests, unlock challenges, and rise through the
							leaderboard. This is your chance to step into{" "}
							<span className="text-cyan-400 font-bold">DUOTHON 5.0 </span>{" "}
							where every move matters. Ready to play?
						</p>

						{/* Enhanced button container */}
						<div className="flex justify-center md:justify-end w-full mb-4 md:mb-0">
							<RegisterButton />
						</div>

						{/* Samurai image in mobile view */}
						{isMobile && (
							<div ref={samuraiRef} className="w-full flex justify-center mt-4">
								<div className="relative z-20 w-full h-[280px] bottom-9">
									<Image
										src={getImagePath("/samurai-mobile.png")}
										alt="Samurai Warrior"
										fill
										className="object-contain scale-100"
										sizes="(max-width: 640px) 90vw"
										priority
									/>

									{/* Enhanced energy aura effect */}
									<div className="absolute inset-0 opacity-20 blur-3xl rounded-full transform scale-75 translate-y-20">
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
							</div>
						)}
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

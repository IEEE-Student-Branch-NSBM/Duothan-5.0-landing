"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
	useGSAP(() => {
		const tl = gsap.timeline({
			repeat: 0,
		});

		// const isMobile = window.innerWidth < 768;
		// These variables are defined but not currently used
		// const xOffset = isMobile ? 100 : 200;
		// const yOffset = isMobile ? 50 : 100;

		// Add glitch effect function
		const addGlitchEffect = (selector: string) => {
			return gsap
				.timeline()
				.to(selector, {
					filter: "hue-rotate(90deg) saturate(2) brightness(1.5)",
					x: "random(-6, 6)",
					y: "random(-4, 4)",
					scale: "random(0.98, 1.02)",
					duration: 0.04,
					ease: "none",
				})
				.to(selector, {
					filter: "hue-rotate(180deg) saturate(0.5) brightness(0.8)",
					x: "random(-4, 4)",
					y: "random(-2, 2)",
					scale: "random(0.99, 1.01)",
					duration: 0.03,
					ease: "none",
				})
				.to(selector, {
					filter: "hue-rotate(270deg) saturate(1.8) brightness(1.3)",
					x: "random(-6, 6)",
					y: "random(-4, 4)",
					scale: "random(0.97, 1.03)",
					duration: 0.04,
					ease: "none",
				})
				.to(selector, {
					filter: "hue-rotate(360deg) saturate(0.8) brightness(1.1)",
					x: "random(-3, 3)",
					y: "random(-2, 2)",
					scale: 1,
					duration: 0.03,
					ease: "none",
				})
				.to(selector, {
					filter: "hue-rotate(0deg) saturate(1) brightness(1)",
					x: 0,
					y: 0,
					scale: 1,
					duration: 0.06,
					ease: "power2.out",
				});
		};

		// Add dramatic entrance effect
		const addEntranceEffect = (selector: string) => {
			const element = document.querySelector(selector);
			if (!element) return gsap.timeline();

			// Create screen flash
			const screenFlash = document.createElement("div");
			screenFlash.className = "screen-flash";
			document.body.appendChild(screenFlash);

			// Create particle container
			const particleContainer = document.createElement("div");
			particleContainer.className = "absolute inset-0 pointer-events-none";
			element.parentElement?.appendChild(particleContainer);

			// Create energy particles
			for (let i = 0; i < 12; i++) {
				const particle = document.createElement("div");
				particle.className = "energy-particle";
				particle.style.left = `${40 + Math.random() * 20}%`;
				particle.style.bottom = `${5 + Math.random() * 30}%`;
				particle.style.animationDelay = `${Math.random() * 0.5}s`;
				particleContainer.appendChild(particle);
			}

			// Clean up particles after animation
			setTimeout(() => {
				particleContainer.remove();
				screenFlash.remove();
			}, 2500);

			return gsap
				.timeline()
				.set(selector, {
					scale: 0.3,
					opacity: 0,
					filter: "blur(10px) drop-shadow(0 0 20px rgba(255, 0, 193, 0.8))",
				})
				.to(selector, {
					scale: 1.1,
					opacity: 1,
					filter: "blur(0px) drop-shadow(0 0 30px rgba(255, 0, 193, 1))",
					duration: 0.3,
					ease: "back.out(2)",
				})
				.to(selector, {
					scale: 1,
					filter:
						"drop-shadow(0 0 15px rgba(255, 0, 193, 0.6)) drop-shadow(0 0 25px rgba(0, 255, 249, 0.4))",
					duration: 0.2,
					ease: "power2.out",
				})
				.to(selector, {
					filter:
						"drop-shadow(0 0 5px rgba(255, 0, 193, 0.3)) drop-shadow(0 0 10px rgba(0, 255, 249, 0.2))",
					duration: 0.3,
					ease: "power2.out",
				});
		};

		// Hide elements initially
		gsap.to(".samurai-2", { opacity: 0, duration: 0 });
		gsap.to(".samurai-4", { opacity: 0, duration: 0 });
		gsap.to(".duothan-logo", { opacity: 0, duration: 0 });
		// gsap.to(".player-ready-text", { opacity: 0, duration: 0 });
		gsap.to(".scroll-indicator", { opacity: 0, duration: 0 });

		tl.to(".samurai-3", { opacity: 0, duration: 0.3, delay: 1 })
			.set(".samurai-3", { opacity: 0 })
			.add(addGlitchEffect(".samurai-2"), "+=0.2")
			.add(addEntranceEffect(".samurai-2"), "-=0.5")
			.to(".samurai-2", { opacity: 0, duration: 0.3, delay: 1 })
			.set(".samurai-2", { opacity: 0 })
			.add(addGlitchEffect(".samurai-4"), "+=0.2")
			.add(addEntranceEffect(".samurai-4"), "-=0.5")
			.to(".samurai-4", { opacity: 0, duration: 0.1, delay: 1 })
			.set(".samurai-4", { opacity: 0 })
			.to(".duothan-logo", { opacity: 0.5, duration: 0.5, delay: 0.2 })
			.to(".samurai-4", { opacity: 1, duration: 0.3, delay: 0.1 })
			.to(".hero-background", { opacity: 0, duration: 1, delay: 0.2 })
			// Add text and scroll indicator animations
			// .to(".player-ready-text", {
			// 	opacity: 1,
			// 	y: 0,
			// 	filter: "drop-shadow(0 0 10px rgba(102, 247, 255, 0.6))",
			// 	duration: 0.8,
			// 	ease: "power2.out",
			// 	delay: 0.3
			// })
			.to(".scroll-indicator", {
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power2.out",
				delay: 0.2,
			});

		// Continuous bounce animation for scroll indicator
		gsap.to(".scroll-indicator", {
			y: 8,
			duration: 1.5,
			repeat: -1,
			yoyo: true,
			ease: "power2.inOut",
			delay: 6,
		});

		// Add pulsing glow effect to text
		// gsap.to(".player-ready-text", {
		// 	filter: "drop-shadow(0 0 20px rgba(102, 247, 255, 0.8))",
		// 	duration: 2,
		// 	repeat: -1,
		// 	yoyo: true,
		// 	ease: "power2.inOut",
		// 	delay: 6
		// });
	});

	const handleScrollDown = () => {
		window.scrollTo({
			top: window.innerHeight,
			behavior: "smooth",
		});
	};

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative">
			{/* Display Recommendation Disclaimer */}
			<div className="absolute top-3 left-3 z-40 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1 border border-cyan-400/20">
				<p
					className="text-cyan-400 text-[10px] opacity-80"
					style={{
						fontFamily: "'Orbitron', monospace",
						textShadow: "0 0 2px rgba(102, 247, 255, 0.4)",
					}}
				>
					Recommended: 1080p display with 100% scaling
				</p>
			</div>

			<div className="absolute inset-0 hero-background bg-[url('/backdrop_hero.svg')] bg-cover bg-center bg-no-repeat z-0" />

			{/* Player Ready Text */}
			{/* <div className="absolute top-100 z-30 player-ready-text transform translate-y-4">
				<h1 
					className="text-4xl md:text-6xl lg:text-7xl font-bold text-cyan-400 text-center"
					style={{ 
						fontFamily: "'Orbitron', monospace",
						textShadow: "0 0 10px rgba(102, 247, 255, 0.5), 0 0 20px rgba(102, 247, 255, 0.3), 0 0 30px rgba(102, 247, 255, 0.1)",
						letterSpacing: "0.1em"
					}}
				>
					Player, Are you ready?
				</h1>
			</div> */}

			{/* Scroll Down Indicator */}
			<button
				type="button"
				className="absolute bottom-6 z-30 scroll-indicator cursor-pointer transform translate-y-4 flex flex-col items-center bg-transparent border-0"
				onClick={handleScrollDown}
				aria-label="Scroll down to next section"
			>
				<span
					className="text-white text-xs md:text-sm mb-1 opacity-80"
					style={{
						fontFamily: "'Orbitron', monospace",
						textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
					}}
				>
					SCROLL DOWN
				</span>
				<FaChevronDown
					className="text-cyan-400 text-xl md:text-2xl"
					style={{
						filter: "drop-shadow(0 0 8px rgba(102, 247, 255, 0.6))",
					}}
				/>
			</button>

			<div
				className="absolute z-10 duothan-logo transition-all duration-300 opacity-50 
				w-[240px] h-[240px] 
				sm:w-[320px] sm:h-[320px] 
				md:w-[400px] md:h-[400px] 
				lg:w-[480px] lg:h-[480px] 
				xl:w-[560px] xl:h-[560px]
				left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
			>
				<Image
					src="/onlylogo.svg"
					alt="Duothan Logo"
					className="w-full h-full"
					width={700}
					height={700}
					priority
					style={{
						filter: "brightness(0) saturate(100%)",
						mixBlendMode: "multiply",
					}}
				/>
				<div
					className="absolute inset-0 w-full h-full"
					style={{
						backgroundColor: "#E91054",
						mixBlendMode: "screen",
						maskImage: "url(/onlylogo.svg)",
						maskSize: "contain",
						maskRepeat: "no-repeat",
						maskPosition: "center",
						WebkitMaskImage: "url(/onlylogo.svg)",
						WebkitMaskSize: "contain",
						WebkitMaskRepeat: "no-repeat",
						WebkitMaskPosition: "center",
					}}
				/>
			</div>
			<Image
				src="/hero_samurai_3.svg"
				alt="Samurai"
				className="absolute bottom-10 z-20 samurai-4 transition-all duration-300 
					w-[320px] h-[320px] 
					sm:w-[380px] sm:h-[380px] 
					md:w-[430px] md:h-[430px] 
					lg:w-[480px] lg:h-[480px] 
					xl:w-[540px] xl:h-[540px]"
				width={540}
				height={540}
				priority
			/>
			<Image
				src="/hero_samurai_2.svg"
				alt="Samurai"
				className="absolute bottom-25 z-20 brightness-60 scale-x-[-1] samurai-2 transition-all duration-300 
					w-[160px] h-[160px] 
					sm:w-[180px] sm:h-[180px] 
					md:w-[190px] md:h-[190px] 
					lg:w-[210px] lg:h-[210px] 
					xl:w-[220px] xl:h-[220px]"
				width={220}
				height={220}
				priority
			/>
			<Image
				src="/hero_samurai_1.svg"
				alt="Samurai"
				className="greyscale brightness-20 absolute bottom-30 z-20 samurai-3 transition-all duration-300 
					w-[65px] h-[65px] 
					sm:w-[70px] sm:h-[70px] 
					md:w-[80px] md:h-[80px] 
					lg:w-[90px] lg:h-[90px] 
					xl:w-[100px] xl:h-[100px]"
				width={100}
				height={100}
				priority
			/>
		</div>
	);
};

export default HeroSection;

"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
	useGSAP(() => {
		// initial states
		gsap.set(".samurai-2", {
			opacity: 0,
			x: 300,
			y: -100,
			rotation: 45,
			scale: 0.5,
		});
		gsap.set(".samurai-3", {
			opacity: 0,
			x: -200,
			y: 200,
			rotation: -30,
			scale: 0.3,
		});
		gsap.set(".samurai-4", {
			opacity: 0,
			y: 100,
			scale: 0.8,
			rotation: 10,
		});

		const mainTl = gsap.timeline();

		// animations with staggered delays
		mainTl
			.to(".samurai-4", {
				opacity: 1,
				y: 0,
				scale: 1,
				rotation: 0,
				duration: 1.5,
				ease: "back.out(1.7)",
			})
			.to(
				".samurai-2",
				{
					opacity: 1,
					x: 0,
					y: 0,
					rotation: 0,
					scale: 1,
					duration: 1.2,
					ease: "elastic.out(1, 0.5)",
				},
				"-=0.8",
			)
			.to(
				".samurai-3",
				{
					opacity: 1,
					x: 0,
					y: 0,
					rotation: 0,
					scale: 1,
					duration: 1,
					ease: "bounce.out",
				},
				"-=0.6",
			);

		// Continuous floating
		gsap.to(".samurai-4", {
			y: -20,
			rotation: -5,
			duration: 3,
			ease: "sine.inOut",
			repeat: -1,
			yoyo: true,
			delay: 2,
		});

		gsap.to(".samurai-2", {
			x: 30,
			y: -15,
			rotation: 10,
			duration: 4,
			ease: "sine.inOut",
			repeat: -1,
			yoyo: true,
			delay: 2.5,
		});

		gsap.to(".samurai-3", {
			x: -20,
			y: 25,
			rotation: 15,
			scale: 1.1,
			duration: 5,
			ease: "sine.inOut",
			repeat: -1,
			yoyo: true,
			delay: 3,
		});

		// Subtle breathing/pulsing effect
		gsap.to(".samurai-2", {
			scale: 1.05,
			duration: 2,
			ease: "sine.inOut",
			repeat: -1,
			yoyo: true,
			delay: 4,
		});

		// Orbital movement
		gsap.to(".samurai-3", {
			motionPath: {
				path: "M0,0 Q50,-30 100,0 Q50,30 0,0",
				autoRotate: false,
			},
			duration: 8,
			ease: "none",
			repeat: -1,
			delay: 5,
		});

		// hover effects
		const samurais = document.querySelectorAll('[class*="samurai-"]');
		for (const samurai of samurais) {
			samurai.addEventListener("mouseenter", () => {
				gsap.to(samurai, {
					scale: 1.2,
					// rotation: "+=360",
					duration: 0.5,
					ease: "back.out(1.7)",
				});
			});

			samurai.addEventListener("mouseleave", () => {
				gsap.to(samurai, {
					scale: 1,
					duration: 0.3,
					ease: "power2.out",
				});
			});
		}
	}, []);

	return (
		// <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
		<div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
			{/* Animated background elements */}
			{/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" /> */}
			{/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]" /> */}
			{/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]" /> */}

			{/* Logo section */}
			{/* <div className="absolute w-[90%] md:w-[800px] h-[60px] md:h-[96px] top-[60px] md:top-[88px] rounded-2xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50" /> */}
			{/* <Image */}
			{/*   src="/logo-full.png" */}
			{/*   alt="Duothan 5.0 Logo" */}
			{/*   className="absolute w-[200px] md:w-[310.96px] h-auto md:h-[75px] top-[68px] md:top-[99px] z-10" */}
			{/*   width={800} */}
			{/*   height={96} */}
			{/*   priority */}
			{/* /> */}

			{/* Samurai images with enhanced positioning */}
			<Image
				src="/assets/hero/hero-samurai-4.png"
				alt="Main Samurai"
				className="absolute bottom-10 samurai-4 cursor-pointer z-20"
				width={680}
				height={680}
				priority
			/>
			<Image
				src="/assets/hero/hero-samurai-2.png"
				alt="Side Samurai"
				className="absolute top-1/2 right-10 md:right-20 brightness-75 scale-x-[-1] samurai-2 cursor-pointer z-10"
				width={280}
				height={280}
				priority
			/>
			<Image
				src="/assets/hero/hero-samurai-3.png"
				alt="Background Samurai"
				className="absolute bottom-1/3 left-10 md:left-20 samurai-3 cursor-pointer z-5 opacity-80 brightness-40"
				width={120}
				height={120}
				priority
			/>

			{/* Floating particles */}
			{/* <div className="absolute inset-0 pointer-events-none"> */}
			{/*   {[...Array(20)].map((_, i) => ( */}
			{/*     <div */}
			{/*       key={i} */}
			{/*       className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse" */}
			{/*       style={{ */}
			{/*         left: `${Math.random() * 100}%`, */}
			{/*         top: `${Math.random() * 100}%`, */}
			{/*         animationDelay: `${Math.random() * 3}s`, */}
			{/*         animationDuration: `${2 + Math.random() * 3}s`, */}
			{/*       }} */}
			{/*     /> */}
			{/*   ))} */}
			{/* </div> */}
		</div>
	);
};

export default HeroSection;

"use client";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface NeonRoseCardProps {
	children: React.ReactNode;
	title?: string;
	primaryColor?: string;
	secondaryColor?: string;
	backgroundColor?: string;
	borderColor?: string;
	width?: string | number;
	height?: string | number;
	className?: string;
}

const NeonRoseCard = ({
	children,
	title = "NETRUNNER",
	primaryColor = "#E957DD",
	secondaryColor = "#9559E9",
	backgroundColor = "#1A0A1E",
	borderColor = "#F0B5EA",
	width = "450px", // Increased from 400px
	height = "580px", // Increased from 500px
	className = "",
	...props
}: NeonRoseCardProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [pulseOpacity, setPulseOpacity] = useState(0.5);
	const [isLoaded, setIsLoaded] = useState(false);

	// Refs for animation
	const containerRef = useRef(null);
	const mainCardRef = useRef(null);
	const topLeftCornerRef = useRef(null);
	const topRightCornerRef = useRef(null);
	const bottomLeftCornerRef = useRef(null);
	const bottomRightCornerRef = useRef(null);
	const titleBarRef = useRef(null);
	const circleRef = useRef(null);
	const glowLayerRef = useRef(null);

	// Control pulsing effect
	useEffect(() => {
		const interval = setInterval(() => {
			setPulseOpacity((prev) => (prev === 0.5 ? 0.8 : 0.5));
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	// Initial load animation
	useEffect(() => {
		if (!isLoaded) {
			// Hide elements initially
			gsap.set([mainCardRef.current, titleBarRef.current], {
				autoAlpha: 0,
				y: 20,
			});

			gsap.set(
				[
					topLeftCornerRef.current,
					topRightCornerRef.current,
					bottomLeftCornerRef.current,
					bottomRightCornerRef.current,
				],
				{
					autoAlpha: 0,
					scale: 0.8,
				},
			);

			gsap.set(circleRef.current, {
				autoAlpha: 0,
				scale: 0,
			});

			gsap.set(glowLayerRef.current, {
				autoAlpha: 0,
			});

			// Create animation timeline
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
			});

			tl.to(mainCardRef.current, {
				autoAlpha: 1,
				y: 0,
				duration: 0.8,
			})
				.to(
					glowLayerRef.current,
					{
						autoAlpha: 0.7,
						duration: 0.6,
					},
					"-=0.4",
				)
				.to(
					[
						topLeftCornerRef.current,
						topRightCornerRef.current,
						bottomLeftCornerRef.current,
						bottomRightCornerRef.current,
					],
					{
						autoAlpha: 1,
						scale: 1,
						stagger: 0.1,
						duration: 0.5,
					},
					"-=0.3",
				)
				.to(
					titleBarRef.current,
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.5,
					},
					"-=0.6",
				)
				.to(
					circleRef.current,
					{
						autoAlpha: 1,
						scale: 1,
						duration: 0.6,
						ease: "elastic.out(1, 0.3)",
					},
					"-=0.4",
				);

			setIsLoaded(true);
		}
	}, [isLoaded]);

	// GSAP animations for hover/expansion
	useEffect(() => {
		if (isExpanded) {
			// Main rectangle glow up and scale
			gsap.to(mainCardRef.current, {
				scale: 1.02,
				boxShadow: `0 0 30px ${primaryColor}50`,
				duration: 0.7,
				ease: "power2.out",
			});

			// Increase glow layer opacity
			gsap.to(glowLayerRef.current, {
				autoAlpha: 1,
				duration: 0.6,
			});

			// Animate corners away from main rectangle with elastic effect
			gsap.to(topLeftCornerRef.current, {
				x: -30,
				y: -30,
				rotation: -8,
				duration: 1,
				ease: "elastic.out(1, 0.5)",
			});

			gsap.to(topRightCornerRef.current, {
				x: 30,
				y: -30,
				rotation: 8,
				duration: 1,
				ease: "elastic.out(1, 0.5)",
			});

			gsap.to(bottomLeftCornerRef.current, {
				x: -30,
				y: 30,
				rotation: 8,
				duration: 1,
				ease: "elastic.out(1, 0.5)",
			});

			gsap.to(bottomRightCornerRef.current, {
				x: 30,
				y: 30,
				rotation: -8,
				duration: 1,
				ease: "elastic.out(1, 0.5)",
			});

			// Animate title bar up with bounce
			gsap.to(titleBarRef.current, {
				y: -15,
				duration: 0.7,
				boxShadow: `0 0 15px ${primaryColor}`,
				ease: "back.out(1.7)",
			});

			// Animate circle with pulse
			gsap.to(circleRef.current, {
				scale: 1.3,
				boxShadow: `0 0 15px ${primaryColor}`,
				duration: 0.8,
				ease: "elastic.out(1, 0.3)",
			});

			// Show connection lines with staggered reveal
			gsap.to(".connection-line", {
				scaleX: 1,
				stagger: 0.1,
				duration: 0.4,
				ease: "power2.out",
			});

			// Pulse the corner glow
			gsap.to(".corner-glow", {
				opacity: 0.9,
				duration: 1,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
		} else {
			// Return everything to original positions
			gsap.to(mainCardRef.current, {
				scale: 1,
				boxShadow: `0 0 15px ${primaryColor}30`,
				duration: 0.5,
				ease: "power3.inOut",
			});

			// Reduce glow layer opacity
			gsap.to(glowLayerRef.current, {
				autoAlpha: 0.7,
				duration: 0.4,
			});

			gsap.to(
				[
					topLeftCornerRef.current,
					topRightCornerRef.current,
					bottomLeftCornerRef.current,
					bottomRightCornerRef.current,
				],
				{
					x: 0,
					y: 0,
					rotation: 0,
					duration: 0.6,
					ease: "power2.inOut",
				},
			);

			gsap.to(titleBarRef.current, {
				y: 0,
				boxShadow: `0 0 5px ${primaryColor}`,
				duration: 0.5,
				ease: "power2.inOut",
			});

			gsap.to(circleRef.current, {
				scale: 1,
				boxShadow: `0 0 5px ${primaryColor}`,
				duration: 0.5,
				ease: "power2.inOut",
			});

			// Hide connection lines
			gsap.to(".connection-line", {
				scaleX: 0,
				stagger: 0.05,
				duration: 0.3,
				ease: "power2.in",
			});

			// Stop corner glow animation
			gsap.killTweensOf(".corner-glow");
			gsap.to(".corner-glow", {
				opacity: 0.4,
				duration: 0.3,
			});
		}
	}, [isExpanded, primaryColor]);

	// Create dot pattern for background - adjusted for larger size
	const dotPattern = (
		<div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
			{Array.from({ length: 24 }).map((_, rowIndex) => (
				<div
					key={`dotPattern-row-${rowIndex}-${Math.random()}`}
					className="flex justify-start"
				>
					{Array.from({ length: 18 }).map((_, colIndex) => (
						<div
							key={`dotPattern-${rowIndex}-${colIndex}-${Math.random()}`}
							className="w-1 h-1 rounded-full m-5"
							style={{ backgroundColor: borderColor }}
						/>
					))}
				</div>
			))}
		</div>
	);

	return (
		<div
			className={`relative ${className}`}
			style={{ width, height }}
			ref={containerRef}
			onMouseEnter={() => {
				setTimeout(() => setIsExpanded(true), 200);
			}}
			onMouseLeave={() => {
				setIsExpanded(false);
			}}
			{...props}
		>
			{/* Ambient glow layer - enlarged */}
			<div
				ref={glowLayerRef}
				className="absolute inset-10 rounded-sm opacity-0 pointer-events-none blur-xl"
				style={{
					background: `radial-gradient(circle at center, ${primaryColor}80 0%, ${backgroundColor}00 70%)`,
					transform: "translateZ(0)", // Force GPU acceleration
				}}
			/>

			{/* Main rectangular card - enlarged */}
			<div
				ref={mainCardRef}
				className="absolute inset-10 bg-transparent border-2 rounded-sm transition-shadow duration-500"
				style={{
					borderColor,
					backgroundColor,
					boxShadow: `0 0 15px ${primaryColor}30`,
				}}
			>
				{/* Content */}
				<div className="relative h-full w-full p-8 overflow-hidden">
					{children}

					{/* Background dot pattern */}
					{dotPattern}

					{/* Watermark - enlarged */}
					<div className="absolute inset-0 flex items-center justify-center text-3xl opacity-10 pointer-events-none font-thin tracking-widest">
						<span style={{ color: primaryColor }}>CYBER</span>
					</div>
				</div>
			</div>

			{/* Top Left Corner - adjusted position for larger card */}
			<div
				ref={topLeftCornerRef}
				className="absolute top-10 left-10 w-10 h-10 origin-bottom-right z-10"
			>
				<div className="relative">
					<svg
						width="35"
						height="35"
						viewBox="0 0 35 35"
						role="img"
						aria-hidden="true"
					>
						<title>Top Left Corner Decoration</title>
						<path
							d="M0,35 L0,0 L35,0 Z"
							fill={backgroundColor}
							stroke={borderColor}
							strokeWidth="2"
						/>
					</svg>

					{/* Inner glow effect */}
					<div
						className="corner-glow absolute inset-0 opacity-40 pointer-events-none"
						style={{
							background: `linear-gradient(135deg, ${primaryColor} 0%, transparent 70%)`,
							clipPath: "polygon(0 0, 100% 0, 0 100%)",
						}}
					/>
				</div>

				{/* Connection line - enlarged */}
				<div
					className="connection-line absolute bottom-0 right-0 h-0.5 origin-right"
					style={{
						width: "30px",
						backgroundColor: primaryColor,
						boxShadow: `0 0 8px ${primaryColor}`,
						transform: "scaleX(0)",
					}}
				/>
			</div>

			{/* Top Right Corner - adjusted position for larger card */}
			<div
				ref={topRightCornerRef}
				className="absolute top-10 right-10 w-10 h-10 origin-bottom-left z-10"
			>
				<div className="relative">
					<svg width="35" height="35" viewBox="0 0 35 35">
						<title>Top Right Corner Decoration</title>
						<path
							d="M0,0 L35,0 L35,35 Z"
							fill={backgroundColor}
							stroke={borderColor}
							strokeWidth="2"
						/>
					</svg>

					{/* Inner glow effect */}
					<div
						className="corner-glow absolute inset-0 opacity-40 pointer-events-none"
						style={{
							background: `linear-gradient(225deg, ${primaryColor} 0%, transparent 70%)`,
							clipPath: "polygon(0 0, 100% 0, 100% 100%)",
						}}
					/>
				</div>

				{/* Connection line - enlarged */}
				<div
					className="connection-line absolute bottom-0 left-0 h-0.5 origin-left"
					style={{
						width: "30px",
						backgroundColor: primaryColor,
						boxShadow: `0 0 8px ${primaryColor}`,
						transform: "scaleX(0)",
					}}
				/>
			</div>

			{/* Bottom Left Corner - adjusted position for larger card */}
			<div
				ref={bottomLeftCornerRef}
				className="absolute bottom-10 left-10 w-10 h-10 origin-top-right z-10"
			>
				<div className="relative">
					<svg width="35" height="35" viewBox="0 0 35 35">
						<title>Bottom Left Corner Decoration</title>
						<path
							d="M0,0 L0,35 L35,35 Z"
							fill={backgroundColor}
							stroke={borderColor}
							strokeWidth="2"
						/>
					</svg>

					{/* Inner glow effect */}
					<div
						className="corner-glow absolute inset-0 opacity-40 pointer-events-none"
						style={{
							background: `linear-gradient(45deg, ${primaryColor} 0%, transparent 70%)`,
							clipPath: "polygon(0 0, 0 100%, 100% 100%)",
						}}
					/>
				</div>

				{/* Connection line - enlarged */}
				<div
					className="connection-line absolute top-0 right-0 h-0.5 origin-right"
					style={{
						width: "30px",
						backgroundColor: primaryColor,
						boxShadow: `0 0 8px ${primaryColor}`,
						transform: "scaleX(0)",
					}}
				/>
			</div>

			{/* Bottom Right Corner - adjusted position for larger card */}
			<div
				ref={bottomRightCornerRef}
				className="absolute bottom-10 right-10 w-10 h-10 origin-top-left z-10"
			>
				<div className="relative">
					<svg width="35" height="35" viewBox="0 0 35 35">
						<title>Bottom Right Corner Decoration</title>
						<path
							d="M35,0 L35,35 L0,35 Z"
							fill={backgroundColor}
							stroke={borderColor}
							strokeWidth="2"
						/>
					</svg>

					{/* Inner glow effect */}
					<div
						className="corner-glow absolute inset-0 opacity-40 pointer-events-none"
						style={{
							background: `linear-gradient(315deg, ${primaryColor} 0%, transparent 70%)`,
							clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
						}}
					/>
				</div>

				{/* Connection line - enlarged */}
				<div
					className="connection-line absolute top-0 left-0 h-0.5 origin-left"
					style={{
						width: "30px",
						backgroundColor: primaryColor,
						boxShadow: `0 0 8px ${primaryColor}`,
						transform: "scaleX(0)",
					}}
				/>
			</div>

			{/* Title bar - enlarged */}
			<div
				ref={titleBarRef}
				className="absolute top-2 left-1/2 transform -translate-x-1/2 w-56 h-8 border-1.5 flex items-center justify-center opacity-0"
				style={{
					borderColor,
					backgroundColor: `${backgroundColor}ee`,
					boxShadow: `0 0 5px ${primaryColor}`,
				}}
			>
				<div
					className="absolute left-0 right-0 top-0 bottom-0 border"
					style={{ borderColor: borderColor }}
				/>

				{/* Title content - enlarged */}
				<span
					className="text-sm z-10 px-4 font-mono tracking-wider"
					style={{ color: borderColor }}
				>
					{title}
				</span>

				{/* Rose pill element - enlarged */}
				<div
					className="absolute h-5 w-14 rounded-full right-3"
					style={{
						backgroundColor: primaryColor,
						boxShadow: `0 0 10px ${primaryColor}`,
						opacity: pulseOpacity,
						transition: "opacity 2s ease-in-out",
					}}
				/>
			</div>

			{/* Circle element - enlarged */}
			<div
				ref={circleRef}
				className="absolute top-[60px] left-[60px] w-6 h-6 rounded-full border opacity-0"
				style={{
					borderColor,
					boxShadow: `0 0 5px ${primaryColor}`,
				}}
			>
				<div
					className="w-full h-full rounded-full"
					style={{
						border: `0.5px solid ${borderColor}`,
						opacity: pulseOpacity,
					}}
				/>
			</div>

			{/* Animated energy particles - adjusted for larger card */}
			<AnimatePresence>
				{isExpanded &&
					[...Array(8)].map((_, index) => (
						<motion.div
							key={`particle-${Math.random()}`}
							className="absolute w-1.5 h-1.5 rounded-full z-20 pointer-events-none"
							style={{
								backgroundColor: primaryColor,
								boxShadow: `0 0 5px ${primaryColor}`,
								top: `${45 + (index % 4) * 15}%`,
								left: `${35 + (index % 3) * 15}%`,
							}}
							initial={{ opacity: 0, scale: 0 }}
							animate={{
								opacity: [0, 1, 0],
								scale: [0, 1.5, 0],
								x: index % 2 === 0 ? [-25, 25] : [25, -25],
								y: index % 2 === 0 ? [-25, 25] : [25, -25],
							}}
							transition={{
								duration: 2,
								delay: index * 0.2,
								repeat: Number.POSITIVE_INFINITY,
								repeatDelay: Math.random() * 2,
							}}
							exit={{ opacity: 0, scale: 0 }}
						/>
					))}
			</AnimatePresence>

			{/* SVG connections with glow effect - adjusted for larger card */}
			<svg className="absolute inset-0 z-15 pointer-events-none">
				<title>SVG Connections</title>
				<defs>
					<filter id="neon-glow">
						<feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>

					<linearGradient
						id="connection-gradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
						<stop offset="50%" stopColor={secondaryColor} stopOpacity="1" />
						<stop offset="100%" stopColor={primaryColor} stopOpacity="1" />
					</linearGradient>
				</defs>

				{isExpanded && (
					<>
						{/* Adjusted curved connection paths for larger card */}
						<motion.path
							d="M45,80 C35,100 50,120 65,100"
							stroke="url(#connection-gradient)"
							strokeWidth={1.5}
							fill="none"
							filter="url(#neon-glow)"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
						/>
						<motion.path
							d="M405,80 C415,100 400,120 385,100"
							stroke="url(#connection-gradient)"
							strokeWidth={1.5}
							fill="none"
							filter="url(#neon-glow)"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
						/>
						<motion.path
							d="M45,500 C35,480 50,460 65,480"
							stroke="url(#connection-gradient)"
							strokeWidth={1.5}
							fill="none"
							filter="url(#neon-glow)"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
						/>
						<motion.path
							d="M405,500 C415,480 400,460 385,480"
							stroke="url(#connection-gradient)"
							strokeWidth={1.5}
							fill="none"
							filter="url(#neon-glow)"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
						/>
					</>
				)}
			</svg>
		</div>
	);
};

export default NeonRoseCard;

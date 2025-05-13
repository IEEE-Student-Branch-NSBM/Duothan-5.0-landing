"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

function RegisterButton() {
	const [isHovered, setIsHovered] = useState(false);
	const btnRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		gsap.fromTo(
			btnRef.current,
			{
				scale: 0.8,
				opacity: 0,
			},
			{
				scale: 1,
				opacity: 1,
				duration: 0.6,
				ease: "elastic.out(1, 0.5)",
				delay: -0.2,
			},
		);
	}, []);

	return (
		<div className="w-full flex justify-center md:justify-end">
			<div
				ref={btnRef}
				className="relative transform scale-100 md:scale-110"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Enhanced cyberpunk button */}
				<button type="button" className="relative group">
					{/* Outer glow */}
					<div
						className={`absolute inset-0 rounded bg-transparent transform skew-x-[-20deg] scale-x-110 scale-y-110 transition-all duration-300 ${isHovered ? "bg-cyan-400/10 shadow-[0_0_25px_rgba(0,255,247,0.6)]" : "shadow-[0_0_15px_rgba(0,255,247,0.3)]"}`}
					/>

					{/* Blue outline */}
					<div className="absolute inset-0 bg-transparent border-2 border-cyan-400 transform skew-x-[-20deg] scale-x-110 scale-y-110 shadow-[0_0_15px_rgba(0,255,247,0.5)]" />

					{/* Pink background with enhanced effects - smaller padding */}
					<div
						className={`relative bg-[#E957DD] transform skew-x-[-20deg] px-16 py-4 transition-all duration-300 ${isHovered ? "bg-pink-400/90 shadow-[0_0_20px_rgba(236,39,180,0.6)]" : ""}`}
					>
						{/* Improved notches with animation */}
						<div
							className={`absolute right-8 top-0 w-3 h-full bg-gray-900/80 transition-all duration-300 ${isHovered ? "h-[60%] top-[20%]" : ""}`}
						/>
						<div
							className={`absolute right-14 top-0 w-2 h-full bg-gray-900/80 transition-all duration-300 ${isHovered ? "h-[70%] top-[15%]" : ""}`}
						/>

						{/* Left side notches */}
						<div
							className={`absolute left-6 top-0 w-2 h-full bg-gray-900/80 transition-all duration-300 ${isHovered ? "h-[80%] top-[10%]" : ""}`}
						/>

						{/* Glowing inner line */}
						<div
							className={`absolute left-12 top-[10%] w-[1px] h-[80%] bg-cyan-400 opacity-60 transition-all duration-300 ${isHovered ? "opacity-100 shadow-[0_0_5px_cyan-400]" : ""}`}
						/>

						{/* Enhanced button text with arrow - smaller text */}
						<div className="relative z-10 transform skew-x-[20deg] flex items-center justify-center gap-2">
							<span className="text-white font-bold tracking-widest text-lg md:text-lg">
								REGISTER NOW
							</span>
							<FaArrowRight
								className={`text-white text-sm transition-all duration-300 ${isHovered ? "translate-x-2" : ""}`}
							/>
						</div>
					</div>

					{/* Enhanced glow effect on hover */}
					<div
						className={`absolute inset-0 bg-[#E957DD] opacity-0 transform skew-x-[-20deg] scale-x-110 scale-y-110 ${isHovered ? "opacity-40 blur-md" : ""} transition-opacity duration-300`}
					/>
				</button>
			</div>
		</div>
	);
}

export default RegisterButton;

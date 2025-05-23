"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

function RegisterButton() {
	const [isHovered, setIsHovered] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const btnRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Check if device is mobile
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initial check
		checkMobile();

		// Add resize listener
		window.addEventListener("resize", checkMobile);

		// Entrance animation
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

		// Add touch event handlers for mobile
		const btnElement = btnRef.current;
		if (btnElement) {
			const handleTouchStart = () => setIsHovered(true);
			const handleTouchEnd = () => {
				setIsHovered(false);
				// Add a slight delay before removing hover effect
				setTimeout(() => setIsHovered(false), 200);
			};

			btnElement.addEventListener("touchstart", handleTouchStart);
			btnElement.addEventListener("touchend", handleTouchEnd);

			// Cleanup
			return () => {
				window.removeEventListener("resize", checkMobile);
				btnElement.removeEventListener("touchstart", handleTouchStart);
				btnElement.removeEventListener("touchend", handleTouchEnd);
			};
		}

		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	return (
		<div className="w-full flex justify-center xl:justify-end">
			<div
				ref={btnRef}
				className="relative transform scale-60 xs:scale-65 sm:scale-70 md:scale-75 lg:scale-80 xl:scale-90"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<button type="button" className="relative group">
					<div
						className={`absolute inset-0 rounded bg-transparent transform skew-x-[-20deg] scale-x-110 scale-y-110 transition-all duration-300 ${isHovered ? "bg-cyan-400/10 shadow-[0_0_25px_rgba(0,255,247,0.6)]" : "shadow-[0_0_15px_rgba(0,255,247,0.3)]"}`}
					/>

					<div className="absolute inset-0 bg-transparent border-2 border-cyan-400 transform skew-x-[-20deg] scale-x-110 scale-y-110 shadow-[0_0_15px_rgba(0,255,247,0.5)]" />

					<div
						className={`relative bg-[#E957DD] transform skew-x-[-20deg] px-5 xs:px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-1.5 xs:py-2 sm:py-2.5 md:py-3 transition-all duration-300 ${isHovered ? "bg-pink-400/90 shadow-[0_0_20px_rgba(236,39,180,0.6)]" : ""}`}
					>
						<div
							className={`absolute right-2 sm:right-4 md:right-6 top-0 w-1 sm:w-1.5 md:w-2 h-full bg-gray-900/80 transition-all duration-300 ${isHovered ? "h-[60%] top-[20%]" : ""}`}
						/>
						<div
							className={`absolute right-4 sm:right-8 md:right-10 top-0 w-0.5 sm:w-1 md:w-1.5 h-full bg-gray-900/80 transition-all duration-300 ${isHovered ? "h-[70%] top-[15%]" : ""}`}
						/>

						<div
							className={`absolute left-2 sm:left-4 top-0 w-0.5 sm:w-1 h-full bg-gray-900/80 transition-all duration-300 ${isHovered ? "h-[80%] top-[10%]" : ""}`}
						/>

						<div
							className={`absolute left-4 sm:left-6 md:left-8 top-[10%] w-[1px] h-[80%] bg-cyan-400 opacity-60 transition-all duration-300 ${isHovered ? "opacity-100 shadow-[0_0_5px_cyan-400]" : ""}`}
						/>

						<div className="relative z-10 transform skew-x-[20deg] flex items-center justify-center gap-1 sm:gap-1.5">
							<span className="text-white font-bold tracking-wide sm:tracking-wider md:tracking-widest text-[10px] xs:text-xs sm:text-sm md:text-base">
								REGISTER NOW
							</span>
							<FaArrowRight
								className={`text-white text-[8px] xs:text-[10px] sm:text-xs md:text-sm transition-all duration-300 ${isHovered ? "translate-x-0.5 sm:translate-x-1" : ""}`}
							/>
						</div>
					</div>

					<div
						className={`absolute inset-0 bg-[#E957DD] opacity-0 transform skew-x-[-20deg] scale-x-110 scale-y-110 ${isHovered ? "opacity-40 blur-md" : ""} transition-opacity duration-300`}
					/>
				</button>

				{isMobile && (
					<div
						className={`absolute inset-0 bg-white/10 transform skew-x-[-20deg] scale-x-110 scale-y-110 transition-opacity duration-200 rounded pointer-events-none ${isHovered ? "opacity-30" : "opacity-0"}`}
					/>
				)}
			</div>
		</div>
	);
}

export default RegisterButton;

import { Electrolize } from "next/font/google";
import { useEffect, useState } from "react";
import {
	FaChevronDown,
	FaChevronUp,
	FaFacebookF,
	FaGlobe,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";

const electrolize = Electrolize({ subsets: ["latin"], weight: "400" });

export default function Footer() {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	// Animation effect when footer appears
	useEffect(() => {
		// Set a short delay to trigger the animation
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	// Detect if we're on mobile
	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkIsMobile();
		window.addEventListener("resize", checkIsMobile);

		return () => {
			window.removeEventListener("resize", checkIsMobile);
		};
	}, []);

	// Define the content that will be hidden/shown
	const footerContent = (
		<>
			{/* Logos */}
			<div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8 mb-4">
				<img src="/DuoMain.svg" alt="Duothan Logo" className="h-12" />
				<img src="/sb.png" alt="NSBM Logo" className="h-8" />
				<img src="/cs.png" alt="IEEE CS Logo" className="h-11" />
				<img src="/wie.png" alt="WIE Logo" className="h-9" />
			</div>

			{/* Social Icons - Mobile Only */}
			<div className="flex justify-center gap-4 th text-white text-lg mb-4 mt-8 md:hidden">
				<a
					href="https://www.facebook.com/ieeensbm"
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="bg-white rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform">
						<FaFacebookF className="text-black hover:text-blue-500 cursor-pointer" />
					</div>
				</a>
				<a
					href="https://www.linkedin.com/company/ieeesbnsbm/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="bg-white rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform">
						<FaLinkedinIn className="text-black hover:text-blue-400 cursor-pointer" />
					</div>
				</a>
				<a
					href="https://www.instagram.com/ieee_nsbm?igsh=MXVtY3YwNDBvZTNrdg=="
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="bg-white rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform">
						<FaInstagram className="text-black hover:text-pink-400 cursor-pointer" />
					</div>
				</a>
				<a
					href="https://yourwebsite.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGlobe
						size={23}
						className="text-white hover:text-green-400 cursor-pointer"
					/>
				</a>
			</div>
		</>
	);

	return (
		<footer
			className={`fixed bg-black/10 backdrop-blur-md text-white bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
			}`}
		>
			<div className="max-w-6xl mx-auto px-15 py-6 text-center">
				{/* Mobile Toggle Button */}
				<div className="flex justify-center w-full md:hidden">
					<button
						type="button"
						className="cursor-pointer flex items-center justify-center pb-2 bg-transparent border-none"
						onClick={() => setIsExpanded(!isExpanded)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setIsExpanded(!isExpanded);
							}
						}}
						aria-label={isExpanded ? "Collapse footer" : "Expand footer"}
					>
						{isExpanded ? (
							<FaChevronDown className="text-[#66f7ff] hover:text-[#4ad8e0] transition-colors" />
						) : (
							<FaChevronUp className="text-[#66f7ff] hover:text-[#4ad8e0] transition-colors" />
						)}
					</button>
				</div>

				{/* Conditional Rendering for Mobile */}
				<div
					className={`transition-all duration-300 ease-in-out overflow-hidden ${
						isMobile && !isExpanded
							? "max-h-0 opacity-0"
							: "max-h-[500px] opacity-100 pt-6"
					}`}
				>
					{footerContent}

					{/* Divider Line */}
					<div className="h-px bg-white/20 my-4 w-full" />
				</div>

				{/* Bottom Section - Always visible */}
				<div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">
					<p className={electrolize.className}>
						All rights reserved, Developed by IEEE Computer Society of NSBM
					</p>

					{/* Social Icons - Desktop Only */}
					<div className="hidden md:flex gap-4 text-lg">
						<a
							href="https://www.facebook.com/ieeensbm"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="bg-white rounded-full w-5 h-5 flex items-center justify-center hover:scale-110 transition-transform">
								<FaFacebookF className="text-black hover:text-blue-500 cursor-pointer w-4 h-4 " />
							</div>
						</a>
						<a
							href="https://www.linkedin.com/company/ieeesbnsbm/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="bg-white rounded-full w-5 h-5 flex items-center justify-center hover:scale-110 transition-transform">
								<FaLinkedinIn className="text-black hover:text-blue-400 cursor-pointer w-4 h-4" />
							</div>
						</a>
						<a
							href="https://www.instagram.com/ieee_nsbm?igsh=MXVtY3YwNDBvZTNrdg=="
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="bg-white rounded-full w-5 h-5 flex items-center justify-center hover:scale-110 transition-transform">
								<FaInstagram className="text-black hover:text-pink-400 cursor-pointer w-4 h-4" />
							</div>
						</a>
						<a
							href="https://yourwebsite.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaGlobe
								size={20}
								className="text-white hover:text-green-400 cursor-pointer"
							/>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

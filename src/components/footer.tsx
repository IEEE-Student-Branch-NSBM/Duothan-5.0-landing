import { Electrolize } from "next/font/google";
import {
	FaFacebookF,
	FaLinkedinIn,
	FaInstagram,
	FaGlobe,
} from "react-icons/fa";

const electrolize = Electrolize({ subsets: ["latin"], weight: "400" });

export default function Footer() {
	return (
		<footer className="bg-black/10 backdrop-blur-md text-white">
			<div className="max-w-6xl mx-auto px-15 py-6 pt-12 text-center">
			{/* Logos */}
				<div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8 mb-4">
					<img src="/duo 5.png" alt="Duothan Logo" className="h-12" />
					<img src="/sb.png" alt="NSBM Logo" className="h-8" />
					<img src="/cs.png" alt="IEEE CS Logo" className="h-11" />
					<img src="/wie.png" alt="WIE Logo" className="h-9" />
				</div>


			{/* Social Icons - Mobile Only */}
				<div className="flex justify-center gap-4 text-white text-lg mb-4 mt-8 md:hidden">
					<a href="https://www.facebook.com/ieeensbm" target="_blank" rel="noopener noreferrer">
						<div className="bg-white rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform">
							<FaFacebookF className="text-black hover:text-blue-500 cursor-pointer" />
						</div>
					</a>
					<a href="https://www.linkedin.com/company/ieeesbnsbm/" target="_blank" rel="noopener noreferrer">
						<div className="bg-white rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform">
							<FaLinkedinIn className="text-black hover:text-blue-400 cursor-pointer" />
						</div>
					</a>
					<a href="https://www.instagram.com/ieee_nsbm?igsh=MXVtY3YwNDBvZTNrdg==" target="_blank" rel="noopener noreferrer">
						<div className="bg-white rounded-full w-6 h-6 flex items-center justify-center hover:scale-110 transition-transform">
							<FaInstagram className="text-black hover:text-pink-400 cursor-pointer" />
						</div>
					</a>
					<a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
						<FaGlobe size={23} className="text-white hover:text-green-400 cursor-pointer" />
					</a>
				</div>

			{/* Divider Line */}
				<div className="h-px bg-white/20 my-4 w-full" />

			{/* Bottom Section */}
				<div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">
					<p className={electrolize.className}>
						All rights reserved, Developed by IEEE Computer Society of NSBM
					</p>

			{/* Social Icons - Desktop Only */}
					<div className="hidden md:flex gap-4 text-lg">
						<a href="https://www.facebook.com/ieeensbm" target="_blank" rel="noopener noreferrer">
							<div className="bg-white rounded-full w-5 h-5 flex items-center justify-center hover:scale-110 transition-transform">
								<FaFacebookF className="text-black hover:text-blue-500 cursor-pointer w-4 h-4 " />
							</div>
						</a>
						<a href="https://www.linkedin.com/company/ieeesbnsbm/" target="_blank" rel="noopener noreferrer">
							<div className="bg-white rounded-full w-5 h-5 flex items-center justify-center hover:scale-110 transition-transform">
								<FaLinkedinIn className="text-black hover:text-blue-400 cursor-pointer w-4 h-4" />
							</div>
						</a>
						<a href="https://www.instagram.com/ieee_nsbm?igsh=MXVtY3YwNDBvZTNrdg==" target="_blank" rel="noopener noreferrer">
							<div className="bg-white rounded-full w-5 h-5 flex items-center justify-center hover:scale-110 transition-transform">
								<FaInstagram className="text-black hover:text-pink-400 cursor-pointer w-4 h-4" />
							</div>
						</a>
						<a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
							<FaGlobe size={20} className="text-white hover:text-green-400 cursor-pointer" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

import { Electrolize } from "next/font/google";

const electrolize = Electrolize({ subsets: ["latin"], weight: "400" });

export default function Footer() {
	return (
		<footer className="bg-black/10 backdrop-blur-md text-white">
			<div className="max-w-6xl mx-auto px-6 py-6 pt-12 text-center">
				{/* Logos */}
				<div className="flex flex-wrap justify-center items-center gap-15 mb-4">
					<img src="/duo 5.png" alt="Duothan Logo" className="h-10" />
					<img src="/sb.png" alt="NSBM Logo" className="h-6" />
					<img src="/cs.png" alt="IEEE CS Logo" className="h-9" />
					<img src="/wie.png" alt="WIE Logo" className="h-7" />
				</div>

				{/* Divider Line */}
				<div className="h-px bg-white/20 my-4 w-full" />

				{/* Footer Text */}
				<p className={`text-sm text-gray-300 ${electrolize.className}`}>
					All rights reserved, Developed by IEEE Computer Society of NSBM
				</p>
			</div>
		</footer>
	);
}

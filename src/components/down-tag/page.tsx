"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface DownTagProps {
	text?: string;
}

const DownTag = ({ text = "View Text Goes Here" }: DownTagProps) => {
	const dockRef = useRef(null);

	useEffect(() => {
		if (dockRef.current) {
			// Updated animation to prevent disappearing text
			gsap.from(dockRef.current, {
				y: 30,
				opacity: 0,
				duration: 1,
				ease: "power3.out",
			});

			// Add a persistent state to ensure visibility
			gsap.to(dockRef.current, {
				opacity: 1,
				duration: 0.5,
				delay: 0.8,
			});
		}
	}, []);

	return (
		<div className="fixed w-full h-[80px] overflow-hidden z-50 bottom-0">
			<div className="absolute inset-0">
				{/* layer 1 */}
				<div className="absolute bottom-2 left-0 w-full h-18 flex items-end justify-center">
					<Image
						src="/down_tag_1.svg"
						alt=""
						width={321}
						height={143}
						className="w-full max-w-none h-full"
					/>
				</div>

				<div className="absolute bottom-0 left-0 w-full h-18 flex items-end justify-center">
					<Image
						src="/down_tag_3.svg"
						alt=""
						width={321}
						height={143}
						className="mx-auto h-full object-contain"
					/>
				</div>

				{/* layer 2 */}
				<div className="absolute -bottom-1 left-0 w-full h-20 flex items-end justify-center">
					<Image
						src="/down_tag_2.svg"
						alt=""
						width={221}
						height={135}
						className="w-full max-w-none h-full"
					/>
				</div>

				{/* Dock title with improved positioning and visibility */}
				<div
					ref={dockRef}
					className="absolute bottom-10 left-0 right-0 transform z-10 pointer-events-none"
				>
					<div className="text-cyan-400 [text-shadow:0_0_8px_rgba(77,210,255,0.8)] text-center">
						<h2 className="text-2xl font-bold bg-clip-text">{text}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DownTag;

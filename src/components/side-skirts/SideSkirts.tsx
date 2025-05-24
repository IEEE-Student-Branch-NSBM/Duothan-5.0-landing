"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface SideSkirtProps {
	showSideSkirts?: boolean;
}

const SideSkirts = ({ showSideSkirts = true }: SideSkirtProps) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (showSideSkirts) {
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 300);
			return () => clearTimeout(timer);
		}
		setIsVisible(false);
	}, [showSideSkirts]);

	return (
		<div className="fixed inset-0 pointer-events-none z-10 hidden sm:flex justify-between items-stretch w-full h-full overflow-hidden">
			{/* Left side skirts */}
			<div
				className={`relative h-full w-24 md:w-36 ${isVisible ? "slide-in-left" : "opacity-0"}`}
			>
				<div className="absolute -left-3 top-0 h-full w-35">
					<Image
						src="/SideSkirt_0.svg"
						alt="Left Side Skirt Layer 0"
						width={90}
						height={900}
						className="h-full w-auto object-contain [filter:drop-shadow(0_0_15px_rgba(149,76,233,0.8))_drop-shadow(0_0_25px_rgba(149,76,233,0.6))] brightness-125 animate-pulse"
						priority
						unoptimized={true}
					/>
				</div>
				<div className="absolute -left-1 top-0 h-full w-40">
					<Image
						src="/SideSkirt_1.svg"
						alt="Left Side Skirt Layer 1"
						width={110}
						height={900}
						className="h-full w-auto object-contain [filter:drop-shadow(0_0_18px_rgba(149,76,233,0.6))] brightness-125 flickering"
						priority
						unoptimized={true}
					/>
				</div>
				<div className="absolute -left-1 top-0 h-full w-42">
					<Image
						src="/SideSkirt_2.svg"
						alt="Left Side Skirt Layer 2"
						width={130}
						height={900}
						className="h-full w-auto object-contain [filter:drop-shadow(0_0_25px_rgba(149,76,233,0.7))] brightness-150"
						priority
						unoptimized={true}
					/>
				</div>
				{/* Decorative element for left side */}
				<div className="absolute left-2 top-0 h-full w-10">
					<Image
						src="/SideSkirt_Decorative.svg"
						alt="Left Side Decorative Element"
						width={60}
						height={900}
						className="h-full w-auto object-contain opacity-90"
						priority
						unoptimized={true}
					/>
				</div>
				{/* Time element for left side */}
				<div className="absolute left-5 right-0 mx-auto h-full w-10 flex justify-center items-center">
					<Image
						src="/SideSkirt_Time.svg"
						alt="Left Side Time Element"
						width={60}
						height={100}
						className="h-auto w-full object-contain [filter:drop-shadow(0_0_8px_rgba(77,210,255,0.6))]"
						priority
						unoptimized={true}
					/>
					<div className="absolute flex flex-col items-center justify-center gap-5">
						<div className="flex text-cyan-400 text-xl font-bold [text-shadow:0_0_8px_rgba(77,210,255,0.6)] rotate-90">
							12
						</div>
						<div className="text-cyan-400 text-xs [text-shadow:0_0_8px_rgba(77,210,255,0.6)] rotate-90">
							Days
						</div>
					</div>
				</div>
			</div>

			{/* Right side skirts */}
			<div
				className={`relative h-full w-24 md:w-36 ${isVisible ? "slide-in-right" : "opacity-0"}`}
			>
				<div className="absolute -right-3 top-0 h-full w-35 transform scale-x-[-1]">
					<Image
						src="/SideSkirt_0.svg"
						alt="Right Side Skirt Layer 0"
						width={90}
						height={900}
						className="h-full w-auto object-contain [filter:drop-shadow(0_0_15px_rgba(149,76,233,0.5))] brightness-125 animate-pulse"
						priority
						unoptimized={true}
					/>
				</div>
				<div className="absolute -right-1 top-0 h-full w-40 transform scale-x-[-1]">
					<Image
						src="/SideSkirt_1.svg"
						alt="Right Side Skirt Layer 1"
						width={110}
						height={900}
						className="h-full w-auto object-contain [filter:drop-shadow(0_0_18px_rgba(149,76,233,0.6))] brightness-125 flickering"
						priority
						unoptimized={true}
					/>
				</div>
				<div className="absolute -right-1 top-0 h-full w-42 transform scale-x-[-1]">
					<Image
						src="/SideSkirt_2.svg"
						alt="Right Side Skirt Layer 2"
						width={130}
						height={900}
						className="h-full w-auto object-contain [filter:drop-shadow(0_0_25px_rgba(149,76,233,0.7))] brightness-150"
						priority
						unoptimized={true}
					/>
				</div>
				{/* Decorative element for right side */}
				<div className="absolute right-2 top-0 h-full w-10">
					<Image
						src="/SideSkirt_Decorative.svg"
						alt="Right Side Decorative Element"
						width={60}
						height={900}
						className="h-full w-auto object-contain opacity-90 transform scale-x-[-1]"
						priority
						unoptimized={true}
					/>
				</div>
				{/* Time element for right side */}
				<div className="absolute right-5 left-0 mx-auto h-full w-10 flex justify-center items-center">
					<Image
						src="/SideSkirt_Time.svg"
						alt="Right Side Time Element"
						width={60}
						height={100}
						className="h-auto w-full object-contain [filter:drop-shadow(0_0_8px_rgba(77,210,255,0.6))] transform scale-x-[-1]"
						priority
						unoptimized={true}
					/>
					<div className="absolute flex flex-col items-center justify-center gap-5 transform scale-x-[-1] scale-y-[-1]">
						<div className="text-cyan-400 text-xl font-bold [text-shadow:0_0_8px_rgba(77,210,255,0.6)] rotate-90">
							10
						</div>
						<div className="text-cyan-400 text-xs [text-shadow:0_0_8px_rgba(77,210,255,0.6)] rotate-90">
							Hours
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideSkirts;

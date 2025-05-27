"use client";
import { getImagePath } from "@/lib/imagePath";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useViewportScaling } from "../viewport/useViewportScaling";

interface MobileHeaderProps {
	/**
	 * Disable auto-scaling for this component
	 */
	disableScaling?: boolean;
}

const MobileHeader = ({ disableScaling = false }: MobileHeaderProps = {}) => {
	const headerRef = useRef<HTMLDivElement>(null);
	const layer0Ref = useRef<HTMLDivElement>(null);
	const layer1Ref = useRef<HTMLDivElement>(null);
	// const layer2Ref = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const { scaleStyle } = useViewportScaling({
		designWidth: 390, // Mobile design width
		designHeight: 844, // Mobile design height
		minScale: 0.8,
		maxScale: 1.2,
	});

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (
				!layer0Ref.current ||
				!layer1Ref.current ||
				!logoRef.current ||
				!buttonRef.current
			) {
				return;
			}

			// Initial states
			gsap.set([layer0Ref.current, layer1Ref.current], {
				opacity: 0,
				scale: 0.9,
			});
			gsap.set(logoRef.current, {
				opacity: 0,
				y: -20,
			});
			gsap.set(buttonRef.current, {
				opacity: 0,
				y: 20,
			});

			const tl = gsap.timeline();

			// Animate layers in sequence
			tl.to(layer0Ref.current, {
				opacity: 0.8,
				scale: 1,
				duration: 1,
				ease: "power2.out",
			})
				.to(
					layer1Ref.current,
					{
						opacity: 0.9,
						scale: 1,
						duration: 0.8,
						ease: "power2.out",
					},
					"-=0.6",
				)
				.to(
					logoRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "back.out(1.5)",
					},
					"-=0.3",
				)
				.to(
					buttonRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out",
					},
					"-=0.2",
				);
		}, headerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={headerRef}
			className={`fixed w-full h-[135px] overflow-hidden z-50 ${!disableScaling && scaleStyle ? "-top-2" : ""}`}
			style={disableScaling ? {} : scaleStyle}
		>
			<div className="relative w-full h-full flex flex-col items-center">
				{/* Layer 0 - Background layer */}
				<div
					ref={layer0Ref}
					className="absolute -top-10 left-0 w-full h-full flex items-start justify-center"
				>
					<Image
						src={getImagePath("/header_mobile_0.svg")}
						alt=""
						width={390}
						height={120}
						className="w-full h-full object-contain"
					/>
				</div>

				{/* Layer 1 - Middle layer */}
				<div
					ref={layer1Ref}
					className="absolute -top-9 left-0 w-full h-full flex items-start justify-center [filter:drop-shadow(0_0_12px_rgba(149,76,233,0.5))]"
				>
					<Image
						src={getImagePath("/header_mobile_1.svg")}
						alt=""
						width={390}
						height={120}
						className="w-full h-full object-contain opacity-70"
					/>
				</div>

				{/* Layer 2 - Top layer with glow effect */}
				{/* <div
					ref={layer2Ref}
					className="absolute -top-6 left-0 w-full h-full flex items-start justify-center brightness-110 [filter:drop-shadow(0_0_8px_rgba(149,76,233,0.8))]"
				>
					<Image
						src={getImagePath("/header_mobile_2.svg")}
						alt=""
						width={390}
						height={120}
						className="w-full h-full object-contain"
					/>
				</div> */}

				{/* Logo - Positioned for mobile */}
				<div
					ref={logoRef}
					className="absolute top-1 left-0 w-full flex justify-center"
				>
					<Image
						src={getImagePath("/assets/header/logo.svg")}
						alt="Duothan Logo"
						width={200}
						height={60}
						className="h-12 w-auto"
					/>
				</div>

				{/* Register Button - Mobile optimized */}
				<button
					type="button"
					ref={buttonRef}
					onClick={() => {
						const registrationSection = document.getElementById("registration");
						if (registrationSection) {
							registrationSection.scrollIntoView({ behavior: "smooth" });
						}
					}}
					className="absolute top-12 left-0 w-full flex items-center justify-center text-cyan-400 text-xs font-mono tracking-widest transition-all duration-300 hover:text-pink-500 group cursor-pointer"
				>
					<Image
						src={getImagePath("/assets/header/button.svg")}
						alt=""
						width={180}
						height={20}
						className="w-auto h-4 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(236,39,180,0.8)]"
					/>
					<span className="absolute inset-0 flex items-center justify-center text-cyan-400 text-[10px] tracking-widest transition-all duration-300 group-hover:text-pink-500">
						{">> REGISTER NOW <<"}
					</span>
				</button>
			</div>
		</div>
	);
};

export default MobileHeader;

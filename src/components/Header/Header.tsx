"use client";
import { getImagePath } from "@/lib/imagePath";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useViewportScaling } from "../viewport/useViewportScaling";
import MobileHeader from "./MobileHeader";

interface HeaderProps {
	/**
	 * Disable auto-scaling for this component
	 */
	disableScaling?: boolean;
}

const Header = ({ disableScaling = false }: HeaderProps = {}) => {
	const headerRef = useRef<HTMLDivElement>(null);
	const layer1Ref = useRef<HTMLDivElement>(null);
	const layer2Ref = useRef<HTMLDivElement>(null);
	const layer3Ref = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);

	// Add state for mobile detection
	const [isMobile, setIsMobile] = useState(false);

	const { scaleStyle } = useViewportScaling({
		designWidth: 1920,
		designHeight: 1080,
		minScale: 0.7,
		maxScale: 1,
	});

	// Add effect to detect mobile screens
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initial check
		checkMobile();

		// Add event listener for window resize
		window.addEventListener("resize", checkMobile);

		// Cleanup
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (
				!layer1Ref.current ||
				!layer2Ref.current ||
				!layer3Ref.current ||
				!logoRef.current ||
				!buttonRef.current
			) {
				return;
			}

			// initial states
			gsap.set([layer1Ref.current, layer2Ref.current, layer3Ref.current], {
				opacity: 0,
				scale: 0.8,
			});
			gsap.set(logoRef.current, {
				opacity: 0,
				y: -30,
			});
			gsap.set(buttonRef.current, {
				opacity: 0,
				y: 30,
			});

			const tl = gsap.timeline();

			tl.to(layer1Ref.current, {
				opacity: 0.8,
				scale: 1,
				duration: 1.2,
				ease: "power2.out",
			})
				.to(
					layer2Ref.current,
					{
						opacity: 0.9,
						scale: 1,
						duration: 1,
						ease: "power2.out",
					},
					"-=0.8",
				)
				.to(
					layer3Ref.current,
					{
						opacity: 1,
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
						duration: 0.8,
						ease: "back.out(1.7)",
					},
					"-=0.4",
				)
				.to(
					buttonRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "power2.out",
					},
					"-=0.2",
				);

			// floating animation
			if (layer2Ref.current) {
				gsap.to(layer2Ref.current, {
					y: -5,
					duration: 3,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
				});
			}

			if (layer3Ref.current) {
				gsap.to(layer3Ref.current, {
					y: 3,
					duration: 2.5,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
					delay: 0.5,
				});
			}

			// pulse animation
			if (buttonRef.current) {
				gsap.to(buttonRef.current, {
					scale: 1.05,
					duration: 2,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
					delay: 2,
				});
			}
		}, headerRef);

		return () => ctx.revert();
	}, []);

	return (
		<>
			{isMobile ? (
				<MobileHeader disableScaling={disableScaling} />
			) : (
				<div
					ref={headerRef}
					className={`fixed w-full h-[200px] overflow-hidden z-50 ${!disableScaling && scaleStyle ? "-top-3" : ""}`}
					style={disableScaling ? {} : scaleStyle}
				>
					<div className="relative w-full h-full flex flex-col items-center">
						{/* Layer 3 - Bottom */}
						<div
							ref={layer3Ref}
							className="absolute flex top-20 left-0 w-full h-25 items-start justify-center brightness-125 flickering"
						>
							<Image
								src={getImagePath("/assets/header/layer3.svg")}
								alt=""
								width={561}
								height={88}
								className="w-full h-full "
							/>
						</div>
						{/* layer 2 */}
						<div
							ref={layer2Ref}
							className="absolute flex top-0 left-0 w-full h-40 items-start justify-center [filter:drop-shadow(0_0_18px_rgba(149,76,233,0.6))]"
						>
							<Image
								src={getImagePath("/assets/header/layer2.svg")}
								alt=""
								width={1221}
								height={135}
								className="w-full max-w-none h-full opacity-60 "
							/>
						</div>
						{/* layer 1 - Desktop version */}
						<div
							ref={layer1Ref}
							className="absolute -top-0 left-0 w-full h-38 flex items-start justify-center"
						>
							<Image
								src={getImagePath("/assets/header/layer1.svg")}
								alt=""
								width={1321}
								height={143}
								className="w-full max-w-none h-full "
							/>
						</div>
						{/* logo - Desktop */}
						<div ref={logoRef} className="mb-4">
							<Image
								src={getImagePath("/assets/header/logo.svg")}
								alt="Duothan Logo"
								width={320}
								height={120}
								className="h-20 w-full"
							/>
						</div>{" "}
						<div
							ref={buttonRef}
							className="absolute top-28 left-1/2 transform -translate-x-1/2"
						>
							<button
								type="button"
								className="relative group flex items-center justify-center text-white text-xs font-mono tracking-widest hover:scale-105 transition-all duration-300"
							>
								<Image
									src={getImagePath("/assets/header/button.svg")}
									alt=""
									width={246}
									height={23}
									className="w-auto h-6 group-hover:drop-shadow-[0_0_25px_rgba(0,255,247,0.6)] transition-all duration-300"
								/>
								<span className="absolute inset-0 flex items-center justify-center text-white text-xs tracking-widest pointer-events-none">
									{">> REGISTER <<"}
								</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;

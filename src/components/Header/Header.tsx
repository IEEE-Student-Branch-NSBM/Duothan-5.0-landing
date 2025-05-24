"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useViewportScaling } from "../viewport/useViewportScaling";

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

	const { scaleStyle } = useViewportScaling({
		designWidth: 1920,
		designHeight: 1080,
		minScale: 0.7,
		maxScale: 1,
	});

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
		<div
			ref={headerRef}
			className={`fixed w-full h-[200px] overflow-hidden z-50 ${!disableScaling && scaleStyle ? "-top-3" : ""}`}
			style={disableScaling ? {} : scaleStyle}
		>
			<div className="relative w-full h-full flex flex-col items-center">
				{/* Layer 3 - Bottom */}
				<div
					ref={layer3Ref}
					className="absolute top-20 left-0 w-full h-25 flex items-start justify-center brightness-125 flickering"
				>
					<Image
						src="/assets/header/layer3.svg"
						alt=""
						width={561}
						height={88}
						className="w-full h-full "
					/>
				</div>

				{/* layer 2 */}
				<div
					ref={layer2Ref}
					className="absolute top-0 left-0 w-full h-40 flex items-start justify-center [filter:drop-shadow(0_0_18px_rgba(149,76,233,0.6))]"
				>
					<Image
						src="/assets/header/layer2.svg"
						alt=""
						width={1221}
						height={135}
						className="w-full max-w-none h-full opacity-60 "
					/>
				</div>

				{/* layer 1 */}
				<div
					ref={layer1Ref}
					className="absolute -top-0 left-0 w-full h-38 flex items-start justify-center"
				>
					<Image
						src="/assets/header/layer1.svg"
						alt=""
						width={1321}
						height={143}
						className="w-full max-w-none h-full "
					/>
				</div>

				{/* logo */}
				<div ref={logoRef} className="mb-4">
					<Image
						src="/assets/header/logo.svg"
						alt="Duothan Logo"
						width={320}
						height={120}
						className="h-20 w-full"
					/>
				</div>

				{/* fake button */}
				<div
					ref={buttonRef}
					className="absolute inset-0 top-12 flex items-center justify-center text-white text-xs font-mono tracking-widest"
				>
					<Image
						src="/assets/header/button.svg"
						alt=""
						width={246}
						height={23}
						className="w-auto h-6"
					/>
					<span className="absolute inset-0 flex items-center justify-center text-white text-xs tracking-widest">
						{">> REGISTER <<"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Header;

"use client";
import Register from "@/components/registation-pages/Register";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Electrolize } from "next/font/google";
import localFont from "next/font/local";
import React, { useEffect, useRef, useState } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

// Import fonts
const electrolize = Electrolize({
	subsets: ["latin"],
	weight: ["400"],
});

const readyplayerone = localFont({ src: "../../../public/font.otf" });

interface RegisterButtonProps {
	onRegisterComplete?: () => void;
}

export default function RegisterButton({
	onRegisterComplete,
}: RegisterButtonProps) {
	const buttonRef = useRef<HTMLDivElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const outerContainerRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
	const [isClicked, setIsClicked] = useState(false);
	const [hideSection, setHideSection] = useState(false);
	const swordContainerRef = useRef<HTMLDivElement>(null);
	const glowEffectRef = useRef<HTMLDivElement>(null);
	const particlesRef = useRef<HTMLDivElement>(null);
	const scanlineRef = useRef<HTMLDivElement>(null);
	const virtualGridRef = useRef<HTMLDivElement>(null);
	const hologramRef = useRef<HTMLDivElement>(null);
	const sliceAnimationRef = useRef<HTMLDivElement>(null);

	// SVG paths for the sword - updated for more realism
	const swordPaths = {
		blade:
			"M10,10 L290,10 L300,20 L310,10 L590,10 L600,20 L550,70 L350,70 L250,70 L50,70 Z",
		handle: "M270,70 L330,70 L340,120 L320,140 L280,140 L260,120 Z",
		guard: "M250,70 L350,70 L370,90 L230,90 Z",
		glowingEdge: "M10,10 L590,10 L600,20 L550,70 L50,70 L10,10 Z",
	};

	// Create animated OASIS-like grid background
	useEffect(() => {
		if (virtualGridRef.current && isInView) {
			const grid = virtualGridRef.current;
			const gridSize = 20; // Size of grid cells
			const columns = Math.ceil(window.innerWidth / gridSize);
			const rows = Math.ceil(window.innerHeight / gridSize);

			grid.innerHTML = "";

			// Create vertical lines
			for (let i = 0; i <= columns; i++) {
				const line = document.createElement("div");
				line.className = "absolute top-0 bottom-0 w-[1px] bg-[#2a9fff]/10";
				line.style.left = `${i * gridSize}px`;
				line.style.transform = "translateZ(0)";
				grid.appendChild(line);

				// Animated pulse for random lines
				if (Math.random() > 0.7) {
					gsap.to(line, {
						opacity: 0.4,
						duration: Math.random() * 2 + 1,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
				}
			}

			// Create horizontal lines
			for (let i = 0; i <= rows; i++) {
				const line = document.createElement("div");
				line.className = "absolute left-0 right-0 h-[1px] bg-[#2a9fff]/10";
				line.style.top = `${i * gridSize}px`;
				line.style.transform = "translateZ(0)";
				grid.appendChild(line);

				// Animated pulse for random lines
				if (Math.random() > 0.7) {
					gsap.to(line, {
						opacity: 0.4,
						duration: Math.random() * 2 + 1,
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
					});
				}
			}

			// Create perspective animation
			gsap.to(grid, {
				rotateX: 60,
				duration: 0,
				ease: "none",
			});

			// Create grid wave animation
			gsap.to(grid, {
				z: 20,
				duration: 8,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
		}
	}, [isInView]);

	// Create scanline effect
	useEffect(() => {
		if (scanlineRef.current) {
			gsap.fromTo(
				scanlineRef.current,
				{
					y: -100,
					opacity: 0.15,
				},
				{
					y: "100vh",
					opacity: 0.15,
					duration: 1.5,
					ease: "none",
					repeat: -1,
					repeatDelay: 0.2,
				},
			);
		}
	}, []);

	// Create hologram effect
	useEffect(() => {
		if (hologramRef.current && isInView) {
			// Displacement effect
			const displaceTl = gsap.timeline({
				repeat: -1,
				repeatDelay: 3,
			});

			displaceTl
				.to(hologramRef.current, {
					x: "-=3",
					duration: 0.1,
					ease: "steps(1)",
					opacity: 0.95,
				})
				.to(hologramRef.current, {
					x: "+=5",
					duration: 0.1,
					ease: "steps(1)",
				})
				.to(hologramRef.current, {
					x: "-=2",
					duration: 0.1,
					ease: "steps(1)",
					opacity: 1,
				});

			// RGB split effect
			const rgbSplitLayers = document.createElement("div");
			rgbSplitLayers.className = "absolute inset-0 pointer-events-none";
			rgbSplitLayers.innerHTML = `
                <div class="absolute inset-0 opacity-50 mix-blend-screen text-[#ff0000] translate-x-[0.5px]">Ready to Hack?</div>
                <div class="absolute inset-0 opacity-50 mix-blend-screen text-[#00ff00] translate-x-[-0.5px]">Ready to Hack?</div>
            `;

			hologramRef.current.appendChild(rgbSplitLayers);

			// Flickering animation
			gsap.to(hologramRef.current, {
				opacity: 0.92,
				duration: 0.05,
				repeat: -1,
				repeatDelay: 2,
				yoyo: true,
				ease: "steps(1)",
			});
		}
	}, [isInView]);

	// Create particles elements - enhanced OASIS particle effects
	useEffect(() => {
		if (particlesRef.current) {
			const particles = particlesRef.current;
			particles.innerHTML = "";

			// Create virtual reality dust particles
			for (let i = 0; i < 80; i++) {
				const particle = document.createElement("div");
				const size = Math.random() * 4 + 1;
				const particleType = Math.floor(Math.random() * 5);

				particle.className = "absolute";
				particle.style.width = `${size}px`;
				particle.style.height = `${size}px`;
				particle.style.transform = "translateZ(0)"; // Performance optimization

				// Different particle types based on Ready Player One OASIS aesthetics
				if (particleType === 0) {
					// Data particles - hexagonal
					particle.innerHTML = `
                        <svg width="${size * 3}" height="${size * 3}" viewBox="0 0 10 10">
                            <polygon 
                                points="5,0 8.66,2.5 8.66,7.5 5,10 1.34,7.5 1.34,2.5" 
                                fill="rgba(42, 159, 255, ${Math.random() * 0.5 + 0.3})"
                                stroke="#2a9fff" 
                                stroke-width="0.5"
                            />
                        </svg>
                    `;
				} else if (particleType === 1) {
					// Binary code particles
					particle.className = `absolute ${electrolize.className} text-[8px] text-[#E957DD] opacity-${Math.floor(Math.random() * 3) + 6}0`;
					particle.textContent = Math.random() > 0.5 ? "1" : "0";
				} else if (particleType === 2) {
					// Energy orbs
					particle.className = "absolute rounded-full";
					particle.style.background =
						"radial-gradient(circle, rgba(233, 87, 221, 0.8) 0%, rgba(42, 159, 255, 0.3) 70%, transparent 100%)";
					particle.style.boxShadow = "0 0 5px rgba(233, 87, 221, 0.8)";
				} else {
					// Standard OASIS particles
					particle.className = "absolute rounded-full";
					particle.style.background = `rgba(42, 159, 255, ${Math.random() * 0.6 + 0.2})`;
					particle.style.boxShadow = "0 0 4px rgba(42, 159, 255, 0.8)";
				}

				// Random positioning
				particle.style.left = `${Math.random() * 100}%`;
				particle.style.top = `${Math.random() * 100}%`;
				particle.style.opacity = `${Math.random() * 0.5 + 0.5}`;

				// Add to container
				particles.appendChild(particle);

				// Animate each particle with OASIS-like motion
				gsap.to(particle, {
					y: `-=${Math.random() * 100 + 50}`,
					x: `${(Math.random() - 0.5) * 50}`,
					rotate: Math.random() * 360,
					opacity: 0,
					duration: Math.random() * 5 + 3,
					delay: Math.random() * 3,
					ease: "power1.out",
					repeat: -1,
					repeatDelay: Math.random() * 2,
				});

				// Add subtle hover effect
				gsap.to(particle, {
					x: `+=${(Math.random() - 0.5) * 20}`,
					duration: Math.random() * 3 + 2,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}
		}
	}, []);
	// Animation for section appearance with Ready Player One-style effects
	useEffect(() => {
		if (isInView && sectionRef.current) {
			// Initial title glow effect - enhanced OASIS-style
			if (glowEffectRef.current) {
				gsap.fromTo(
					glowEffectRef.current,
					{
						opacity: 0,
						scale: 0.8,
						filter: "blur(30px)",
					},
					{
						opacity: 1,
						scale: 1.2,
						filter: "blur(80px)",
						duration: 2.2,
						ease: "expo.out",
					},
				);

				// Pulsating effect like OASIS tech
				gsap.to(glowEffectRef.current, {
					scale: 1.4,
					opacity: 0.7,
					duration: 3,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}

			// Virtual reality startup sequence animation
			const tl = gsap.timeline({
				defaults: {
					ease: "power3.out",
				},
			});

			// Title appearance with digital distortion
			tl.fromTo(
				sectionRef.current.querySelector(".heading-container"),
				{
					opacity: 0,
					y: 80,
					filter: "blur(15px)",
					scale: 0.9,
				},
				{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					scale: 1,
					duration: 1.2,
					onStart: () => {
						// Add digital distortion
						const heading = sectionRef.current?.querySelector(".heading-text");
						if (heading) {
							const glitchTl = gsap.timeline({ repeat: 3, repeatDelay: 0.2 });
							glitchTl
								.to(heading, {
									skewX: 20,
									x: "+=5",
									duration: 0.05,
									ease: "steps(1)",
								})
								.to(heading, {
									skewX: 0,
									x: "-=5",
									duration: 0.05,
									ease: "steps(1)",
								})
								.to(heading, {
									opacity: 0.8,
									duration: 0.05,
									ease: "steps(1)",
								})
								.to(heading, {
									opacity: 1,
									duration: 0.05,
									ease: "steps(1)",
								});
						}
					},
				},
			)
				.fromTo(
					sectionRef.current.querySelector(".heading-description"),
					{
						opacity: 0,
						y: 30,
						clipPath: "inset(0 100% 0 0)",
					},
					{
						opacity: 1,
						y: 0,
						clipPath: "inset(0 0% 0 0)",
						duration: 1,
						ease: "power2.out",
					},
					"-=0.7",
				)
				.fromTo(
					sectionRef.current.querySelector(".heading-divider"),
					{
						width: 0,
						opacity: 0,
					},
					{
						width: "36px",
						opacity: 1,
						duration: 0.8,
						ease: "expo.out",
					},
					"-=0.8",
				)
				.fromTo(
					sectionRef.current.querySelector(".button-container"),
					{
						opacity: 0,
						scale: 0.8,
						y: 30,
					},
					{
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 0.9,
						ease: "back.out(1.7)",
					},
					"-=0.5",
				)
				// OASIS simulation border effects
				.fromTo(
					sectionRef.current.querySelectorAll(".glow-line"),
					{
						width: 0,
						opacity: 0,
					},
					{
						width: "100%",
						opacity: 0.4,
						duration: 1.8,
						ease: "expo.inOut",
						stagger: 0.2,
					},
					"-=1.0",
				)
				// Reveal code text
				.fromTo(
					sectionRef.current.querySelector(".code-text"),
					{
						opacity: 0,
						letterSpacing: "5px",
					},
					{
						opacity: 1,
						letterSpacing: "widest",
						duration: 1,
						ease: "power2.out",
					},
					"-=0.5",
				);

			// Create OASIS loading sequence animation for background elements
			gsap.fromTo(
				".grid-container",
				{ opacity: 0 },
				{ opacity: 0.15, duration: 2, ease: "power2.out" },
			);
		}
	}, [isInView]);

	// Button hover and glitch animation - Enhanced Ready Player One style
	useEffect(() => {
		if (buttonRef.current && !isClicked) {
			// VR interaction feedback
			buttonRef.current.addEventListener("mouseenter", () => {
				// Create digital interface sound effect element
				const soundFeedback = document.createElement("div");
				soundFeedback.className = "absolute inset-0 overflow-hidden";

				// Add audio-like visualization elements
				for (let i = 0; i < 5; i++) {
					const audioBar = document.createElement("div");
					audioBar.className = "absolute bottom-0 w-[2px] bg-[#2a9fff]";
					audioBar.style.height = "2px";
					audioBar.style.left = `${10 + i * 5}%`;

					soundFeedback.appendChild(audioBar);

					// Animate audio bars
					gsap.to(audioBar, {
						height: `${Math.random() * 20 + 5}px`,
						duration: 0.2,
						repeat: 3,
						yoyo: true,
						ease: "power1.inOut",
					});
				}

				buttonRef.current?.appendChild(soundFeedback);

				// Remove after animation
				setTimeout(() => {
					soundFeedback.remove();
				}, 1500);
			});

			// Initial glow animation - OASIS interface style
			const timeline = gsap.timeline({ repeat: -1, yoyo: true });
			timeline.to(buttonRef.current.querySelector(".button-glow"), {
				boxShadow:
					"0 0 30px 10px rgba(42, 159, 255, 0.8), 0 0 60px 20px rgba(233, 87, 221, 0.4)",
				duration: 3,
				ease: "sine.inOut",
			});

			// Text glitch effect with OASIS data corruption style
			const textGlitch = gsap.timeline({
				repeat: -1,
				repeatDelay: Math.random() * 3 + 5,
			});

			textGlitch
				.to(buttonRef.current.querySelector(".button-text"), {
					skewX: 20,
					letterSpacing: "3px",
					color: "#2a9fff",
					textShadow:
						"2px 0 #E957DD, -2px 0 #2a9fff, 0 0 8px rgba(42, 159, 255, 0.8)",
					duration: 0.08,
					ease: "steps(1)",
				})
				.to(buttonRef.current.querySelector(".button-text"), {
					skewX: -10,
					letterSpacing: "1px",
					color: "#E957DD",
					textShadow:
						"-3px 0 #2a9fff, 2px 0 #E957DD, 0 0 8px rgba(233, 87, 221, 0.8)",
					duration: 0.06,
					ease: "steps(1)",
				})
				.to(buttonRef.current.querySelector(".button-text"), {
					skewX: 0,
					letterSpacing: "normal",
					color: "white",
					textShadow: "none",
					duration: 0.04,
					ease: "steps(1)",
				})
				.to(buttonRef.current.querySelector(".button-text"), {
					skewX: 5,
					skewY: 2,
					color: "#2a9fff",
					textShadow:
						"1px 0 #E957DD, -1px 0 #2a9fff, 0 0 6px rgba(42, 159, 255, 0.7)",
					duration: 0.03,
					ease: "steps(1)",
					delay: 0.1,
				})
				.to(buttonRef.current.querySelector(".button-text"), {
					skewX: 0,
					skewY: 0,
					color: "white",
					textShadow: "none",
					duration: 0.03,
					ease: "steps(1)",
				});

			// Border glitch animation like OASIS tech boundaries
			gsap.to(buttonRef.current.querySelector(".button-border"), {
				x: 2,
				duration: 0.1,
				repeat: -1,
				repeatDelay: 3,
				yoyo: true,
				ease: "steps(1)",
			});

			return () => {
				timeline.kill();
				textGlitch.kill();
			};
		}
	}, [isClicked]);

	// Handle button click with enhanced OASIS-style activation sequence
	const handleClick = () => {
		if (isClicked) return;
		setIsClicked(true);

		// Create an electric shock effect - like OASIS login
		const shockTl = gsap.timeline();
		const shockFragment = document.createElement("div");
		shockFragment.className = "absolute inset-0 bg-[#2a9fff] opacity-0 z-20";
		buttonRef.current?.appendChild(shockFragment);

		// OASIS system access animation
		shockTl
			.to(shockFragment, {
				opacity: 0.9,
				duration: 0.1,
				ease: "steps(1)",
			})
			.to(shockFragment, {
				opacity: 0,
				duration: 0.05,
				ease: "steps(1)",
			})
			.to(shockFragment, {
				opacity: 0.7,
				duration: 0.05,
				ease: "steps(1)",
			})
			.to(shockFragment, {
				opacity: 0,
				duration: 0.1,
				onComplete: () => {
					shockFragment.remove();
				},
			});

		// Show digital circuit pattern
		const digitalCircuit = document.createElement("div");
		digitalCircuit.className = "absolute inset-0 overflow-hidden z-10";
		digitalCircuit.innerHTML = `
          <svg width="100%" height="100%" viewBox="0 0 300 100">
            <path 
              d="M10,50 L50,50 L60,40 L100,40 L110,50 L200,50 L210,40 L290,40" 
              stroke="#2a9fff" 
              stroke-width="2" 
              fill="none"
              stroke-dasharray="300"
              stroke-dashoffset="300"
            />
            <path 
              d="M10,60 L30,60 L40,70 L120,70 L130,60 L170,60 L180,70 L290,70" 
              stroke="#E957DD" 
              stroke-width="2" 
              fill="none"
              stroke-dasharray="300"
              stroke-dashoffset="300"
            />
          </svg>
        `;
		buttonRef.current?.appendChild(digitalCircuit);

		// Animate circuit paths
		gsap.to(digitalCircuit.querySelectorAll("path"), {
			strokeDashoffset: 0,
			duration: 0.6,
			ease: "power2.inOut",
			stagger: 0.1,
		});

		// Button activation sequence
		gsap.to(buttonRef.current, {
			scale: 1.2,
			duration: 0.4,
			ease: "back.out(3)",
			onComplete: () => {
				// Virtual digital explosion
				gsap.to(buttonRef.current, {
					scale: 0.95,
					opacity: 0.8,
					duration: 0.2,
					ease: "power2.in",
					onComplete: () => {
						// Remove circuit animation
						gsap.to(digitalCircuit, {
							opacity: 0,
							duration: 0.3,
							onComplete: () => digitalCircuit.remove(),
						});

						// Prepare slice animation container
						if (sliceAnimationRef.current) {
							gsap.set(sliceAnimationRef.current, {
								opacity: 1,
								visibility: "visible",
							});
						}

						// Make the sword container visible for vertical slice
						if (swordContainerRef.current) {
							gsap.set(swordContainerRef.current, {
								visibility: "visible",
								opacity: 1,
								rotation: 90, // Vertical sword
								transformOrigin: "center center",
								scale: 1.5,
								y: "-100vh", // Start from above the screen
								x: 0,
							});

							// Sword materialization animation with more realistic metallic appearance
							const swordTl = gsap.timeline();

							// Create energy flare effect around the sword
							const energyFlare = document.createElement("div");
							energyFlare.className = "absolute inset-0 z-10";
							energyFlare.innerHTML = `
                                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[1000px] opacity-70"
                                     style="background: radial-gradient(ellipse at center, rgba(42, 159, 255, 0.9) 0%, rgba(42, 159, 255, 0.4) 30%, transparent 70%)">
                                </div>
                            `;
							swordContainerRef.current.appendChild(energyFlare);

							// Add motion blur to sword for more realism
							const blurEffect = document.createElement("div");
							blurEffect.className = "absolute inset-0 blur-sm";
							blurEffect.innerHTML = `
                                <svg width="600" height="1000" viewBox="0 0 600 1000" opacity="0.7">
                                    <defs>
                                        <linearGradient id="bladeBlur" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stop-color="#2a9fff" stop-opacity="0.5" />
                                            <stop offset="50%" stop-color="white" stop-opacity="0.7" />
                                            <stop offset="100%" stop-color="#E957DD" stop-opacity="0.5" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M300,0 L325,500 L300,1000 L275,500 Z" fill="url(#bladeBlur)" />
                                </svg>
                            `;
							swordContainerRef.current.appendChild(blurEffect);

							// VERTICAL SLICE ANIMATION - THE MAIN NEW PART
							swordTl
								// Sword appears with energy building
								.to(swordContainerRef.current, {
									y: "-50vh",
									duration: 0.5,
									ease: "power2.out",
									onStart: () => {
										// Create rising energy particles
										for (let i = 0; i < 40; i++) {
											setTimeout(() => {
												if (swordContainerRef.current) {
													const particle = document.createElement("div");
													const size = Math.random() * 6 + 2;
													particle.className = "absolute rounded-full";
													particle.style.width = `${size}px`;
													particle.style.height = `${size}px`;
													particle.style.background =
														Math.random() > 0.5
															? "rgba(42, 159, 255, 0.8)"
															: "rgba(233, 87, 221, 0.8)";
													particle.style.boxShadow = "0 0 8px currentColor";
													particle.style.left = `${Math.random() * 100}%`;
													particle.style.top = "90%";

													swordContainerRef.current.appendChild(particle);

													gsap.to(particle, {
														y: -300 - Math.random() * 200,
														x: (Math.random() - 0.5) * 100,
														opacity: 0,
														duration: 0.8 + Math.random() * 0.4,
														ease: "power2.out",
														onComplete: () => particle.remove(),
													});
												}
											}, i * 20);
										}
									},
								})
								// Quick pause to build anticipation
								.to({}, { duration: 0.2 })
								// Powerful downward slash with accelerating motion
								.to(swordContainerRef.current, {
									y: "150vh", // Move beyond bottom of screen
									duration: 0.7,
									ease: "power3.in",
									onStart: () => {
										// Create slice line effect that follows the sword
										const sliceEffect = document.createElement("div");
										sliceEffect.className =
											"absolute top-0 left-1/2 transform -translate-x-1/2 w-[4px] h-0 z-20";
										sliceEffect.style.background =
											"linear-gradient(to bottom, rgba(42, 159, 255, 0.9), white, rgba(233, 87, 221, 0.9))";
										sliceEffect.style.boxShadow =
											"0 0 20px rgba(42, 159, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.8)";
										sectionRef.current?.appendChild(sliceEffect);
										// Expand the slice effect
										gsap.to(sliceEffect, {
											height: "200vh",
											duration: 0.7,
											ease: "power3.in",
										});

										// Create impact particles that fly out from the slice
										setTimeout(() => {
											for (let i = 0; i < 60; i++) {
												if (sectionRef.current) {
													const particle = document.createElement("div");
													const size = Math.random() * 8 + 2;
													const isBlue = Math.random() > 0.5;

													particle.className = "absolute rounded-full";
													particle.style.width = `${size}px`;
													particle.style.height = `${size}px`;
													particle.style.background = isBlue
														? "rgba(42, 159, 255, 0.9)"
														: "rgba(233, 87, 221, 0.9)";
													particle.style.boxShadow = `0 0 15px ${isBlue ? "#2a9fff" : "#E957DD"}`;

													// Position at random points along the slice line
													particle.style.left = "50%";
													particle.style.top = `${Math.random() * 100}%`;
													particle.style.transform = "translate(-50%, -50%)";

													sectionRef.current.appendChild(particle);

													// Particles fly outward from slice line
													gsap.to(particle, {
														x: (Math.random() - 0.5) * 400,
														y: (Math.random() - 0.5) * 200,
														opacity: 0,
														duration: 0.8 + Math.random() * 0.6,
														ease: "power2.out",
														onComplete: () => particle.remove(),
													});
												}
											}
										}, 100);
									},
								})
								.to({}, { duration: 0.3 }) // Brief pause after the slash
								.to(swordContainerRef.current, {
									opacity: 0,
									duration: 0.5,
									onComplete: () => {
										if (swordContainerRef.current) {
											swordContainerRef.current.style.visibility = "hidden";
										}

										// Create split screen effect
										createSplitScreenEffect();
									},
								});
						}
					},
				});
			},
		});
	};

	// Function to create split screen effect after sword slice
	const createSplitScreenEffect = () => {
		if (!sectionRef.current) return;

		// Create top and bottom screen halves
		const topHalf = document.createElement("div");
		const bottomHalf = document.createElement("div");

		topHalf.className =
			"absolute top-0 left-0 w-full h-1/2 bg-black z-30 origin-bottom";
		bottomHalf.className =
			"absolute bottom-0 left-0 w-full h-1/2 bg-black z-30 origin-top";

		sectionRef.current.appendChild(topHalf);
		sectionRef.current.appendChild(bottomHalf);

		// Create split animation
		const splitTl = gsap.timeline({
			onComplete: () => {
				// Hide the section and show registration component
				setHideSection(true);

				// Cleanup elements
				topHalf.remove();
				bottomHalf.remove();

				// Call the completion callback if provided
				if (onRegisterComplete) {
					onRegisterComplete();
				}
			},
		});

		splitTl
			.to(
				topHalf,
				{
					y: "-100%",
					duration: 1.2,
					ease: "power3.inOut",
				},
				0,
			)
			.to(
				bottomHalf,
				{
					y: "100%",
					duration: 1.2,
					ease: "power3.inOut",
				},
				0,
			)
			// Add digital noise during transition
			.to(sectionRef.current, {
				opacity: 0,
				duration: 0.5,
				delay: 0.7,
			});
	};

	return (
		<div
			ref={outerContainerRef}
			className="relative w-full min-h-screen overflow-hidden"
		>
			{!hideSection ? (
				<div
					ref={sectionRef}
					className={`relative flex flex-col items-center justify-center w-full min-h-screen text-white py-20 overflow-hidden ${electrolize.className}`}
				>
					{/* OASIS UI Background Effects */}
					<div className="absolute inset-0 overflow-hidden z-0">
						{/* Virtual grid background */}
						<div
							ref={virtualGridRef}
							className="grid-container absolute inset-0 transform-gpu perspective-1000 overflow-hidden opacity-0"
						/>

						{/* Scanline effect */}
						<div
							ref={scanlineRef}
							className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#2a9fff]/20 to-transparent opacity-15 z-10"
						/>

						{/* Particles */}
						<div
							ref={particlesRef}
							className="absolute inset-0 overflow-hidden z-5"
						/>

						{/* Glow effect behind title */}
						<div
							ref={glowEffectRef}
							className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-0 z-1"
							style={{
								background:
									"radial-gradient(circle, rgba(42, 159, 255, 0.6) 0%, rgba(42, 159, 255, 0.2) 40%, rgba(233, 87, 221, 0.1) 60%, transparent 80%)",
							}}
						/>
					</div>

					{/* Main Content Container */}
					<div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">
						{/* Title with cybernetic effects */}
						<div className="heading-container mb-8">
							<h2
								className={`heading-text text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${readyplayerone.className}`}
								style={{
									textShadow:
										"0 0 15px rgba(42, 159, 255, 0.7), 0 0 30px rgba(42, 159, 255, 0.4)",
								}}
							>
								Ready to Hack?
							</h2>

							{/* OASIS-style divider */}
							<div
								className="heading-divider w-9 h-1 bg-[#E957DD] mx-auto mb-6"
								style={{
									boxShadow:
										"0 0 10px rgba(233, 87, 221, 0.8), 0 0 20px rgba(233, 87, 221, 0.4)",
								}}
							/>

							{/* Digital description text */}
							<p
								className="heading-description text-lg md:text-xl text-[#2a9fff]/80 mb-8"
								style={{
									textShadow: "0 0 8px rgba(42, 159, 255, 0.7)",
								}}
							>
								Join our virtual hackathon and create the solutions of tomorrow
							</p>

							{/* Hologram effect */}
							<div
								ref={hologramRef}
								className={`code-text text-sm mb-6 tracking-widest text-[#2a9fff] opacity-70 ${electrolize.className}`}
							>
								Ready to Hack?
							</div>
						</div>

						{/* Interactive button with OASIS style */}
						<div className="button-container relative">
							<motion.div
								ref={buttonRef}
								className="button-main relative px-10 py-4 rounded-md cursor-pointer z-10 overflow-hidden"
								onClick={handleClick}
								whileHover={{ scale: 1.05 }}
								style={{
									background:
										"linear-gradient(135deg, rgba(42, 159, 255, 0.2) 0%, rgba(233, 87, 221, 0.2) 100%)",
									border: "1px solid rgba(42, 159, 255, 0.5)",
									backdropFilter: "blur(4px)",
									transformStyle: "preserve-3d",
								}}
							>
								{/* Energy glow effect */}
								<div
									className="button-glow absolute inset-0 blur-lg"
									style={{
										background:
											"radial-gradient(circle at center, rgba(42, 159, 255, 0.4) 0%, rgba(233, 87, 221, 0.2) 70%, transparent 100%)",
										boxShadow:
											"0 0 20px 5px rgba(42, 159, 255, 0.5), 0 0 40px 10px rgba(233, 87, 221, 0.3)",
									}}
								/>

								{/* Animated border */}
								<div
									className="button-border absolute inset-0 rounded-md"
									style={{
										border: "1px solid rgba(42, 159, 255, 0.7)",
										boxShadow: "inset 0 0 15px rgba(42, 159, 255, 0.5)",
									}}
								/>

								{/* Button text */}
								<div
									className={`button-text text-white text-xl font-medium ${readyplayerone.className}`}
								>
									ENTER THE CODE
								</div>
							</motion.div>

							{/* OASIS-style decorative lines */}
							<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-px h-8 mb-2">
								<div
									className="glow-line h-full w-px bg-[#2a9fff]"
									style={{ boxShadow: "0 0 8px rgba(42, 159, 255, 0.8)" }}
								/>
							</div>
							<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 mt-2">
								<div
									className="glow-line h-full w-px bg-[#2a9fff]"
									style={{ boxShadow: "0 0 8px rgba(42, 159, 255, 0.8)" }}
								/>
							</div>
						</div>
					</div>

					{/* Sword container for slice animation */}
					<div
						ref={swordContainerRef}
						className="absolute inset-0 pointer-events-none opacity-0 invisible z-50"
					>
						{/* SVG Sword */}
						<svg width="600" height="140" viewBox="0 0 600 140">
							<title>Glow</title>
							{/* Blade glow */}
							<path
								d={swordPaths.glowingEdge}
								fill="#2a9fff"
								opacity="0.2"
								filter="blur(8px)"
							/>

							{/* Blade */}
							<path
								d={swordPaths.blade}
								fill="url(#bladeGradient)"
								stroke="#2a9fff"
								strokeWidth="1.5"
							/>

							{/* Guard */}
							<path
								d={swordPaths.guard}
								fill="#E957DD"
								stroke="#2a9fff"
								strokeWidth="1"
							/>

							{/* Handle */}
							<path
								d={swordPaths.handle}
								fill="#111"
								stroke="#2a9fff"
								strokeWidth="1"
							/>

							{/* Blade shine */}
							<path
								d="M50,20 L550,20"
								stroke="white"
								strokeWidth="2"
								opacity="0.8"
							/>

							{/* Definitions */}
							<defs>
								<linearGradient
									id="bladeGradient"
									x1="0%"
									y1="0%"
									x2="100%"
									y2="0%"
								>
									<stop offset="0%" stopColor="#0a1a2a" />
									<stop offset="40%" stopColor="#2a9fff" stopOpacity="0.7" />
									<stop offset="60%" stopColor="#d1e8ff" stopOpacity="0.9" />
									<stop offset="100%" stopColor="#0a1a2a" />
								</linearGradient>
							</defs>
						</svg>
					</div>

					{/* Slice animation container */}
					<div
						ref={sliceAnimationRef}
						className="absolute inset-0 pointer-events-none opacity-0 invisible z-40"
					/>
				</div>
			) : (
				// Registration Form Component
				<div className="w-full min-h-screen">
					<Register />
				</div>
			)}
		</div>
	);
}

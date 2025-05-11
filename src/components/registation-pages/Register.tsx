"use client";
import NeonRoseCard from "@/components/registation-pages/CyberPunkCard";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowLeft, ChevronRight, Medal, Terminal, Users } from "lucide-react";
import { Electrolize } from "next/font/google";
import localFont from "next/font/local";
import React, { useState, useRef, useEffect } from "react";

// Import fonts
const electrolize = Electrolize({
	subsets: ["latin"],
	weight: ["400"],
});

const readyplayerone = localFont({ src: "../../../public/font.otf" });

// Registration form data state
interface FormData {
	teamName: string;
	teamLeaderName: string;
	teamLeaderEmail: string;
	teamLeaderPhone: string;
	teamLeaderID: string;
	memberName: string;
	memberEmail: string;
	memberPhone: string;
	memberID: string;
	selectedTheme: string;
	agreeTerms: boolean;
}

// Initial form data
const initialFormData: FormData = {
	teamName: "",
	teamLeaderName: "",
	teamLeaderEmail: "",
	teamLeaderPhone: "",
	teamLeaderID: "",
	memberName: "",
	memberEmail: "",
	memberPhone: "",
	memberID: "",
	selectedTheme: "",
	agreeTerms: false,
};

// Registration step data
const registrationSteps = [
	{
		title: "DuoThan Instructions",
		description:
			"Read through the important information about our 24-hour hackathon before proceeding to registration.",
		buttonText: "Begin Registration",
		color: "#E957DD",
		secondaryColor: "#9559E9",
		icon: Terminal,
	},
	{
		title: "Team Details",
		description:
			"Enter your team name and select your preferred hackathon theme.",
		buttonText: "Next Step",
		color: "#50E5B4",
		secondaryColor: "#32A89C",
		icon: Users,
	},
	{
		title: "Team Leader",
		description:
			"Enter details for the team leader. This person will be our primary contact.",
		buttonText: "Next Step",
		color: "#5D8EFF",
		secondaryColor: "#3866C6",
		icon: Medal,
	},
	{
		title: "Team Member",
		description:
			"Enter details for your team member. Teams must have exactly 2 participants.",
		buttonText: "Submit Registration",
		color: "#FF5F1F",
		secondaryColor: "#E93C30",
		icon: Users,
	},
];

// Themes
export default function Register() {
	// State for the registration form
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [formErrors, setFormErrors] = useState<
		Partial<Record<keyof FormData, string>>
	>({});

	// State for the carousel
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const carouselRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Handle form input changes
	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type } = e.target;

		// Handle checkboxes
		if (type === "checkbox") {
			const checked = (e.target as HTMLInputElement).checked;
			setFormData((prev) => ({ ...prev, [name]: checked }));
			return;
		}

		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error for this field if it exists
		if (formErrors[name as keyof FormData]) {
			setFormErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name as keyof FormData];
				return newErrors;
			});
		}
	};

	// Select theme

	const validateCurrentStep = (): boolean => {
		const newErrors: Partial<Record<keyof FormData, string>> = {};

		if (currentIndex === 1) {
			if (!formData.teamName.trim()) {
				newErrors.teamName = "Team name is required";
			}
			if (!formData.selectedTheme) {
				newErrors.selectedTheme = "Please select a theme";
			}
		} else if (currentIndex === 2) {
			if (!formData.teamLeaderName.trim()) {
				newErrors.teamLeaderName = "Team leader name is required";
			}
			if (!formData.teamLeaderEmail.trim()) {
				newErrors.teamLeaderEmail = "Email is required";
			} else if (!/\S+@\S+\.\S+/.test(formData.teamLeaderEmail)) {
				newErrors.teamLeaderEmail = "Email is invalid";
			}
			if (!formData.teamLeaderPhone.trim()) {
				newErrors.teamLeaderPhone = "Phone number is required";
			}
			if (!formData.teamLeaderID.trim()) {
				newErrors.teamLeaderID = "Student ID is required";
			}
		} else if (currentIndex === 3) {
			if (!formData.memberName.trim()) {
				newErrors.memberName = "Team member name is required";
			}
			if (!formData.memberEmail.trim()) {
				newErrors.memberEmail = "Email is required";
			} else if (!/\S+@\S+\.\S+/.test(formData.memberEmail)) {
				newErrors.memberEmail = "Email is invalid";
			}
			if (!formData.memberPhone.trim()) {
				newErrors.memberPhone = "Phone number is required";
			}
			if (!formData.memberID.trim()) {
				newErrors.memberID = "Student ID is required";
			}
			if (!formData.agreeTerms) {
				newErrors.agreeTerms = "You must agree to the terms";
			}
		}

		setFormErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Enhanced animation for errors
	const animateError = () => {
		if (!carouselRef.current) return;

		// Create an error flash effect
		const errorFlash = document.createElement("div");
		errorFlash.className = "absolute inset-0 bg-red-500/20 rounded-lg z-50";
		errorFlash.style.pointerEvents = "none";
		carouselRef.current.appendChild(errorFlash);

		// Shake animation with a red flash
		gsap.to(carouselRef.current, {
			x: -10,
			duration: 0.08,
			repeat: 3,
			yoyo: true,
			ease: "power2.inOut",
			onComplete: () => {
				gsap.set(carouselRef.current, { x: 0 });
				setTimeout(() => {
					errorFlash.remove();
				}, 300);
			},
		});

		// Fade out the error flash
		gsap.to(errorFlash, {
			opacity: 0,
			duration: 0.5,
			delay: 0.2,
		});
	};

	// Handle next step with enhanced transitions
	const handleNext = () => {
		if (isAnimating) return;

		// First card is just info, no validation needed
		if (currentIndex > 0 && !validateCurrentStep()) {
			animateError();
			return;
		}

		// Last card submission
		if (currentIndex === 3) {
			console.log("Form submitted:", formData);

			// Create a success animation
			const successOverlay = document.createElement("div");
			successOverlay.className =
				"fixed inset-0 bg-black/80 z-50 flex items-center justify-center";
			document.body.appendChild(successOverlay);

			const successContent = document.createElement("div");
			successContent.className = `${readyplayerone.className} text-2xl text-center text-green-400 p-8`;
			successContent.innerHTML = `
                <div class="mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>REGISTRATION SUCCESSFUL</div>
                <div class="${electrolize.className} text-white text-base mt-2">We'll be in touch soon!</div>
            `;
			successOverlay.appendChild(successContent);

			// Animate the success message
			gsap.fromTo(
				successContent,
				{ scale: 0.8, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
			);

			// Auto-dismiss after a delay
			setTimeout(() => {
				gsap.to(successContent, {
					scale: 0.8,
					opacity: 0,
					duration: 0.3,
					onComplete: () => successOverlay.remove(),
				});
			}, 3000);

			return;
		}

		setIsAnimating(true);
		setDirection(1);

		// Enhanced glitch effect when changing cards
		const tl = gsap.timeline();
		tl.to(carouselRef.current, {
			skewX: 3,
			scale: 0.97,
			duration: 0.15,
			opacity: 0.8,
			ease: "power2.in",
			boxShadow: `0 0 20px ${registrationSteps[currentIndex].color}80`,
		}).to(carouselRef.current, {
			skewX: 0,
			scale: 1,
			duration: 0.2,
			opacity: 1,
			ease: "power2.out",
			boxShadow: "none",
			onComplete: () => {
				setCurrentIndex((prevIndex) => prevIndex + 1);
				setIsAnimating(false);
			},
		});
	};

	// Handle previous step with enhanced transitions
	const handlePrev = () => {
		if (isAnimating || currentIndex === 0) return;

		setIsAnimating(true);
		setDirection(-1);

		// Enhanced glitch effect for going back
		const tl = gsap.timeline();
		tl.to(carouselRef.current, {
			skewX: -3,
			scale: 0.97,
			duration: 0.15,
			opacity: 0.8,
			ease: "power2.in",
			boxShadow: `0 0 20px ${registrationSteps[currentIndex].color}80`,
		}).to(carouselRef.current, {
			skewX: 0,
			scale: 1,
			duration: 0.2,
			opacity: 1,
			ease: "power2.out",
			boxShadow: "none",
			onComplete: () => {
				setCurrentIndex((prevIndex) => prevIndex - 1);
				setIsAnimating(false);
			},
		});
	};

	// Progress bar animation with enhanced effects
	useEffect(() => {
		if (!isAnimating) {
			const progressTl = gsap.timeline();

			// Animate progress fill
			progressTl.to(".progress-bar-fill", {
				width: `${((currentIndex + 1) / registrationSteps.length) * 100}%`,
				duration: 0.6,
				ease: "power2.inOut",
			});

			// Highlight the current step
			gsap.to(".step-indicator", {
				opacity: 0.4,
				scale: 1,
				color: "rgba(255,255,255,0.5)",
				duration: 0.3,
			});

			gsap.to(`.step-indicator-${currentIndex}`, {
				opacity: 1,
				scale: 1.05,
				color: "white",
				duration: 0.4,
				delay: 0.1,
			});

			// Pulse effect on the current step icon
			const currentIcon = document.querySelector(`.step-icon-${currentIndex}`);
			if (currentIcon) {
				gsap.fromTo(
					currentIcon,
					{ scale: 1 },
					{
						scale: 1.2,
						duration: 0.4,
						ease: "power2.out",
						yoyo: true,
						repeat: 1,
					},
				);
			}
		}
	}, [currentIndex, isAnimating]);

	// Center card in viewport on mount and resize
	useEffect(() => {
		const centerCard = () => {
			if (containerRef.current && carouselRef.current) {
				const viewportHeight = window.innerHeight;
				const cardHeight = carouselRef.current.offsetHeight;
				const topOffset = Math.max(
					100,
					(viewportHeight - cardHeight) / 2 - 100,
				);

				containerRef.current.style.paddingTop = `${topOffset}px`;
				containerRef.current.style.paddingBottom = `${topOffset}px`;
			}
		};

		centerCard();
		window.addEventListener("resize", centerCard);

		return () => {
			window.removeEventListener("resize", centerCard);
		};
	}, []);

	// Enhanced variants for card animation with smoother transitions
	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 200 : -200,
			opacity: 0,
			scale: 0.92,
			filter: "blur(8px)",
		}),
		center: {
			x: 0,
			opacity: 1,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				x: { type: "spring", stiffness: 300, damping: 30 },
				opacity: { duration: 0.4 },
				scale: { duration: 0.4, ease: "backOut" },
				filter: { duration: 0.3 },
			},
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 200 : -200,
			opacity: 0,
			scale: 0.92,
			filter: "blur(8px)",
			transition: {
				x: { type: "spring", stiffness: 300, damping: 30 },
				opacity: { duration: 0.3 },
				scale: { duration: 0.3 },
				filter: { duration: 0.2 },
			},
		}),
	};

	// Enhanced input field style
	const inputStyle = `${electrolize.className} w-full bg-white/10 border border-white/20 rounded p-2 text-white focus:outline-none focus:border-[#a2ebff] focus:ring-1 focus:ring-[#a2ebff] transition-colors`;

	// Error field style
	const errorStyle = "text-red-400 text-xs mt-1";

	return (
		<section
			id="register"
			className="min-h-screen flex flex-col items-center justify-center bg-black py-10 overflow-hidden"
		>
			<div className="container px-4 relative" ref={containerRef}>
				{/* Enhanced title with better typography and effect */}
				<div className="mb-12 text-center">
					<h2
						className={`${readyplayerone.className} text-5xl md:text-6xl tracking-wider uppercase inline-block relative`}
					>
						<span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-[#E957DD] to-[#a2ebff]">
							Registration
						</span>
						<span className="absolute top-1 left-1 z-0 text-cyan-600 opacity-70 blur-[0.5px]">
							Registration
						</span>
						{/* Extra shadow for depth */}
						<span className="absolute -top-0.5 -left-0.5 z-0 text-[#E957DD]/30 blur-[1px] opacity-60">
							Registration
						</span>
					</h2>

					{/* Enhanced divider with animation */}
					<div className="w-44 h-1 bg-gradient-to-r from-[#E957DD] to-[#a2ebff] mx-auto mt-3 relative">
						<div className="absolute inset-0 blur-md bg-gradient-to-r from-[#E957DD] to-[#a2ebff] opacity-80" />

						{/* Animated scanning effect */}
						<div className="absolute inset-0 overflow-hidden">
							<div
								className="h-full w-20 bg-gradient-to-r from-transparent via-white/80 to-transparent"
								style={{
									animation: "scanLine 2s ease-in-out infinite",
									transform: "translateX(-100%)",
								}}
							/>
							<style jsx>{`
                                @keyframes scanLine {
                                    0%, 100% { transform: translateX(-100%); }
                                    50% { transform: translateX(500%); }
                                }
                            `}</style>
						</div>
					</div>

					<div
						className={`${electrolize.className} text-xs text-cyan-400 mt-2 tracking-widest animate-pulse`}
					>
						REG_SEQUENCE_INITIALIZED
					</div>
				</div>

				{/* Improved step indicator with better visual hierarchy */}
				<div className="mb-10 max-w-2xl mx-auto overflow-hidden">
					<div className="flex justify-between mb-2 px-4">
						{registrationSteps.map((step) => (
							<div
								key={step.title}
								className={`step-indicator step-indicator-${step.title} ${electrolize.className} text-xs flex flex-col items-center transition-all duration-300 ${registrationSteps.indexOf(step) <= currentIndex ? "text-white" : "text-gray-500"}`}
							>
								<div
									className={`step-icon-${step.title} w-8 h-8 mb-1 rounded-full flex items-center justify-center transition-all duration-300`}
									style={{
										border: `1px solid ${registrationSteps.indexOf(step) <= currentIndex ? step.color : "rgba(255,255,255,0.2)"}`,
										backgroundColor:
											registrationSteps.indexOf(step) <= currentIndex
												? `${step.color}30`
												: "transparent",
										boxShadow:
											registrationSteps.indexOf(step) === currentIndex
												? `0 0 10px ${step.color}50`
												: "none",
									}}
								>
									{React.createElement(step.icon, {
										size: 16,
										className:
											registrationSteps.indexOf(step) <= currentIndex
												? "text-white"
												: "text-gray-500",
									})}
								</div>
								{registrationSteps.indexOf(step) + 1}
							</div>
						))}
					</div>

					{/* Enhanced progress bar with glow effect */}
					<div className="h-1 bg-gray-800 rounded-full overflow-hidden relative">
						<div
							className="progress-bar-fill h-full rounded-full relative"
							style={{
								width: `${(currentIndex / registrationSteps.length) * 100}%`,
								background: `linear-gradient(90deg, ${registrationSteps[currentIndex].color} 0%, ${registrationSteps[currentIndex].secondaryColor} 100%)`,
							}}
						>
							{/* Glow effect */}
							<div
								className="absolute inset-0 blur-sm opacity-70"
								style={{
									background: `linear-gradient(90deg, ${registrationSteps[currentIndex].color} 0%, ${registrationSteps[currentIndex].secondaryColor} 100%)`,
								}}
							/>
						</div>
					</div>
				</div>

				{/* Card carousel - centered and enhanced */}
				<div className="relative flex justify-center items-center">
					<div ref={carouselRef} className="relative w-full max-w-lg mx-auto">
						<AnimatePresence initial={false} custom={direction} mode="wait">
							<motion.div
								key={currentIndex}
								custom={direction}
								variants={variants}
								initial="enter"
								animate="center"
								exit="exit"
								className="flex justify-center"
							>
								<NeonRoseCard
									title={registrationSteps[currentIndex].title}
									className="w-full max-w-md h-[580px]"
									primaryColor={registrationSteps[currentIndex].color}
									secondaryColor={
										registrationSteps[currentIndex].secondaryColor
									}
								>
									<div
										className={`${electrolize.className} text-white h-full flex flex-col`}
									>
										<div
											className={`${readyplayerone.className} text-xl mb-6 tracking-wider`}
											style={{ color: registrationSteps[currentIndex].color }}
										>
											DuoThan 5.0 Registration
										</div>

										<div
											className="text-md opacity-90 mb-6"
											style={{ color: "#F0B5EA" }}
										>
											{`Step ${currentIndex + 1} of ${registrationSteps.length}: ${registrationSteps[currentIndex].title}`}
										</div>

										{/* First card: Instructions */}
										{currentIndex === 0 && (
											<div className="space-y-6 overflow-y-auto pr-1 custom-scrollbar">
												<p className="text-white leading-relaxed">
													Welcome to DuoThan 5.0! Before you proceed with
													registration, please read through the following
													important information:
												</p>

												<div className="bg-white/10 rounded p-3 border border-white/20">
													<h4
														className={`${readyplayerone.className} text-sm mb-2`}
														style={{
															color: registrationSteps[currentIndex].color,
														}}
													>
														Event Details:
													</h4>
													<ul className="text-sm space-y-2 list-disc list-inside">
														<li>Date: August 15-16, 2024</li>
														<li>Venue: Tech Innovation Center, Main Campus</li>
														<li>Registration Fee: ₹500 per team</li>
														<li>Registration Deadline: July 25, 2024</li>
													</ul>
												</div>

												<div className="bg-white/10 rounded p-3 border border-white/20">
													<h4
														className={`${readyplayerone.className} text-sm mb-2`}
														style={{
															color: registrationSteps[currentIndex].color,
														}}
													>
														Team Formation Rules:
													</h4>
													<ul className="text-sm space-y-1 list-disc list-inside">
														<li>Teams must consist of exactly 2 members</li>
														<li>Both team members must be current students</li>
														<li>Solo registrants will be paired randomly</li>
														<li>Cross-institutional teams are permitted</li>
													</ul>
												</div>

												<div className="bg-white/10 rounded p-3 border border-white/20">
													<h4
														className={`${readyplayerone.className} text-sm mb-2`}
														style={{
															color: registrationSteps[currentIndex].color,
														}}
													>
														What to Bring:
													</h4>
													<div className="flex justify-around py-2">
														<div className="text-center">
															<div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full bg-black/30 border border-white/10">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="20"
																	height="20"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	style={{
																		color:
																			registrationSteps[currentIndex].color,
																	}}
																>
																	<title>Card Data</title>
																	<rect
																		x="4"
																		y="5"
																		width="16"
																		height="14"
																		rx="2"
																	/>
																	<line x1="4" y1="17" x2="20" y2="17" />
																	<polyline points="4 12 8 12 10 8 12 16 14 12 16 12 18 12" />
																</svg>
															</div>
															<div className="text-xs">Laptop</div>
														</div>
														<div className="text-center">
															<div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full bg-black/30 border border-white/10">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="20"
																	height="20"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	style={{
																		color:
																			registrationSteps[currentIndex].color,
																	}}
																>
																	<title>Neon Glow</title>
																	<path d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
																	<path d="M12 18h.01" />
																</svg>
															</div>
															<div className="text-xs">ID Card</div>
														</div>
														<div className="text-center">
															<div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full bg-black/30 border border-white/10">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="20"
																	height="20"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	style={{
																		color:
																			registrationSteps[currentIndex].color,
																	}}
																>
																	<title>Stroke</title>
																	<path d="M12 13V7" />
																	<path d="M9 10h6" />
																	<path d="M11 2a2 2 0 0 0-2 2v1h6V4a2 2 0 0 0-2-2h-2Z" />
																	<path d="M6 10a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6Z" />
																</svg>
															</div>
															<div className="text-xs">Charger</div>
														</div>
													</div>
												</div>

												<div className="text-center py-3">
													<div className="text-white text-sm">
														Ready to join DuoThan 5.0? Click the button below to
														begin your registration!
													</div>
												</div>
											</div>
										)}

										{/* Second card: Team Details */}
										{currentIndex === 1 && (
											<div className="space-y-6">
												<div className="space-y-4">
													<div>
														<label
															className="block text-white text-sm mb-1"
															htmlFor="teamName"
														>
															Team Name <span className="text-red-400">*</span>
														</label>
														<input
															type="text"
															id="teamName"
															name="teamName"
															placeholder="Enter your team name"
															className={inputStyle}
															value={formData.teamName}
															onChange={handleInputChange}
														/>
														{formErrors.teamName && (
															<p className={errorStyle}>
																{formErrors.teamName}
															</p>
														)}
													</div>
												</div>
											</div>
										)}

										{/* Third card: Team Leader Details */}
										{currentIndex === 2 && (
											<div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
												<p className="text-white text-sm mb-2">
													Enter details for the team leader. This person will be
													our primary contact.
												</p>

												<div>
													<label
														className="block text-white text-sm mb-1"
														htmlFor="teamLeaderName"
													>
														Full Name <span className="text-red-400">*</span>
													</label>
													<input
														type="text"
														id="teamLeaderName"
														name="teamLeaderName"
														placeholder="Enter full name"
														className={inputStyle}
														value={formData.teamLeaderName}
														onChange={handleInputChange}
													/>
													{formErrors.teamLeaderName && (
														<p className={errorStyle}>
															{formErrors.teamLeaderName}
														</p>
													)}
												</div>

												<div>
													<label
														className="block text-white text-sm mb-1"
														htmlFor="teamLeaderEmail"
													>
														Email <span className="text-red-400">*</span>
													</label>
													<input
														type="email"
														id="teamLeaderEmail"
														name="teamLeaderEmail"
														placeholder="Enter email address"
														className={inputStyle}
														value={formData.teamLeaderEmail}
														onChange={handleInputChange}
													/>
													{formErrors.teamLeaderEmail && (
														<p className={errorStyle}>
															{formErrors.teamLeaderEmail}
														</p>
													)}
												</div>

												<div>
													<label
														className="block text-white text-sm mb-1"
														htmlFor="teamLeaderPhone"
													>
														Phone Number <span className="text-red-400">*</span>
													</label>
													<input
														type="tel"
														id="teamLeaderPhone"
														name="teamLeaderPhone"
														placeholder="Enter phone number"
														className={inputStyle}
														value={formData.teamLeaderPhone}
														onChange={handleInputChange}
													/>
													{formErrors.teamLeaderPhone && (
														<p className={errorStyle}>
															{formErrors.teamLeaderPhone}
														</p>
													)}
												</div>

												<div>
													<label
														className="block text-white text-sm mb-1"
														htmlFor="teamLeaderID"
													>
														Student ID <span className="text-red-400">*</span>
													</label>
													<input
														type="text"
														id="teamLeaderID"
														name="teamLeaderID"
														placeholder="Enter student ID"
														className={inputStyle}
														value={formData.teamLeaderID}
														onChange={handleInputChange}
													/>
													{formErrors.teamLeaderID && (
														<p className={errorStyle}>
															{formErrors.teamLeaderID}
														</p>
													)}
												</div>

												<div className="text-xs text-white/70 mt-4 italic">
													Team leader will be responsible for all communications
													and coordination during the event.
												</div>
											</div>
										)}

										{/* Fourth card: Team Member Details */}
										{currentIndex === 3 && (
											<div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
												<p className="text-white text-sm mb-2">
													Enter details for your team member. Teams must have
													exactly 2 participants.
												</p>

												<div>
													<label
														className="block text-white text-sm mb-1"
														htmlFor="memberName"
													>
														Full Name <span className="text-red-400">*</span>
													</label>
													<input
														type="text"
														id="memberName"
														name="memberName"
														placeholder="Enter full name"
														className={inputStyle}
														value={formData.memberName}
														onChange={handleInputChange}
													/>
													{formErrors.memberName && (
														<p className={errorStyle}>
															{formErrors.memberName}
														</p>
													)}
												</div>

												<div>
													<label
														className="block text-white text-sm mb-1"
														htmlFor="memberEmail"
													>
														Email <span className="text-red-400">*</span>
													</label>
													<input
														type="email"
														id="memberEmail"
														name="memberEmail"
														placeholder="Enter email address"
														className={inputStyle}
														value={formData.memberEmail}
														onChange={handleInputChange}
													/>
													{formErrors.memberEmail && (
														<p className={errorStyle}>
															{formErrors.memberEmail}
														</p>
													)}
												</div>

												<div>
													<label
														className="block text-white text-sm mb-1"
														htmlFor="memberPhone"
													>
														Phone Number <span className="text-red-400">*</span>
													</label>
													<input
														type="tel"
														id="memberPhone"
														name="memberPhone"
														placeholder="Enter phone number"
														className={inputStyle}
														value={formData.memberPhone}
														onChange={handleInputChange}
													/>
													{formErrors.memberPhone && (
														<p className={errorStyle}>
															{formErrors.memberPhone}
														</p>
													)}
												</div>

												<div>
													<label
														className="block text-white text-sm mb-1"
														htmlFor="memberID"
													>
														Student ID <span className="text-red-400">*</span>
													</label>
													<input
														type="text"
														id="memberID"
														name="memberID"
														placeholder="Enter student ID"
														className={inputStyle}
														value={formData.memberID}
														onChange={handleInputChange}
													/>
													{formErrors.memberID && (
														<p className={errorStyle}>{formErrors.memberID}</p>
													)}
												</div>

												<div className="flex items-start mt-4">
													<div className="flex items-center h-5">
														<input
															id="agreeTerms"
															name="agreeTerms"
															type="checkbox"
															className="h-4 w-4 rounded border-white/20 bg-transparent focus:ring-offset-0 focus:ring-1 focus:ring-[#a2ebff]"
															checked={formData.agreeTerms}
															onChange={(
																e: React.ChangeEvent<HTMLInputElement>,
															) => handleInputChange(e)}
														/>
													</div>
													<label
														htmlFor="agreeTerms"
														className="ml-2 block text-xs text-white"
													>
														I agree to the{" "}
														<span className="text-[#a2ebff] cursor-pointer">
															terms and conditions
														</span>{" "}
														and confirm both team members will attend the event
														in person.
													</label>
												</div>
												{formErrors.agreeTerms && (
													<p className={errorStyle}>{formErrors.agreeTerms}</p>
												)}

												<div className="bg-white/10 rounded p-3 border border-white/20 mt-4">
													<div className="text-xs text-white/80">
														<span
															className={`${readyplayerone.className} text-sm`}
															style={{
																color: registrationSteps[currentIndex].color,
															}}
														>
															Registration Summary:
														</span>
														<div className="mt-2 space-y-1">
															<div className="flex justify-between">
																<span>Team Name:</span>
																<span className="font-semibold">
																	{formData.teamName || "—"}
																</span>
															</div>
															<div className="flex justify-between">
																<span>Theme:</span>
																<span className="font-semibold">
																	{formData.selectedTheme || "—"}
																</span>
															</div>
															<div className="flex justify-between">
																<span>Team Size:</span>
																<span className="font-semibold">2 Members</span>
															</div>
															<div className="flex justify-between">
																<span>Registration Fee:</span>
																<span
																	className="font-semibold"
																	style={{
																		color:
																			registrationSteps[currentIndex].color,
																	}}
																>
																	₹500
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										)}

										<div className="mt-auto flex justify-between items-center">
											{/* Date info */}
											<div className="text-xs opacity-70">
												<span>Event Date: </span>
												<span
													style={{
														color: registrationSteps[currentIndex].color,
													}}
												>
													August 15-16, 2024
												</span>
											</div>

											{/* Action button - enhanced with better animation */}
											<motion.button
												className={`${readyplayerone.className} px-5 py-2 rounded-md tracking-wider flex items-center relative overflow-hidden group`}
												style={{
													backgroundColor: `${registrationSteps[currentIndex].color}20`,
													color: registrationSteps[currentIndex].color,
													border: `1px solid ${registrationSteps[currentIndex].color}`,
												}}
												whileHover={{
													scale: 1.05,
													backgroundColor:
														registrationSteps[currentIndex].color,
													color: "#fff",
													transition: { duration: 0.2 },
												}}
												whileTap={{ scale: 0.98 }}
												onClick={handleNext}
											>
												{/* Button background shine effect */}
												<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

												{/* Button text with icon */}
												<span className="relative z-10 flex items-center">
													{registrationSteps[currentIndex].buttonText}
													<ChevronRight className="ml-1" size={18} />
												</span>
											</motion.button>
										</div>
									</div>
								</NeonRoseCard>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Only show prev button when not on first card - enhanced styling */}
					{currentIndex > 0 && (
						<motion.button
							className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-16 translate-x-0 w-10 h-10 rounded-full flex items-center justify-center z-10 backdrop-blur-sm"
							style={{
								backgroundColor: "rgba(0,0,0,0.7)",
								border: `1px solid ${registrationSteps[currentIndex].color}30`,
								color: registrationSteps[currentIndex].color,
								boxShadow: `0 0 10px ${registrationSteps[currentIndex].color}30`,
							}}
							whileHover={{
								scale: 1.1,
								backgroundColor: `${registrationSteps[currentIndex].color}30`,
								boxShadow: `0 0 15px ${registrationSteps[currentIndex].color}50`,
							}}
							whileTap={{ scale: 0.95 }}
							onClick={handlePrev}
							disabled={isAnimating}
						>
							<ArrowLeft size={18} />
						</motion.button>
					)}
				</div>

				{/* Digital scan lines overlay for cyberpunk aesthetic */}
				<div className="fixed inset-0 pointer-events-none z-[-1] opacity-5">
					<div
						className="h-full w-full"
						style={{
							background:
								"repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 3px)",
							backgroundSize: "100% 3px",
						}}
					/>
				</div>
			</div>

			{/* Enhanced scrollbar styling */}
		</section>
	);
}

"use client";

import { gsap } from "gsap";
import React, {
	useState,
	useEffect,
	useRef,
	type ReactNode,
	type TouchEvent,
} from "react";

// Define a unique ID generator for stable keys
const generateUniqueId = (): string => {
	return Math.random().toString(36).substring(2, 15);
};

// interface SectionData {
// 	content: ReactNode;
// 	id: string;
// }

interface ViewportProps {
	children: ReactNode[];
	onSectionChange?: (index: number) => void;
	initialSection?: number;
}

const Viewport: React.FC<ViewportProps> = ({
	children,
	onSectionChange,
	initialSection = 0,
}) => {
	// Generate stable IDs for each section
	// const sectionIds = useRef<string[]>(
	// 	Array(children.length)
	// 		.fill(0)
	// 		.map(() => generateUniqueId()),
	// );
	const [currentSectionIndex, setCurrentSectionIndex] =
		useState(initialSection);
	const sectionRefs = useRef<HTMLDivElement[]>([]);
	const viewportRef = useRef<HTMLDivElement>(null);
	const scrollingRef = useRef(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Touch handling
	const touchStartY = useRef(0);
	const touchEndY = useRef(0);

	// Register sections
	useEffect(() => {
		sectionRefs.current = sectionRefs.current.slice(0, children.length);
	}, [children]);

	// Animate section change
	useEffect(() => {
		if (sectionRefs.current[currentSectionIndex]) {
			const section = sectionRefs.current[currentSectionIndex];
			gsap.fromTo(
				section.children,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					duration: 0.6,
					ease: "power2.out",
					delay: 0.3,
				},
			);
		}
	}, [currentSectionIndex]);

	// Handle wheel events for scrolling between sections
	const handleWheel = useRef((e: WheelEvent) => {
		e.preventDefault();

		if (scrollingRef.current) return;
		scrollingRef.current = true;

		// Determine scroll direction using latest state
		setCurrentSectionIndex((prevIndex) => {
			let newIndex = prevIndex;
			if (e.deltaY > 0 && prevIndex < children.length - 1) {
				// Scroll down
				newIndex = prevIndex + 1;
				onSectionChange?.(newIndex);
			} else if (e.deltaY < 0 && prevIndex > 0) {
				// Scroll up
				newIndex = prevIndex - 1;
				onSectionChange?.(newIndex);
			}
			return newIndex;
		});

		// Prevent rapid scrolling by adding a timeout
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			scrollingRef.current = false;
		}, 800); // Adjust this value to control scrolling sensitivity
	});

	// Update the wheel handler when dependencies change
	useEffect(() => {
		handleWheel.current = (e: WheelEvent) => {
			e.preventDefault();

			if (scrollingRef.current) return;
			scrollingRef.current = true;

			setCurrentSectionIndex((prevIndex) => {
				let newIndex = prevIndex;
				if (e.deltaY > 0 && prevIndex < children.length - 1) {
					newIndex = prevIndex + 1;
				} else if (e.deltaY < 0 && prevIndex > 0) {
					newIndex = prevIndex - 1;
				}
				return newIndex;
			});

			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				scrollingRef.current = false;
			}, 800);
		};
	}, [children.length]);

	// Set up the event listener only once
	useEffect(() => {
		const wheelHandler = (e: WheelEvent) => handleWheel.current(e);

		const viewport = viewportRef.current;
		if (viewport) {
			viewport.addEventListener("wheel", wheelHandler, { passive: false });
		}

		return () => {
			if (viewport) {
				viewport.removeEventListener("wheel", wheelHandler);
			}
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	// Handle touch events for mobile with refs to ensure consistent behavior
	const handleTouchStartRef = useRef((e: TouchEvent) => {
		touchStartY.current = e.touches[0].clientY;
	});

	const handleTouchMoveRef = useRef((e: TouchEvent) => {
		touchEndY.current = e.touches[0].clientY;
	});

	const handleTouchEndRef = useRef(() => {
		if (scrollingRef.current) return;

		const touchDiff = touchStartY.current - touchEndY.current;

		// At least 50px swipe distance to register as a swipe
		if (Math.abs(touchDiff) < 50) return;

		scrollingRef.current = true;

		setCurrentSectionIndex((prevIndex) => {
			let newIndex = prevIndex;
			if (touchDiff > 0 && prevIndex < children.length - 1) {
				// Swipe up (move to next section)
				newIndex = prevIndex + 1;
				onSectionChange?.(newIndex);
			} else if (touchDiff < 0 && prevIndex > 0) {
				// Swipe down (move to previous section)
				newIndex = prevIndex - 1;
				onSectionChange?.(newIndex);
			}
			return newIndex;
		});

		// Prevent rapid scrolling
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			scrollingRef.current = false;
		}, 800);
	});

	// Update touch handlers when dependencies change
	useEffect(() => {
		handleTouchEndRef.current = () => {
			if (scrollingRef.current) return;

			const touchDiff = touchStartY.current - touchEndY.current;

			// At least 50px swipe distance to register as a swipe
			if (Math.abs(touchDiff) < 50) return;

			scrollingRef.current = true;

			setCurrentSectionIndex((prevIndex) => {
				let newIndex = prevIndex;
				if (touchDiff > 0 && prevIndex < children.length - 1) {
					// Swipe up (move to next section)
					newIndex = prevIndex + 1;
				} else if (touchDiff < 0 && prevIndex > 0) {
					// Swipe down (move to previous section)
					newIndex = prevIndex - 1;
				}
				return newIndex;
			});

			// Prevent rapid scrolling
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				scrollingRef.current = false;
			}, 800);
		};
	}, [children.length]);

	// Simple wrapper functions to use in JSX
	const handleTouchStart = (e: TouchEvent) => handleTouchStartRef.current(e);
	const handleTouchMove = (e: TouchEvent) => handleTouchMoveRef.current(e);
	const handleTouchEnd = () => handleTouchEndRef.current();

	// Handle keyboard navigation with ref to ensure consistent behavior
	const handleKeyDownRef = useRef((e: KeyboardEvent) => {
		setCurrentSectionIndex((prevIndex) => {
			let newIndex = prevIndex;

			if (
				(e.key === "ArrowDown" || e.key === "PageDown") &&
				prevIndex < children.length - 1
			) {
				newIndex = prevIndex + 1;
				onSectionChange?.(newIndex);
			} else if ((e.key === "ArrowUp" || e.key === "PageUp") && prevIndex > 0) {
				newIndex = prevIndex - 1;
				onSectionChange?.(newIndex);
			} else if (e.key === "Home") {
				newIndex = 0;
				onSectionChange?.(0);
			} else if (e.key === "End") {
				newIndex = children.length - 1;
				onSectionChange?.(children.length - 1);
			}

			return newIndex;
		});
	});

	// Update keyboard handler when dependencies change
	useEffect(() => {
		handleKeyDownRef.current = (e: KeyboardEvent) => {
			setCurrentSectionIndex((prevIndex) => {
				let newIndex = prevIndex;

				if (
					(e.key === "ArrowDown" || e.key === "PageDown") &&
					prevIndex < children.length - 1
				) {
					newIndex = prevIndex + 1;
				} else if (
					(e.key === "ArrowUp" || e.key === "PageUp") &&
					prevIndex > 0
				) {
					newIndex = prevIndex - 1;
				} else if (e.key === "Home") {
					newIndex = 0;
				} else if (e.key === "End") {
					newIndex = children.length - 1;
				}

				return newIndex;
			});
		};
	}, [children.length]);

	// Set up the keyboard event listener only once
	useEffect(() => {
		const keydownHandler = (e: KeyboardEvent) => handleKeyDownRef.current(e);

		window.addEventListener("keydown", keydownHandler);
		return () => window.removeEventListener("keydown", keydownHandler);
	}, []);

	// Allow direct navigation to a specific section with ref to ensure consistent behavior
	const goToSectionRef = useRef((index: number) => {
		if (index >= 0 && index < children.length) {
			setCurrentSectionIndex(index);
			onSectionChange?.(index);
		}
	});

	// Update goToSection when dependencies change
	useEffect(() => {
		goToSectionRef.current = (index: number) => {
			if (index >= 0 && index < children.length) {
				setCurrentSectionIndex(index);
			}
		};
	}, [children.length]);

	// Simple wrapper function to use in JSX
	const goToSection = (index: number) => goToSectionRef.current(index);

	// Notify parent component when section changes
	useEffect(() => {
		if (onSectionChange) {
			// Call onSectionChange in the next tick to avoid React state update issues
			const timeoutId = setTimeout(() => {
				onSectionChange(currentSectionIndex);
			}, 0);

			return () => clearTimeout(timeoutId);
		}
	}, [currentSectionIndex, onSectionChange]);

	return (
		<div
			ref={viewportRef}
			className="viewport h-screen w-full overflow-hidden relative"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div
				className="viewport-container transition-transform duration-1000 ease-in-out h-full"
				style={{ transform: `translateY(-${currentSectionIndex * 100}%)` }}
			>
				{React.Children.map(children, (child, index) => (
					<div
						ref={(el) => {
							if (el) sectionRefs.current[index] = el;
						}}
						className="viewport-section h-screen w-full"
					>
						{child}
					</div>
				))}
			</div>

			{/* Navigation dots */}
			<div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-3">
				{Array.from({ length: children.length }).map((_, index) => (
					<button
						key={`nav-dot-${index}-${Math.random().toString(36).substring(2, 7)}`}
						type="button"
						onClick={() => goToSection(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							currentSectionIndex === index
								? "bg-cyan-400 scale-125 shadow-[0_0_8px_rgba(77,210,255,0.6)]"
								: "bg-gray-600 hover:bg-gray-400"
						}`}
						aria-label={`Go to section ${index + 1}`}
					/>
				))}
			</div>

			{/* Scroll indicator for the first section */}
			{currentSectionIndex === 0 && (
				<div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8 text-cyan-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-labelledby="scrollDownTitle"
						role="img"
					>
						<title id="scrollDownTitle">Scroll down</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</div>
			)}
		</div>
	);
};

export default Viewport;

"use client";
import AboutUs from "@/components/AboutUs/AboutUs";
import Contactus from "@/components/ContactUs/ContactUs";
import Header from "@/components/Header/Header";
import PastEvents from "@/components/PastEvents/PastEvents";
import Sponsors from "@/components/Sponsors/Sponsors";
import CountdownTimer from "@/components/countdown/countdown";
import RegistrationBanner from "@/components/register-page/RegistrationBanner";
import SideSkirts from "@/components/side-skirts/SideSkirts";
import Timeline from "@/components/timeline/timeline";

import HudBackground from "@/components/background/HudBackground";
import DownTag from "@/components/down-tag/page";
import Viewport from "@/components/viewport/Viewport";
import ViewportSection from "@/components/viewport/ViewportSection";
import { useEffect, useState } from "react";

export default function Home() {
	const targetDate = "2025-05-30T00:00:00";

	// Define sections for the viewport
	const sections = [
		{ name: "Hero", id: "hero-section" },
		{ name: "About Us", id: "about-us" },
		{ name: "Sponsors", id: "sponsors" },
		{ name: "Registration", id: "registration" },
		{ name: "Past Events", id: "past-events" },
		{ name: "Timeline", id: "timeline" },
		{ name: "Contact", id: "contact" },
	];

	const [activeSectionName, setActiveSectionName] = useState(sections[0].name);
	const [mounted, setMounted] = useState(false);
	// Ensure hydration issues are avoided
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSectionChange = (index: number) => {
		// Use functional update to avoid issues during render
		setTimeout(() => {
			setActiveSectionName(sections[index].name);
			// console.log(`Active section changed to: ${sections[index].name}`);
		}, 0);
	};

	if (!mounted) {
		return null; // Avoid hydration issues
	}

	return (
		<div className="relative no-scrollbar">
			{/* Fixed elements that stay on screen during scrolling */}
			<div className="fixed top-0 left-0 right-0 z-50">
				<Header />
			</div>
			<SideSkirts leftLabel="Days" rightLabel="Hrs" targetDate={targetDate} />
			<DownTag text={activeSectionName} />
			<HudBackground />

			{/* Viewport component with all sections */}
			<Viewport onSectionChange={handleSectionChange}>
				{/* Hero Section */}
				<ViewportSection
					id={sections[0].id}
					className="flex flex-col items-center justify-center text-center"
				>
					<CountdownTimer targetDate={targetDate} />
				</ViewportSection>

				{/* About Us Section */}
				<ViewportSection id={sections[1].id}>
					<AboutUs />
				</ViewportSection>

				{/* Sponsors Section */}
				<ViewportSection id={sections[2].id}>
					<Sponsors />
				</ViewportSection>

				{/* Registration Section */}
				<ViewportSection id={sections[3].id}>
					<RegistrationBanner />
				</ViewportSection>

				{/* Past Events Section */}
				<ViewportSection id={sections[4].id}>
					<PastEvents />
				</ViewportSection>

				{/* Timeline Section */}
				<ViewportSection id={sections[5].id}>
					<Timeline />
				</ViewportSection>

				{/* Contact Section */}
				<ViewportSection
					id={sections[6].id}
					className="w-full bg-cover bg-top bg-no-repeat"
				>
					<Contactus />
				</ViewportSection>
			</Viewport>
		</div>
	);
}

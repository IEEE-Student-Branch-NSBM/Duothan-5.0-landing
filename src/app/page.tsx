"use client";
import AboutUs from "@/components/AboutUs/AboutUs";
import HudBackground from "@/components/background/HudBackground";
// import Header from "@/components/Header/Header";
import Contactus from "@/components/contactus/contactus";
import CountdownTimer from "@/components/countdown/countdown";
import DownTag from "@/components/down-tag/page";
// import ViewportDebugPanel from "@/components/viewport/ViewportDebugPanel";
import Footer from "@/components/footer";
import PastEvents from "@/components/pastevents/pastevents";
import RegistrationBanner from "@/components/register-page/RegistrationBanner";
import SideSkirts from "@/components/side-skirts/SideSkirts";
import Sponsors from "@/components/sponsors/sponsors";
import Timeline from "@/components/timeline/timeline";
import Viewport from "@/components/viewport/Viewport";
import ViewportSection from "@/components/viewport/ViewportSection";
import { useEffect, useState } from "react";

export default function Home() {
	const targetDate = "2025-05-30T00:00:00";

	// Define sections for the viewport
	const sections = [
		{ name: "CountDown", id: "hero-section" },
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

	// Check if current section is Contact to hide UI elements
	const isContactSection = activeSectionName === "Contact";

	if (!mounted) {
		return null; // Avoid hydration issues
	}

	return (
		<div className="relative no-scrollbar">
			{/* Fixed elements that stay on screen during scrolling */}

			{!isContactSection && (
				<SideSkirts leftLabel="Days" rightLabel="Hrs" targetDate={targetDate} />
			)}
			{!isContactSection && <DownTag text={activeSectionName} />}
			<HudBackground />

			{/* Debug panel for viewport scaling - hidden by default, press 'D' to show */}
			{/* {process.env.NODE_ENV !== "production" && (
				<ViewportDebugPanel hidden={true} />
			)} */}

			{/* Viewport component with all sections */}
			<Viewport onSectionChange={handleSectionChange}>
				{/* Hero Section */}
				<ViewportSection id={sections[0].id}>
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
				<ViewportSection id={sections[6].id} className="">
					<Contactus />
				</ViewportSection>
			</Viewport>

			{/* Only show footer when viewport reaches contact section with animation */}
			{activeSectionName === "Contact" && <Footer />}
		</div>
	);
}

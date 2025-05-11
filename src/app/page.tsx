"use client";
import AboutUs from "@/components/about-us/aboutus";
import Contactus from "@/components/contactus/contactus";
import PastEvents from "@/components/pastevents/pastevents";
import Register from "@/components/registation-pages/Register";
import RegisterButton from "@/components/registation-pages/RegisterButton";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
	const [showRegisterButton, setShowRegisterButton] = useState(true);
	const [showRegisterForm, setShowRegisterForm] = useState(false);
	const isClient = typeof window !== "undefined";

	const handleRegisterComplete = () => {
		// First show the registration form
		setShowRegisterForm(true);

		// After a slight delay, hide the register button section
		setTimeout(() => {
			setShowRegisterButton(false);
		}, 300);
	};

	return (
		<div>
			<div className="min-h-screen">Hero</div>
			<AboutUs />
			<PastEvents />

			<AnimatePresence mode="wait">
				{showRegisterButton && isClient && (
					<RegisterButton
						key="register-button"
						onRegisterComplete={handleRegisterComplete}
					/>
				)}
			</AnimatePresence>

			{showRegisterForm && !showRegisterButton && (
				<Register key="register-form" />
			)}

			<Contactus />
		</div>
	);
}

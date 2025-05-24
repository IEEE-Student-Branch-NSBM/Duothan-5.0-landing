import Header from "@/components/Header/Header";
import AboutUs from "@/components/about-us/aboutus";
import Contactus from "@/components/contactus/contactus";
import CountdownTimer from "@/components/countdown/countdown";

import PastEvents from "@/components/pastevents/pastevents";
import RegistrationBanner from "@/components/register-page/RegistrationBanner";
import SideSkirts from "@/components/side-skirts/SideSkirts";
import Sponsors from "@/components/sponsors/sponsors";
import Timeline from "@/components/timeline/timeline";

import HudBackground from "@/components/background/HudBackground";

export default function Home() {
	const targetDate = "2025-05-30T00:00:00";

	return (
		<div className="relative no-scrollbar">
			<SideSkirts leftLabel="Days" rightLabel="Hrs" targetDate={targetDate} />
			<Header />
			{/* Hero Section */}
			<div className="min-h-screen text-center py-10">
				Hero
				<CountdownTimer targetDate={targetDate} />
			</div>
			<AboutUs />
			<Sponsors />

			<RegistrationBanner />
			<PastEvents />
			<Timeline />

			<div className="relative w-full bg-cover bg-top bg-no-repeat">
				<Contactus />
			</div>
			<HudBackground />
		</div>
	);
}

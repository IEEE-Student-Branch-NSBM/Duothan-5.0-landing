import AboutUs from "@/components/about-us/aboutus";
import Contactus from "@/components/contactus/contactus";
import CountdownTimer from "@/components/countdown/countdown";
import Header from "@/components/header/header";

import PastEvents from "@/components/pastevents/pastevents";
import RegistrationBanner from "@/components/register-page/RegistrationBanner";
import SideSkirts from "@/components/side-skirts/SideSkirts";
import Sponsors from "@/components/sponsors/sponsors";
import Timeline from "@/components/timeline/timeline";

export default function Home() {
	return (
		<div className="relative no-scrollbar">
			<SideSkirts />
			<Header />
			{/* Hero Section */}
			<div className="min-h-screen text-center py-10">
				Hero
				<CountdownTimer targetDate="2025-05-30T00:00:00" />
			</div>
			<AboutUs />
			<Sponsors />

			<RegistrationBanner />
			<PastEvents />
			<Timeline />

			<div className="relative w-full bg-cover bg-top bg-no-repeat">
				<Contactus />
			</div>
		</div>
	);
}

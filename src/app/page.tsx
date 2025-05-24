import AboutUs from "@/components/about-us/aboutus";
import Contactus from "@/components/contactus/contactus";
import Countdown from "@/components/countdown/countdown";
import Header from "@/components/header/header";

import PastEvents from "@/components/pastevents/pastevents";
import Sponsors from "@/components/sponsors/sponsors";

import RegistrationBanner from "@/components/register-page/RegistrationBanner";
import Timeline from "@/components/timeline/timeline";

export default function Home() {
	return (
		<div>
			<Header />
			<div className="min-h-screen text-center py-10">
				<Countdown targetDate="2025-05-30T00:00:00" />
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

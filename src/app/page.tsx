import AboutUs from "@/components/about-us/aboutus";
import Contactus from "@/components/contactus/contactus";
import Countdown from "@/components/countdown/Countdown";
import Header from "@/components/header/header";
import PastEvents from "@/components/pastevents/pastevents";
import RegistrationBanner from "@/components/register-page/RegistrationBanner";
import Timeline from "@/components/timeline/timeline";

export default function Home() {
	return (
		<div>
			<Header />
			<div className="min-h-screen">Hero</div>
			<Countdown />
			<AboutUs />
			<RegistrationBanner />
			<PastEvents />
			<Timeline />
			<div className="relative w-full bg-cover bg-top bg-no-repeat">
				<Contactus />
			</div>
		</div>
	);
}

import AboutUs from "@/components/about-us/aboutus";
import Contactus from "@/components/contactus/contactus";
import PastEvents from "@/components/pastevents/pastevents";
import Sponsors from "@/components/sponsors/sponsors";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen">Hero</div>
			<AboutUs />
			<Sponsors />
			<PastEvents />
			<Contactus />
		</div>
	);
}

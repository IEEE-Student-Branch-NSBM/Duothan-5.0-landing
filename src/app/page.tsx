import AboutUs from "@/components/about-us/aboutus";
import Contactus from "@/components/contactus/contactus";
import PastEvents from "@/components/pastevents/pastevents";
import Timeline from "@/components/timeline/timeline";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen">Hero</div>
			<AboutUs />
			<PastEvents />
			<Timeline />
			<Contactus />
		</div>
	);
}

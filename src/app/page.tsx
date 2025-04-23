import AboutUs from "@/components/aboutus";
import Contactus from "@/components/contactus/contactus";
import PastEvents from "@/components/pastevents";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen">Hero</div>
			<AboutUs />
			<PastEvents />
			<Contactus />
		</div>
	);
}

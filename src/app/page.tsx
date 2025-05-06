import AboutUs from "@/components/about-us/aboutus";
import Contactus from "@/components/contactus/contactus";
import PastEvents from "@/components/pastevents/pastevents";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen">Hero</div>
			<AboutUs />
			<PastEvents />
			<div className="relative w-full bg-cover bg-top bg-no-repeat">
				<div className="absolute inset-0 bg-[url('/background.gif')] bg-cover bg-top bg-no-repeat opacity-70 z-0" />
				<Contactus />
			</div>
		</div>
	);
}

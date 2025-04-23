import PastEvents from "@/components/pastevents";
import AboutUs from "@/components/aboutus";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen">Hero</div>
			<PastEvents />
			<AboutUs />
		</div>
	);
}
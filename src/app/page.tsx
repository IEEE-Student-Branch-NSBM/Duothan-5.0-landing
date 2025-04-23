import AboutUs from "@/components/aboutus";
import PastEvents from "@/components/pastevents";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen">Hero</div>
			<AboutUs />
			<PastEvents />
		</div>
	);
}

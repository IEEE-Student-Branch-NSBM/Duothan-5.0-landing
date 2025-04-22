import Contactus from "@/components/contactus/contactus";
import Footer from "@/components/footer";

export default function Home() {
	return (
		<div>
			<div className="min-h-screen bg-black bg-no-repeat bg-cover bg-center">
				<Contactus />
			</div>
			<Footer />
		</div>
	);
}

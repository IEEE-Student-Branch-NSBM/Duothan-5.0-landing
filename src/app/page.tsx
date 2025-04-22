import Contactus from "@/components/contactus/contactus";
import Footer from "@/components/footer";
import Image from "next/image";

export default function Home() {
	return (
		<div>
			Duothan 5.0
			<div
				className="min-h-screen bg-black bg-no-repeat bg-cover bg-center"
				style={{
					backgroundImage: "", // background image
				}}
			>
				<Contactus />
			</div>
			<Footer />
		</div>
	);
}

"use client";
import { getImagePath } from "@/lib/imagePath";
import localFont from "next/font/local";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const readyplayerone = localFont({
	src: "../../fonts/font.otf",
});

interface ContactCardProps {
	name: string;
	title: string;
	image: string;
	linkedin: string;
	phone: string;
	email: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
	name,
	title,
	image,
	linkedin,
	phone,
	email,
}) => {
	return (
		<div className="relative w-[320px] h-[450.71px]">
			<Image
				src={getImagePath("/card1.svg")}
				alt="card background"
				fill
				className="object-center rounded-lg z-0"
			/>

			<div className="absolute inset-0 flex flex-col z-10 p-4">
				<div className="w-[260.17px] h-[200px] rounded-[2px] z-10 relative mx-auto mt-8">
					<div
						className="absolute inset-0 overflow-hidden"
						style={{
							maskImage: `url(${getImagePath("/Union.svg")})`,
							WebkitMaskImage: `url(${getImagePath("/Union.svg")})`,
						}}
					>
						<Image src={image} alt="profile" fill className="object-cover" />
					</div>
				</div>

				<div className="mt-auto text-center pb-8">
					<h3
						className={`text-[#A2EBFF] font-normal text-[20px] leading-[120%] tracking-[0.04em] text-center mb-2 ${readyplayerone.className}`}
					>
						{name}
					</h3>
					<p className="text-white text-[14px] text-center font-[Electrolize] mb-4">
						{title}
					</p>
					<div className="flex justify-center mt-2 space-x-4">
						<a
							href={`tel:${phone}`}
							className="text-[#A2EBFF] w-7 h-7 border border-[#A2EBFF] rounded-md flex items-center justify-center hover:bg-[#A2EBFF20] transition-colors"
						>
							<FaPhoneAlt size={14} className="text-[#A2EBFF]" />
						</a>
						<a
							href={linkedin}
							className="text-[#A2EBFF] w-7 h-7 border border-[#A2EBFF] rounded-md flex items-center justify-center hover:bg-[#A2EBFF20] transition-colors"
						>
							<FaLinkedinIn size={16} />
						</a>
						<a
							href={`mailto:${email}`}
							className="text-[#A2EBFF] w-7 h-7 border border-[#A2EBFF] rounded-md flex items-center justify-center hover:bg-[#A2EBFF20] transition-colors"
						>
							<MdEmail size={18} />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;

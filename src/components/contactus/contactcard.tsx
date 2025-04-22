"use client";
import Image from "next/image";
import { CiLinkedin } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
	linkedin,
	phone,
	email,
}) => {
	return (
		<div className="relative w-[320px] h-[420px]">
			<Image
				src="/card1.svg"
				alt="card background"
				fill
				className="object-center rounded-lg z-0"
			/>

			<div className="absolute inset-0 flex flex-col items-center justify-center z-10">
				<div className="w-[290px] h-[260px] relative">
					<Image
						src="/Union.svg"
						alt="profile frame"
						fill
						className="object-cover"
					/>
				</div>

				<div className="mt-2 text-right mr-1">
					<h3 className="text-[#A2EBFF] font-bold text-[22px]">{name}</h3>
					<p className="text-white text-sm font-[Electrolize]">{title}</p>
					<div className="flex justify-center ml-45 mt-2 space-x-3">
						<a href={`tel:${phone}`} className="text-[#A2EBFF] mt-1">
							<FaPhone size={18} />
						</a>
						<a href={linkedin} className="text-[#A2EBFF]">
							<CiLinkedin size={26} />
						</a>
						<a href={`mailto:${email}`} className="text-[#A2EBFF]">
							<MdEmail size={25} />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;

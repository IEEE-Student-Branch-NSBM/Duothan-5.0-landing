"use client";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import type { Contact } from "./ContactData";

const ContactCard: React.FC<Contact> = ({
	name,
	title,
	image,
	linkedin,
	phone,
	email,
}) => {
	return (
		<div className="relative w-[300px] h-[380.71px]">
			<Image
				src="/card1.svg"
				alt="card background"
				fill
				className="object-center rounded-lg z-0"
			/>

			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 ">
				<div className="w-[260.17px] h-[234px] rounded-[2px] z-10 mr-2 relative ">
					<div className="absolute inset-0 overflow-hidden mask-[url('/Union.svg')]">
						<Image src={image} alt="profile" fill className="object-fit" />
					</div>
				</div>

				<div className="mt-3 text-right pr-13">
					<h3 className="text-[#A2EBFF] font-normal text-[22px] leading-[100%] tracking-[0.04em] text-right">
						{name}
					</h3>
					<p className="text-white text-sm font-[Electrolize]">{title}</p>
					<div className="flex justify-center ml-55 mt-1 space-x-2">
						<a
							href={`tel:${phone}`}
							className="text-[#A2EBFF] mt-1 w-6 h-6 border border-[#A2EBFF] rounded-md flex items-center justify-center"
						>
							<FaPhoneAlt size={13} className="text-[#A2EBFF]" />
						</a>
						<a
							href={linkedin}
							className="text-[#A2EBFF] mt-1 w-6 h-6 border border-[#A2EBFF] rounded-md flex items-center justify-center"
						>
							<FaLinkedinIn size={15} />
						</a>
						<a
							href={`mailto:${email}`}
							className="text-[#A2EBFF] mt-1 w-6 h-6 border border-[#A2EBFF] rounded-md flex items-center justify-center"
						>
							<MdEmail size={17} />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;

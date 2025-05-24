import Image from "next/image";
import type { PastEvent } from "./PastEventData";

export default function PastEventCard({
	title,
	image,
	description,
}: PastEvent) {
	return (
		<div className="relative w-[300px] h-[388.7px]">
			<Image
				src="/eventcard.svg"
				alt="card background"
				fill
				className="object-center rounded-lg z-0"
			/>

			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 ">
				<div className="w-[260px] h-[180px] mr-3 mt-2 mb-48 rounded-[2px] z-10 relative ">
					<div className="absolute inset-0 overflow-hidden mask-[url('/eventmask.svg')] [mask-repeat:no-repeat]">
						<Image src={image} alt="profile" fill className="" />
					</div>
				</div>
				<div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-center pl-3 pr-5">
					<p
						className={
							"text-[25px] text-[#a2ebff] text-start font-bold  pt-40 pb-1"
						}
					>
						{title}
					</p>
					<p className={"text-white text-[14px] text-sm md:text-xs"}>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}

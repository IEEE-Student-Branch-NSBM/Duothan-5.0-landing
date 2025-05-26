import Image from "next/image";

export default function Loading() {
	return (
		<div className="fixed inset-0 bg-black flex items-center justify-center z-50">
			<div className="animate-pulse">
				<Image
					src="/onlylogo.svg"
					alt="Duothan Logo"
					width={150}
					height={150}
					style={{
						filter: "brightness(0) saturate(100%)",
					}}
					className="invert animate-pulse"
				/>
			</div>
		</div>
	);
}

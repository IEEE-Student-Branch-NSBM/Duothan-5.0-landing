"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
	img: string;
	url?: string;
}

export default function Card({ img, url }: CardProps) {
	const cardContent = (
		<div className="relative w-full max-w-[180px] sm:max-w-[200px] mx-auto overflow-hidden transition-all duration-300 hover:scale-105">
			{/* Background design - now self-closing */}
			<div
				className="absolute inset-0 bg-no-repeat bg-center bg-contain"
				style={{
					backgroundImage: "url('/sponsors.svg')",
				}}
			/>

			{/* Image container */}
			<div className="relative aspect-[4/2] w-full z-10 bg-transparent">
				<Image
					src={img}
					alt="Sponsor logo"
					fill
					className="object-contain p-4 sm:p-6"
					sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
				/>
			</div>
		</div>
	);

	return url ? (
		<Link
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="block"
		>
			{cardContent}
		</Link>
	) : (
		cardContent
	);
}

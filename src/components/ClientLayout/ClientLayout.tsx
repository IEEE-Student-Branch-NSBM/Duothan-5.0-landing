"use client";

import Loading from "@/components/Loading/Loading";
import { useEffect, useState } from "react";

export default function ClientLayout({
	children,
}: { children: React.ReactNode }) {
	// Still keep this for compatibility but don't show our own loading UI
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Set a shorter timeout to avoid conflict with SimpleLoading
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{/* Don't use our old Loading component as we have SimpleLoading now */}
			{/* <Loading onLoadComplete={() => setLoading(false)} /> */}
			{loading ? null : children}
		</>
	);
}

"use client";

import { useState } from "react";
import SimpleLoading from "./SimpleLoading";

interface LoadingProviderProps {
	children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
	const [loading, setLoading] = useState(true);

	return (
		<>
			{loading && <SimpleLoading onComplete={() => setLoading(false)} />}
			{!loading && children}
		</>
	);
}

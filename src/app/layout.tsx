import type { Metadata } from "next";
import { Electrolize, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import "./countdown.css";

// import Footer from "@/components/footer";
import Header from "@/components/Header/Header";

const electrolize = Electrolize({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	weight: "400",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const orbitron = Orbitron({
	subsets: ["latin"],
	variable: "--font-orbitron",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Duothan 5.0",
	description: "by NSBM IEEE Student Branch",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${electrolize.variable} ${geistMono.variable} ${orbitron.variable} antialiased no-scrollbar `}
			>
				<div className="fixed top-0 left-0 right-0 z-50">
					<Header />
				</div>
				{children}
				{/* <Footer /> */}
			</body>
		</html>
	);
}

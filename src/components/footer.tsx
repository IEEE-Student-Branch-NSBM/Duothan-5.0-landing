export default function Footer() {
	return (
		<footer className="relative w-full h-[104px] overflow-hidden">
			<div className="absolute inset-0 bg-[url('/background.gif')] bg-no-repeat bg-cover bg-bottom opacity-70 z-0" />

			<div className="relative z-10 text-white backdrop-blur-[30px] font-[Electrolize] text-center px-4 py-6 text-xs sm:text-sm w-full h-full flex items-center justify-center">
				<p className="leading-snug">
					Copyright © 2025, Developed by IEEE Computer Society of NSBM
				</p>
			</div>
		</footer>
	);
}

import React from "react";

const Header = () => {
	return (
		<div className="relative bg-transparent overflow-hidden w-full">
			<div>
				<div className="w-full flex justify-center items-center relative">
					<img
						src="./headerUnion.svg"
						alt="Neon outer border with glowing effect framing the header area"
						className="max-w-[1600px] object-cover"
					/>
					{/* <div className="w-full flex justify-center items-center absolute">
						<img
							src="./Vector 455.svg"
							alt="Blue neon border accentuating the header with a modern digital style"
							className="max-w-[1600px] object-cover"
						/>
					</div> */}
					{/* <div className="w-full flex justify-center items-center absolute top-0">
						<img
							src="./Vector 456.svg"
							alt="Decorative vector graphic adding layered depth to the header background"
							className="max-w-[1600px] object-cover"
						/>
					</div> */}
					<div className="w-full flex justify-center items-center absolute top-2">
						<img
							src="./duo 5.svg"
							alt="Duothan 5.0 logo centered in the header, featuring bold stylized text and a futuristic design, conveying excitement and innovation"
							className="h-20 md:h-15 object-contain drop-shadow-lg animate-pulse "
						/>
					</div>
					<div className="absolute flex justify-center w-full top-22">
						<a href="#register">
							<img
								src="./reg.svg"
								alt="Register button with the word Register in bold, inviting users to sign up, set against a vibrant background"
								className="h-8 md:h-8 lg:h-8 transition-transform hover:scale-105"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;

"use client";
import { Electrolize } from "next/font/google";
import { useEffect, useState } from "react";

const Countdown = () => {
	// set the target date to registration opening date for now its set to 15 may
	const targetDate = new Date("May 15, 2025 00:00:00").getTime();

	const [timeLeft, setTimeLeft] = useState({
		days: "00",
		hours: "00",
		minutes: "00",
		seconds: "00",
	});

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime();
			const distance = targetDate - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
			const formatNumber = (num) => String(num).padStart(2, "0");
			setTimeLeft({
				days: formatNumber(days),
				hours: formatNumber(hours),
				minutes: formatNumber(minutes),
				seconds: formatNumber(seconds),
			});
			if (distance < 0) {
				clearInterval(timer);
				setTimeLeft({
					days: "00",
					hours: "00",
					minutes: "00",
					seconds: "00",
				});
			}
		}, 1000);
		return () => clearInterval(timer);
	}, [targetDate]);
	const Countdownbox = ({ value, lable }) => (
		<div className="flex flex-col items-center justify-center rounded-md border-2 border-[#e957dd] bg-gray-300/25 p-2 sm:p-3 md:p-4 w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 shadow-lg mx-1 sm:mx-2">
			<div className="text-[#a2ebff] text-3xl sm:text-4xl md:text-5xl font-[Electrolize] font-medium">
				{value}
			</div>
			<div className="text-[#a2ebff] text-s font-[Electrolize] font-light mt-1">
				{lable}
			</div>
		</div>
	);
	return (
		<div className="flex items-center justify-center min-h-100 bg-transparent ">
			<div className="flex flex-row flex-wrap justify-center items-center">
				<Countdownbox value={timeLeft.days} lable="days" />
				<Countdownbox value={timeLeft.hours} lable="hours" />
				<Countdownbox value={timeLeft.minutes} lable="min" />
				<Countdownbox value={timeLeft.seconds} lable="sec" />
			</div>
		</div>
	);
};

export default Countdown;

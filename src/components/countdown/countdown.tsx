"use client";
import React, { useEffect, useState } from "react";

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const updateCountdown = () => {
			const now = new Date().getTime();
			const target = new Date(targetDate).getTime();
			const distance = target - now;

			if (distance < 0) {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				return;
			}

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			setTimeLeft({ days, hours, minutes, seconds });
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	}, [targetDate]);

	const format = (val: number) => val.toString().padStart(2, "0");

	return (
		<div className="hud-wrapper">
			<div className="hud-container">
				<div className="hud-overlay-box">
					<div className="hud-value">{format(timeLeft.days)}</div>
					<div className="hud-label">days</div>
				</div>
				<div className="hud-overlay-box">
					<div className="hud-value">{format(timeLeft.hours)}</div>
					<div className="hud-label">hours</div>
				</div>
				<div className="hud-overlay-box">
					<div className="hud-value">{format(timeLeft.minutes)}</div>
					<div className="hud-label">min</div>
				</div>
				<div className="hud-overlay-box">
					<div className="hud-value">{format(timeLeft.seconds)}</div>
					<div className="hud-label">sec</div>
				</div>
			</div>
		</div>
	);
};

export default CountdownTimer;

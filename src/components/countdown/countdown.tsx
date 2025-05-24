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
				<div className="hud-overlay-box box-hours">
					<div className="hud-value">{format(timeLeft.hours)}</div>
					<div className="hud-label">Hours</div>
				</div>
				<div className="hud-overlay-box box-days">
					<div className="hud-value">{format(timeLeft.days)}</div>
					<div className="hud-label">Days</div>
				</div>
				<div className="hud-overlay-box box-minutes">
					<div className="hud-value">{format(timeLeft.minutes)}</div>
					<div className="hud-label">Mins</div>
				</div>
			</div>
		</div>
	);
};

export default CountdownTimer;

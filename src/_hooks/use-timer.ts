import { useEffect, useState } from "react";

interface Time {
	hours: number;
	minutes: number;
	seconds: number;
	day: string;
	date: number;
	month: string;
	year: number;
}

const useTimer = (): Time => {
	const [time, setTime] = useState<Time>(getFormattedTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(getFormattedTime());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return time;
};

const getFormattedTime = (): Time => {
	const date = new Date();
	return {
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		day: date.toLocaleString([], { weekday: "long" }),
		date: date.getDate(),
		month: date.toLocaleString([], { month: "long" }),
		year: date.getFullYear(),
	};
};

export default useTimer;

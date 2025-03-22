/**
 * Converts a wind direction to French
 */
export function convertWindDirectionToFrench(direction: string): string {
	const directions: { [key: string]: string } = {
		N: "Nord",
		NNE: "Nord-Nord-Est",
		NE: "Nord-Est",
		ENE: "Est-Nord-Est",
		E: "Est",
		ESE: "Est-Sud-Est",
		SE: "Sud-Est",
		SSE: "Sud-Sud-Est",
		S: "Sud",
		SSW: "Sud-Sud-Ouest",
		SW: "Sud-Ouest",
		WSW: "Ouest-Sud-Ouest",
		W: "Ouest",
		WNW: "Ouest-Nord-Ouest",
		NW: "Nord-Ouest",
		NNW: "Nord-Nord-Ouest",
	};
	return directions[direction] || direction;
}

/**
 * Converts time from 12-hour format to 24-hour format
 */
export function convertTimeTo24HourFormat(time12h: string): string {
	const [time, period] = time12h.split(" ");
	let [hours, minutes] = time.split(":").map(Number);

	if (period === "PM" && hours < 12) {
		hours += 12;
	} else if (period === "AM" && hours === 12) {
		hours = 0;
	}

	return `${formatNumber(hours)}:${formatNumber(minutes)}`;
}

/**
 * Formats a number to always have two digits
 */
function formatNumber(num: number): string {
	return num.toString().padStart(2, "0");
}

/**
 * Calculate background gradient based on time of day and weather condition
 */
export function getWeatherBackground(
	isDay: boolean,
	condition?: string
): string {
	if (!isDay) {
		return "bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900";
	}

	if (condition?.toLowerCase().includes("rain")) {
		return "bg-gradient-to-b from-gray-700 via-gray-800 to-slate-900";
	}

	if (condition?.toLowerCase().includes("cloud")) {
		return "bg-gradient-to-b from-sky-400 via-sky-500 to-indigo-500";
	}

	return "bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-600";
}

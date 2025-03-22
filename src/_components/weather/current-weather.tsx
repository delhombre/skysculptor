import { ArrowDownIcon, ArrowUpIcon, MapPinIcon } from "lucide-react";

interface CurrentWeatherProps {
	cityName: string;
	date: string;
	temperature: number;
	condition: string;
	highTemp: number;
	lowTemp: number;
}

export function CurrentWeather({
	cityName,
	date,
	temperature,
	condition,
	highTemp,
	lowTemp,
}: CurrentWeatherProps) {
	return (
		<div>
			{/* Current time display */}
			<div className="text-center mb-3">
				<p className="text-5xl font-light">
					<span>{new Date().getHours().toString().padStart(2, "0")}</span>
					<span>:</span>
					<span>{new Date().getMinutes().toString().padStart(2, "0")}</span>
				</p>
			</div>

			{/* Location and date */}
			<div className="text-center mb-6">
				<div className="flex items-center justify-center gap-1 mb-1">
					<MapPinIcon className="h-5 w-5 text-white/70" />
					<h1 className="text-4xl font-semibold">{cityName}</h1>
				</div>
				<p className="text-lg text-white/80">{date}</p>
			</div>

			{/* Current temperature and condition */}
			<div className="text-center mb-10">
				<div className="text-8xl font-light mb-2">{temperature}°</div>
				<div className="text-2xl font-medium mb-1">{condition}</div>
				<div className="flex justify-center items-center gap-3 text-white/70">
					<span className="flex items-center">
						<ArrowUpIcon className="h-4 w-4 mr-1" />
						{highTemp}°
					</span>
					<span className="mx-1">•</span>
					<span className="flex items-center">
						<ArrowDownIcon className="h-4 w-4 mr-1" />
						{lowTemp}°
					</span>
				</div>
			</div>
		</div>
	);
}

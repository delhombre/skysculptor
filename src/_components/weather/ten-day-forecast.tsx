import { ScrollArea } from "@/_components/ui/scroll-area";
import React from "react";
import { ForecastDay } from "./forecast-day";

interface DayForecast {
	day: string;
	lowTemp: number;
	highTemp: number;
	icon: React.ReactNode;
	precipitation: number;
}

interface TenDayForecastProps {
	forecasts: DayForecast[];
}

export function TenDayForecast({ forecasts }: TenDayForecastProps) {
	return (
		<div className="col-span-2 row-span-2 bg-white/10 backdrop-blur-md rounded-xl overflow-hidden flex flex-col">
			<div className="p-4 flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M2 12h10"></path>
					<path d="M12 2v10"></path>
					<path d="M12 12 2 22"></path>
					<path d="M12 12 22 2"></path>
				</svg>
				<h2 className="text-sm uppercase font-medium">
					Prévisions sur 10 jours
				</h2>
			</div>
			<ScrollArea className="flex-1 scrollbar-hide">
				<div className="px-4 pb-4">
					{forecasts.map((forecast, index) => (
						<ForecastDay
							key={index}
							day={forecast.day}
							lowTemp={forecast.lowTemp}
							highTemp={forecast.highTemp}
							icon={forecast.icon}
							precipitation={forecast.precipitation}
						/>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}

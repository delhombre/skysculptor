import { ScrollArea, ScrollBar } from "@/_components/ui/scroll-area";
import { SunIcon } from "lucide-react";
import React from "react";

interface HourlyForecastProps {
	hourlyData: {
		hour: number;
		temp: number;
		icon: React.ReactNode;
		precipitation: number;
	}[];
	formatNumber: (num: number) => string;
}

export function HourlyForecast({
	hourlyData,
	formatNumber,
}: HourlyForecastProps) {
	return (
		<div className="mb-8">
			<h2 className="text-sm uppercase font-medium mb-3 flex items-center gap-2">
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
					<path d="M12 2v10"></path>
					<path d="M12 22V12"></path>
					<path d="M4.93 10.93l14.14-7.07"></path>
					<path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10Z"></path>
				</svg>
				Prévisions heure par heure
			</h2>
			<ScrollArea className="whitespace-nowrap rounded-md border border-white/10 bg-white/5 backdrop-blur-md">
				<div className="flex w-max space-x-3 p-4">
					{hourlyData.map((item, i) => (
						<div
							key={i}
							className="text-center flex flex-col items-center space-y-1 w-14"
						>
							<span className="text-sm text-white/80">
								{formatNumber(item.hour)}:00
							</span>
							{item.icon || <SunIcon className="h-6 w-6" />}
							<span className="text-xl font-medium">{item.temp}°</span>
							<span className="text-xs text-white/60">
								{item.precipitation}%
							</span>
						</div>
					))}
				</div>
				<ScrollBar
					orientation="horizontal"
					className="opacity-30 hover:opacity-100 transition-opacity"
				/>
			</ScrollArea>
		</div>
	);
}

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";

interface ForecastDayProps {
	day: string;
	lowTemp: number;
	highTemp: number;
	icon: React.ReactNode;
	precipitation: number;
}

export function ForecastDay({
	day,
	lowTemp,
	highTemp,
	icon,
	precipitation,
}: ForecastDayProps) {
	return (
		<div className="grid grid-cols-[1fr_auto_1fr] items-center py-3 border-b border-white/10">
			<div className="text-left font-medium">{day}</div>
			<div className="flex items-center gap-3 justify-center">
				{icon}
				{precipitation > 0 && (
					<span className="text-sm text-blue-300">{precipitation}%</span>
				)}
			</div>
			<div className="flex items-center justify-end gap-3">
				<span className="flex items-center opacity-70">
					<ArrowDownIcon className="h-3 w-3 mr-1" />
					{lowTemp}°
				</span>
				<span className="flex items-center">
					<ArrowUpIcon className="h-3 w-3 mr-1" />
					{highTemp}°
				</span>
			</div>
		</div>
	);
}

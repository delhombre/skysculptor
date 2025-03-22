import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import React from "react";

interface NearbyCityProps {
	name: string;
	temp: number;
	condition: string;
	icon?: React.ReactNode;
	high: number;
	low: number;
}

export function NearbyCity({
	name,
	temp,
	condition,
	high,
	low,
}: NearbyCityProps) {
	return (
		<div className="border-b border-blue-700 py-4 px-4">
			<div className="flex justify-between items-center">
				<span className="text-xl font-medium text-white">{name}</span>
				<span className="text-2xl font-medium text-white">{temp}°</span>
			</div>
			<div className="flex justify-between items-center mt-1">
				<span className="text-white/80">{condition}</span>
				<div className="flex items-center gap-3">
					<span className="flex items-center text-white/80">
						<ArrowUpIcon className="h-3 w-3 mr-1" />
						{high}°
					</span>
					<span className="flex items-center text-white/80">
						<ArrowDownIcon className="h-3 w-3 mr-1" />
						{low}°
					</span>
				</div>
			</div>
		</div>
	);
}

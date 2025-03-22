import React from "react";

interface WeatherCardProps {
	title: string;
	icon: React.ReactNode;
	value: string;
	unit?: string;
	subtitle?: string;
	className?: string;
}

export function WeatherCard({
	title,
	icon,
	value,
	unit,
	subtitle,
	className = "",
}: WeatherCardProps) {
	return (
		<div
			className={`bg-white/10 backdrop-blur-md rounded-3xl p-5 flex flex-col ${className}`}
		>
			<div className="flex items-center gap-2 text-white/80 mb-4 text-sm font-medium uppercase tracking-wide">
				{icon}
				<span>{title}</span>
			</div>
			<div className="flex-1 flex flex-col">
				<div className="text-white text-3xl font-medium">
					{value}
					{unit && <span className="ml-1">{unit}</span>}
				</div>
				{subtitle && (
					<div className="text-white/70 text-sm mt-auto">{subtitle}</div>
				)}
			</div>
		</div>
	);
}

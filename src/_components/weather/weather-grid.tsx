import { ReactNode } from "react";

interface WeatherGridProps {
	children: ReactNode;
	className?: string;
}

export function WeatherGrid({ children, className = "" }: WeatherGridProps) {
	return (
		<div className={`grid grid-cols-4 gap-3 mb-8 ${className}`}>{children}</div>
	);
}

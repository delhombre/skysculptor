interface AirQualityCardProps {
	index: number;
	description: string;
	summary?: string;
}

export function AirQualityCard({
	index,
	description,
	summary,
}: AirQualityCardProps) {
	// Calculate the position of the indicator based on the index (0-10 scale)
	const indicatorPosition = `${Math.min(Math.max(index * 10, 0), 100)}%`;

	return (
		<div className="col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-5">
			<h2 className="text-sm uppercase font-medium mb-4 flex items-center gap-2">
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
					<path d="M8 2h8"></path>
					<path d="M9 2v1.343M15 2v2.789"></path>
					<path d="M4 8h5a2 2 0 0 1 0 4H7a2 2 0 0 0 0 4h11"></path>
					<path d="M2 22h20"></path>
					<path d="M8 22v-6"></path>
					<path d="M12 22v-3"></path>
					<path d="M16 22v-4"></path>
				</svg>
				Qualité de l&apos;Air
			</h2>
			<div className="text-center mb-3">
				<div className="text-5xl font-medium mb-2">{index}</div>
				<div className="text-lg mb-1">{description}</div>
				{summary && <div className="text-sm text-white/70">{summary}</div>}
			</div>
			<div className="w-full h-2 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 rounded-full mt-4 mb-2">
				<div className="relative">
					<div
						className="absolute -top-1 rounded-full w-4 h-4 bg-white border-2 border-red-500"
						style={{ left: `calc(${indicatorPosition} - 8px)` }}
					></div>
				</div>
			</div>
		</div>
	);
}

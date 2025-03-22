import { ScrollArea } from "@/_components/ui/scroll-area";
import { NearbyCity } from "./nearby-city";

interface CityData {
	name: string;
	temp: number;
	condition: string;
	high: number;
	low: number;
}

interface NearbyCitiesSidebarProps {
	cities: CityData[];
	isOpen: boolean;
	onClose: () => void;
}

export function NearbyCitiesSidebar({
	cities,
	isOpen,
	onClose,
}: NearbyCitiesSidebarProps) {
	return (
		<>
			<div
				className={`${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} transform transition-transform fixed top-0 left-0 bottom-0 w-64 bg-blue-900 z-20 flex flex-col overflow-hidden shadow-xl`}
			>
				<div className="p-4 bg-blue-950 text-white flex justify-between items-center">
					<h2 className="text-xl font-medium">Nearby Locations</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-blue-800/50"
						aria-label="Close sidebar"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 6 6 18"></path>
							<path d="m6 6 12 12"></path>
						</svg>
					</button>
				</div>
				<ScrollArea className="flex-1 scrollbar-hide">
					<div className="py-2">
						{cities.map((city, index) => (
							<NearbyCity
								key={index}
								name={city.name}
								temp={city.temp}
								condition={city.condition}
								high={city.high}
								low={city.low}
							/>
						))}
					</div>
				</ScrollArea>
			</div>

			{/* Overlay to catch clicks outside sidebar */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
					onClick={onClose}
					aria-hidden="true"
				/>
			)}
		</>
	);
}

import { ScrollArea } from "@/_components/ui/scroll-area";
import { MenuIcon } from "lucide-react";
import { ReactNode } from "react";

interface WeatherLayoutProps {
	background: string;
	onToggleSidebar: () => void;
	searchBar: ReactNode;
	errorMessage?: string;
	isLoading: boolean;
	children: ReactNode;
	fontClass?: string;
}

export function WeatherLayout({
	background,
	onToggleSidebar,
	searchBar,
	errorMessage,
	isLoading,
	children,
	fontClass = "",
}: WeatherLayoutProps) {
	return (
		<div
			className={`min-h-screen ${background} text-white ${fontClass} w-full`}
		>
			<div className="container mx-auto pt-6 pb-16 px-4">
				{/* App header */}
				<div className="flex justify-between items-center mb-6">
					<button
						onClick={onToggleSidebar}
						className="p-2 rounded-full bg-white/10 backdrop-blur-md"
						aria-label="Menu"
					>
						<MenuIcon className="h-5 w-5" />
					</button>

					{/* Search bar */}
					{searchBar}

					{/* Empty div for layout balance */}
					<div className="w-9"></div>
				</div>

				{errorMessage && (
					<div className="mb-6 max-w-md mx-auto p-4 bg-red-500/20 border border-red-500/50 text-white rounded-xl">
						{errorMessage}
					</div>
				)}

				{isLoading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
					</div>
				) : (
					<ScrollArea className="h-[calc(100vh-8rem)] pr-4 scrollbar-hide">
						<div className="max-w-4xl mx-auto">{children}</div>
					</ScrollArea>
				)}
			</div>
		</div>
	);
}

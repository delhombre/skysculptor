import { SearchIcon } from "lucide-react";
import { FormEvent } from "react";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onSearch: (e: FormEvent) => void;
	placeholder?: string;
}

export function SearchBar({
	value,
	onChange,
	onSearch,
	placeholder = "Enter city name...",
}: SearchBarProps) {
	return (
		<div className="flex-1 max-w-md mx-auto">
			<form
				onSubmit={onSearch}
				className="flex bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/20"
			>
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className="flex-1 p-2 pl-5 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
				/>
				<button
					type="submit"
					className="p-2 text-white flex items-center justify-center"
					aria-label="Search"
				>
					<SearchIcon className="h-5 w-5" />
				</button>
			</form>
		</div>
	);
}

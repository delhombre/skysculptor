import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
	if (!str || typeof str !== "string") return "";
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Formats a number to have two digits, adding a leading zero if necessary
 */
export function formatNumber(num: number): string {
	return num.toString().padStart(2, "0");
}

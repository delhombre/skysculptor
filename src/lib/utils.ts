export const formatNumber = (num: number): string => {
	return num < 10 ? `0${num}` : num.toString();
};

export const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

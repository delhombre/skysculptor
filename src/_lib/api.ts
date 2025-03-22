import { WeatherData } from "@/_types/weather";

/**
 * Fetches current weather data from the WeatherAPI.com service
 * @param {number} latitude - The latitude coordinate
 * @param {number} longitude - The longitude coordinate
 * @param {string} language - The language code (e.g., 'en', 'fr')
 * @returns {Promise<WeatherData>} - The weather data
 */
export const fetchWeatherData = async (
	latitude: number,
	longitude: number,
	language: string = "en"
): Promise<WeatherData> => {
	const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}&lang=${language}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key":
				process.env.NEXT_PUBLIC_RAPIDAPI_KEY ||
				"799e4bb9efmsh862109dfce61689p16d729jsnd0fd2f987aef",
			"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`API response status: ${response.status} (${errorText})`);
		}
		const data = await response.json();

		// Create a compatible data structure
		return {
			location: data.location,
			current: data.current,
			forecast: {
				forecastday: [],
			},
		} as WeatherData;
	} catch (error) {
		console.error("Error fetching weather data:", error);
		throw error;
	}
};

/**
 * Gets current weather for a specific city by name
 * @param {string} cityName - The name of the city
 * @param {string} language - The language code
 * @returns {Promise<WeatherData>} - The weather data
 */
export const fetchWeatherByCity = async (
	cityName: string,
	language: string = "en"
): Promise<WeatherData> => {
	const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(
		cityName
	)}&lang=${language}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key":
				process.env.NEXT_PUBLIC_RAPIDAPI_KEY ||
				"799e4bb9efmsh862109dfce61689p16d729jsnd0fd2f987aef",
			"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`API response status: ${response.status} (${errorText})`);
		}
		const data = await response.json();

		// Create a compatible data structure
		return {
			location: data.location,
			current: data.current,
			forecast: {
				forecastday: [],
			},
		} as WeatherData;
	} catch (error) {
		console.error("Error fetching weather data:", error);
		throw error;
	}
};

import { WeatherData } from "@/_types/weather";

// Sample weather data for Paris from current.json endpoint
export const sampleWeatherData: WeatherData = {
	location: {
		name: "Paris",
		region: "Ile-de-France",
		country: "France",
		lat: 48.87,
		lon: 2.33,
		tz_id: "Europe/Paris",
		localtime_epoch: 1711099409,
		localtime: "2024-03-22 11:16",
	},
	current: {
		last_updated_epoch: 1711098900,
		last_updated: "2024-03-22 11:15",
		temp_c: 12.0,
		temp_f: 53.6,
		is_day: 1,
		condition: {
			text: "Partly cloudy",
			icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
			code: 1003,
		},
		wind_mph: 11.9,
		wind_kph: 19.1,
		wind_degree: 250,
		wind_dir: "WSW",
		pressure_mb: 1011.0,
		pressure_in: 29.85,
		precip_mm: 14.0,
		precip_in: 0.55,
		humidity: 77,
		cloud: 25,
		feelslike_c: 10.2,
		feelslike_f: 50.3,
		vis_km: 10.0,
		vis_miles: 6.0,
		uv: 4.0,
		gust_mph: 16.8,
		gust_kph: 27.0,
	},
	forecast: {
		forecastday: [],
	},
};

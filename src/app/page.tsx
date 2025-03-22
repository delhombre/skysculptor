"use client";

import { AirQualityCard } from "@/_components/weather/air-quality-card";
import { CurrentWeather } from "@/_components/weather/current-weather";
import { HourlyForecast } from "@/_components/weather/hourly-forecast";
import { NearbyCitiesSidebar } from "@/_components/weather/nearby-cities-sidebar";
import { SearchBar } from "@/_components/weather/search-bar";
import { TenDayForecast } from "@/_components/weather/ten-day-forecast";
import { WeatherCard } from "@/_components/weather/weather-card";
import { WeatherGrid } from "@/_components/weather/weather-grid";
import { WeatherLayout } from "@/_components/weather/weather-layout";
import { useGeolocation } from "@/_hooks/use-geolocation";
import useTimer from "@/_hooks/use-timer";
import { fetchWeatherByCity, fetchWeatherData } from "@/_lib/api";
import { sampleWeatherData } from "@/_lib/sample-weather-data";
import { capitalize, formatNumber } from "@/_lib/utils";
import {
	convertTimeTo24HourFormat,
	convertWindDirectionToFrench,
	getWeatherBackground,
} from "@/_lib/weather-utils";
import { WeatherData } from "@/_types/weather";
import {
	CloudIcon,
	DropletIcon,
	EyeIcon,
	MoonIcon,
	SunIcon,
	ThermometerIcon,
	UmbrellaIcon,
	Wind,
} from "lucide-react";
import localFont from "next/font/local";
import { FormEvent, useEffect, useState } from "react";

// Move font declaration to module scope
const sfPro = localFont({
	src: [{ path: "../_fonts/clash-display-variable.ttf", weight: "400" }],
	variable: "--font-sf-pro",
});

export default function Home() {
	const { hours, minutes, seconds, day, date, month, year } = useTimer();
	const {
		data: geoData,
		error: geoError,
		isLoading: geoLoading,
	} = useGeolocation();
	const [data, setData] = useState<WeatherData | null>(null);
	const [language, setLanguage] = useState<string>("en");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [cityInput, setCityInput] = useState<string>("");
	const [isDay, setIsDay] = useState<boolean>(true);
	const [showSidebar, setShowSidebar] = useState<boolean>(false);

	useEffect(() => {
		// Update language on client-side only
		setLanguage(window.navigator.language.split("-")[0]);
	}, []);

	useEffect(() => {
		// Load sample data initially
		setData(sampleWeatherData);

		// Check if it's day or night based on current hour
		const currentHour = new Date().getHours();
		setIsDay(currentHour >= 6 && currentHour < 20);
	}, []);

	// Handle geolocation data changes
	useEffect(() => {
		const fetchWeatherFromGeoLocation = async () => {
			if (geoData?.latitude && geoData?.longitude) {
				try {
					setLoading(true);
					setError(null);
					const response = await fetchWeatherData(
						geoData.latitude,
						geoData.longitude,
						language
					);
					setData(response);
					// Update isDay based on API response
					if (response.current) {
						setIsDay(response.current.is_day === 1);
					}
				} catch (err) {
					console.error("Error fetching weather data:", err);
					setError("Failed to fetch weather data. Using sample data instead.");
					// Use sample data as fallback
					setData(sampleWeatherData);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchWeatherFromGeoLocation();
	}, [geoData, language]);

	// Handle geolocation errors
	useEffect(() => {
		if (geoError) {
			setError(
				`Could not access your location: ${geoError.message}. Please enter a city name.`
			);
			setLoading(false);
		}
	}, [geoError]);

	const handleCitySearch = async (e: FormEvent) => {
		e.preventDefault();
		if (!cityInput.trim()) return;

		try {
			setLoading(true);
			setError(null);
			const response = await fetchWeatherByCity(cityInput, language);
			setData(response);
			// Update isDay based on API response
			if (response.current) {
				setIsDay(response.current.is_day === 1);
			}
		} catch (error) {
			console.error("Error fetching weather data:", error);
			setError(
				"Failed to fetch weather data for this city. Using sample data instead."
			);
			setData(sampleWeatherData);
		} finally {
			setLoading(false);
		}
	};

	// Prepare data for hourly forecast
	const hourlyForecastData = Array.from({ length: 12 }).map((_, i) => {
		const hour = (new Date().getHours() + i + 1) % 24;
		return {
			hour,
			temp: Math.round((data?.current?.temp_c || 15) + Math.sin(i / 3) * 3),
			icon: <SunIcon className="h-6 w-6" />,
			precipitation: Math.round(Math.random() * 40),
		};
	});

	// Prepare data for 10-day forecast
	const tenDayForecastData = [
		{
			day: "Auj.",
			lowTemp: 12,
			highTemp: 17,
			icon: <SunIcon className="h-5 w-5" />,
			precipitation: 45,
		},
		{
			day: "Dim.",
			lowTemp: 10,
			highTemp: 15,
			icon: <CloudIcon className="h-5 w-5" />,
			precipitation: 55,
		},
		{
			day: "Lun.",
			lowTemp: 8,
			highTemp: 14,
			icon: <CloudIcon className="h-5 w-5" />,
			precipitation: 55,
		},
		{
			day: "Mar.",
			lowTemp: 7,
			highTemp: 12,
			icon: <CloudIcon className="h-5 w-5" />,
			precipitation: 0,
		},
		{
			day: "Mer.",
			lowTemp: 7,
			highTemp: 13,
			icon: <CloudIcon className="h-5 w-5" />,
			precipitation: 0,
		},
		{
			day: "Jeu.",
			lowTemp: 4,
			highTemp: 15,
			icon: <SunIcon className="h-5 w-5" />,
			precipitation: 0,
		},
		{
			day: "Ven.",
			lowTemp: 6,
			highTemp: 14,
			icon: <CloudIcon className="h-5 w-5" />,
			precipitation: 0,
		},
		{
			day: "Sam.",
			lowTemp: 5,
			highTemp: 12,
			icon: <CloudIcon className="h-5 w-5" />,
			precipitation: 0,
		},
	];

	// Prepare data for nearby cities
	const nearbyCities = [
		{ name: "Bruxelles", temp: 15, condition: "Nuageux", high: 17, low: 12 },
		{ name: "Anvers", temp: 16, condition: "Nuageux", high: 17, low: 12 },
		{ name: "Liège", temp: 15, condition: "Nuageux", high: 17, low: 12 },
		{
			name: "Namur",
			temp: 14,
			condition: "Partiellement nuageux",
			high: 16,
			low: 11,
		},
		{ name: "Charleroi", temp: 15, condition: "Nuageux", high: 16, low: 12 },
		{
			name: "Gent",
			temp: 16,
			condition: "Partiellement nuageux",
			high: 17,
			low: 13,
		},
		{ name: "Leuven", temp: 15, condition: "Nuageux", high: 17, low: 12 },
		{ name: "Bruges", temp: 15, condition: "Nuageux", high: 16, low: 11 },
	];

	const background = getWeatherBackground(
		isDay,
		data?.current?.condition?.text
	);

	return (
		<main className="min-h-screen overflow-hidden flex">
			{/* Sidebar with nearby locations */}
			<NearbyCitiesSidebar
				cities={nearbyCities}
				isOpen={showSidebar}
				onClose={() => setShowSidebar(false)}
			/>

			{/* Main content */}
			<WeatherLayout
				background={background}
				onToggleSidebar={() => setShowSidebar(!showSidebar)}
				fontClass={sfPro.className}
				searchBar={
					<SearchBar
						value={cityInput}
						onChange={setCityInput}
						onSearch={handleCitySearch}
						placeholder="Enter city name..."
					/>
				}
				errorMessage={error || undefined}
				isLoading={loading || geoLoading}
			>
				<CurrentWeather
					cityName={data?.location?.name || "City"}
					date={`${capitalize(day)} ${date} ${month} ${year}`}
					temperature={data?.current?.temp_c || 0}
					condition={data?.current?.condition?.text || ""}
					highTemp={Math.round((data?.current?.temp_c || 0) + 2)}
					lowTemp={Math.round((data?.current?.temp_c || 0) - 3)}
				/>

				{/* Hourly forecast - horizontal scroll */}
				<HourlyForecast
					hourlyData={hourlyForecastData}
					formatNumber={formatNumber}
				/>

				{/* Bento grid layout for forecast and weather info */}
				<WeatherGrid>
					{/* 10-day forecast - spans 2 columns, spans 2 rows */}
					<TenDayForecast forecasts={tenDayForecastData} />

					{/* Feels like card */}
					<WeatherCard
						title="Ressenti"
						icon={<ThermometerIcon className="h-4 w-4" />}
						value={
							data?.current?.feelslike_c
								? `${data.current.feelslike_c}`
								: "10.2"
						}
						unit="°C"
						subtitle="Similaire à la température réelle"
					/>

					{/* Humidity card */}
					<WeatherCard
						title="Humidité"
						icon={<DropletIcon className="h-4 w-4" />}
						value={data?.current?.humidity ? `${data.current.humidity}` : "77"}
						unit="%"
						subtitle={`Point de rosée ${
							data?.current?.humidity
								? Math.round(
										data.current.temp_c - (100 - data.current.humidity) / 5
								  )
								: 10
						}°C`}
					/>

					{/* Visibility card */}
					<WeatherCard
						title="Visibilité"
						icon={<EyeIcon className="h-4 w-4" />}
						value={data?.current?.vis_km ? `${data.current.vis_km}` : "27"}
						unit="km"
						subtitle="Vue parfaitement dégagée"
					/>

					{/* Wind card */}
					<WeatherCard
						title="Vent"
						icon={<Wind className="h-4 w-4" />}
						value={
							data?.current?.wind_kph ? `${data.current.wind_kph}` : "19.1"
						}
						unit="km/h"
						subtitle={
							data?.current?.wind_dir
								? convertWindDirectionToFrench(data.current.wind_dir)
								: "Sud"
						}
					/>

					{/* Air quality card - spans 2 columns */}
					<AirQualityCard
						index={7}
						description="Très mauvaise"
						summary="L'indice de qualité de l'air est de 7, ce qui est similaire à hier à peu près à la même heure."
					/>

					{/* Precipitation card */}
					<WeatherCard
						title="Précipitations"
						icon={<UmbrellaIcon className="h-4 w-4" />}
						value={
							data?.current?.precip_mm !== undefined
								? `${data.current.precip_mm}`
								: "3"
						}
						unit="mm"
						subtitle="Aujourd'hui"
					/>

					{/* UV Index card */}
					<WeatherCard
						title="Indice UV"
						icon={<SunIcon className="h-4 w-4" />}
						value={data?.current?.uv ? `${data.current.uv}` : "2"}
						subtitle="Faible pour le reste de la journée"
					/>

					{/* Pressure card */}
					<WeatherCard
						title="Pression"
						icon={<CloudIcon className="h-4 w-4" />}
						value={
							data?.current?.pressure_mb
								? `${data.current.pressure_mb}`
								: "1004"
						}
						unit="hPa"
					/>

					{/* Sunset/Sunrise card */}
					<WeatherCard
						title="Coucher"
						icon={<MoonIcon className="h-4 w-4" />}
						value={
							data?.forecast?.forecastday?.[0]?.astro?.sunset
								? convertTimeTo24HourFormat(
										data.forecast.forecastday[0].astro.sunset
								  )
								: "18:54"
						}
						subtitle={`Lever: ${
							data?.forecast?.forecastday?.[0]?.astro?.sunrise
								? convertTimeTo24HourFormat(
										data.forecast.forecastday[0].astro.sunrise
								  )
								: "06:33"
						}`}
					/>
				</WeatherGrid>
			</WeatherLayout>
		</main>
	);
}

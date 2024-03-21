"use client";

import usePosition from "@/hooks/usePosition";
import useTimer from "@/hooks/useTimer";
import { capitalize, formatNumber } from "@/lib/utils";
import {
	DropletIcon,
	DropletsIcon,
	EyeIcon,
	GaugeIcon,
	LineChartIcon,
	SunMediumIcon,
	SunsetIcon,
	ThermometerSunIcon,
	WindIcon,
} from "lucide-react";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

type Location = {
	name: string;
	country: string;
};

type Condition = {
	text: string;
};

type Astro = {
	sunrise: string;
	sunset: string;
};

type ForecastDay = {
	astro: Astro;
};

type Current = {
	condition: Condition;
	temp_c: number;
	temp_f: number;
	feelslike_c: number;
	feelslike_f: number;
	pressure_mb: number;
	wind_kph: number;
	wind_mph: number;
	wind_dir: string;
	humidity: number;
	vis_km: number;
	vis_miles: number;
	uv: number;
};

type WeatherData = {
	location: Location;
	current: Current;
	forecast: {
		forecastday: ForecastDay[];
	};
};

const clashDisplay = localFont({ src: "../fonts/ClashDisplay-Variable.ttf" });

const getData = async (
	latitude: number | null,
	longitude: number | null,
	language: string
): Promise<WeatherData | null> => {
	const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latitude},${longitude}&days=3&lang=${language}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "799e4bb9efmsh862109dfce61689p16d729jsnd0fd2f987aef",
			"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
};

const convertTimeTo24HourFormat = (time: string): string => {
	const [hourStr, minuteStr, period] = time.split(/:| /); // Split time into hour, minute, and period (AM/PM)
	let hour = parseInt(hourStr, 10);

	// Adjust hour based on AM/PM period
	if (period.toLowerCase() === "pm" && hour !== 12) {
		hour += 12; // Add 12 hours for PM except for 12 PM
	} else if (period.toLowerCase() === "am" && hour === 12) {
		hour = 0; // Convert 12 AM to 0 hour
	}

	// Pad with leading zeros if necessary
	const hourFormatted = hour.toString().padStart(2, "0");
	const minuteFormatted = minuteStr.padStart(2, "0");

	// Construct the time in 24-hour format
	const time24HourFormat = `${hourFormatted}:${minuteFormatted}`;

	return time24HourFormat;
};

const convertWindDirectionToFrench = (direction: string): string => {
	const directions: { [key: string]: string } = {
		N: "Nord",
		NNE: "Nord Nord-Est",
		NE: "Nord-Est",
		ENE: "Est Nord-Est",
		E: "Est",
		ESE: "Est Sud-Est",
		SE: "Sud-Est",
		SSE: "Sud Sud-Est",
		S: "Sud",
		SSW: "Sud Sud-Ouest",
		SW: "Sud-Ouest",
		WSW: "Ouest Sud-Ouest",
		W: "Ouest",
		WNW: "Ouest Nord-Ouest",
		NW: "Nord-Ouest",
		NNW: "Nord Nord-Ouest",
	};

	return directions[direction.toUpperCase()] || direction;
};

export default function Home() {
	const { hours, minutes, seconds, day, date, month, year } = useTimer();
	const { latitude, longitude } = usePosition();
	const [data, setData] = useState<WeatherData | null>(null);
	const [language, setLanguage] = useState<string>(
		navigator.language.split("-")[0]
	);

	useEffect(() => {
		const fetchData = async () => {
			if (latitude && longitude) {
				try {
					const response = await getData(latitude, longitude, language);
					setData(response);
				} catch (error) {
					console.error(error);
				}
			}
		};

		fetchData();
	}, [latitude, longitude, language]);

	return (
		<main className="container mx-auto my-10">
			<section className="grid grid-cols-2 grid-rows-12 gap-2">
				{/* First grid */}
				<div className="row-span-8 w-full bg-[#151419] text-white p-5 rounded-[2.5rem] text-lg grid grid-cols-2 grid-rows-2 gap-2">
					<div className="bg-zinc-800 rounded-3xl p-5 ring-2 ring-zinc-600 ring-offset-0 flex flex-col justify-between">
						<div>{`${capitalize(day)} ${date} ${month} ${year}`}</div>
						<div className={`text-[3rem] font-black ${clashDisplay.className}`}>
							<span>{formatNumber(hours)}</span>
							<span>:</span>
							<span>{formatNumber(minutes)}</span>
							<span>:</span>
							<span>{formatNumber(seconds)}</span>
						</div>
					</div>

					<div className="bg-[#003333] rounded-3xl p-5 ring-2 ring-[#0D4D4D] ring-offset-0 flex flex-col">
						<div className="flex items-center gap-2 text-sm">
							<SunsetIcon className="h-4 w-4" />
							<span className="uppercase">COUCHER</span>
						</div>
						{data && (
							<div className="mt-5 flex-1 flex flex-col">
								<div className="text-3xl">
									{convertTimeTo24HourFormat(
										data.forecast.forecastday[0].astro.sunset
									)}
								</div>
								<div className="text-sm mt-auto">
									Lever :{" "}
									{convertTimeTo24HourFormat(
										data.forecast.forecastday[0].astro.sunrise
									)}
								</div>
							</div>
						)}
					</div>

					<div className="bg-[#553A00] rounded-3xl p-5 ring-2 ring-[#805D15] ring-offset-0 flex flex-col">
						<div className="flex items-center gap-2 text-sm">
							<EyeIcon className="h-4 w-4" />
							<span className="uppercase">Visibilité</span>
						</div>
						{data && (
							<div className="mt-5 flex-1 flex flex-col">
								<div className="text-3xl">{data.current.vis_km} km</div>
								<div className="text-sm mt-auto">
									Visibilité parfaitement dégagée
								</div>
							</div>
						)}
					</div>

					<div className="bg-[#440026] rounded-3xl p-5 ring-2 ring-[#661141] ring-offset-0 flex justify-center items-center">
						{data && (
							<div className="flex flex-col justify-center items-center space-y-2">
								<p className={`${clashDisplay.className} text-3xl font-black`}>
									{data.current.temp_c}°C
								</p>
								<p>{data.current.condition.text}</p>
							</div>
						)}
					</div>
				</div>

				{/* Second grid */}
				<div className="row-span-8 grid grid-cols-2 gap-2">
					<div className="col-span-2 row-span-8 bg-[#F56E0F] text-white p-5 rounded-[2.5rem] grid grid-cols-2 grid-rows-2 gap-2">
						{data && (
							<>
								<div className="row-span-2 p-5 rounded-[2.5rem] flex flex-col">
									<div className="flex items-center gap-2 text-sm">
										<GaugeIcon className="h-4 w-4" />
										<span className="uppercase">Pression</span>
									</div>
									{data && (
										<>
											<div className="mt-5 flex-1 flex flex-col">
												<div className="text-3xl">
													{data.current.pressure_mb} mb
												</div>
												<div className="text-sm mt-auto">
													I will add a gradient color based on the UV index
												</div>
											</div>
										</>
									)}
								</div>
								<div className="p-5 rounded-[2.5rem] flex flex-col">
									<div className="flex items-center gap-2 text-sm">
										<DropletIcon className="h-4 w-4" />
										<span className="uppercase">Précipitations</span>
									</div>
									{data && (
										<>
											<div className="mt-5 flex-1 flex flex-col">
												<div>
													<p className="text-3xl">14 mm</p>
													<p className="font-bold">dans les dernières 24H</p>
												</div>
												<div className="text-sm mt-auto">
													Prochain épisode de pluie : 10 mm Ven.
												</div>
											</div>
										</>
									)}
								</div>
								<div className="p-5 rounded-[2.5rem] flex flex-col">
									<div className="flex items-center gap-2 text-sm">
										<LineChartIcon className="h-4 w-4" />
										<span className="uppercase">Moyennnes</span>
									</div>
									{data && (
										<>
											<div className="mt-5 flex-1 flex flex-col">
												<div>
													<p className="text-3xl">+5 °</p>
													<p className="font-bold">
														au dessus des temp. max. quotidiennes moyennes
													</p>
												</div>
												<div className="text-sm mt-auto">
													<p className="grid grid-cols-2">
														<span className="text-neutral-200">
															Aujourdh'ui
														</span>
														<span className="font-bold">Max. : 13°</span>
													</p>
													<p className="grid grid-cols-2">
														<span className="text-neutral-200">Moyenne</span>
														<span className="font-bold">Max. : 8</span>
													</p>
												</div>
											</div>
										</>
									)}
								</div>
								{/* <p>Temperature</p>
								<p>{data.current.temp_c}°C</p>
								<p>{data.current.temp_f}°F</p>
								<p>Felt</p>
								<p>{data.current.feelslike_c}°C</p>
								<p>{data.current.feelslike_f}°F</p>
								<p>Pression</p>
								<p></p> */}
							</>
						)}
					</div>

					<div className="bg-[#1B1B1E] text-white p-5 rounded-[2.5rem]">
						<div className="flex items-center gap-2 text-sm">
							<WindIcon className="h-4 w-4" />
							<span className="uppercase">Vent</span>
						</div>
						{data && (
							<div className="space-y-2 mt-5">
								<div>
									{data.current.wind_kph} km/h - {data.current.wind_mph} mph
								</div>
								<div>{convertWindDirectionToFrench(data.current.wind_dir)}</div>
							</div>
						)}
					</div>

					<div className="bg-[#262626] text-white p-5 rounded-[2.5rem] flex flex-col">
						<div className="flex items-center gap-2 text-sm">
							<DropletsIcon className="h-4 w-4" />
							<span className="uppercase">Humidité</span>
						</div>
						{data && (
							<>
								<div className="mt-5 flex-1 flex flex-col">
									<div className="text-3xl">{data.current.humidity} %</div>
									<div className="text-sm mt-auto">
										Le point de rosée est de 10°C
									</div>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Third grid */}
				<div className="row-span-4 bg-[#878787] text-white p-5 rounded-[2.5rem] flex flex-col">
					<div className="flex items-center gap-2 text-sm">
						<ThermometerSunIcon className="h-4 w-4" />
						<span className="uppercase">Ressenti</span>
					</div>
					{data && (
						<div className="mt-5 flex-1 flex flex-col">
							<div className="text-3xl">{data.current.feelslike_c} %</div>
							<div className="text-sm mt-auto">
								Ressenti plus frais à cause du vent
							</div>
						</div>
					)}
				</div>

				{/* Fourth grid */}
				<div className="row-span-4 bg-[#FBFBFB] text-black-50 p-5 rounded-[2.5rem] flex flex-col">
					<div className="flex items-center gap-2 text-sm">
						<SunMediumIcon className="h-4 w-4" />
						<span className="uppercase">Indice UV</span>
					</div>
					{data && (
						<>
							<div className="mt-5 flex-1 flex flex-col">
								<div className="text-3xl">{data.current.uv} %</div>
								<div className="mt-8 relative w-full h-2 bg-gray-300 rounded-full overflow-hidden">
									<div className="absolute inset-0 h-full bg-gradient-to-r from-green-400 via-yellow-400 to-purple-400 w-full"></div>
								</div>
							</div>
						</>
					)}
				</div>
			</section>
		</main>
	);
}

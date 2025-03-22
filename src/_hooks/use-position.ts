import { useCallback, useState } from "react";

interface Position {
	latitude: number | null;
	longitude: number | null;
	error: string | null;
	getPosition: () => Promise<void>;
}

const usePosition = (): Position => {
	const [position, setPosition] = useState<Omit<Position, "getPosition">>({
		latitude: null,
		longitude: null,
		error: null,
	});

	const getPosition = useCallback(async (): Promise<void> => {
		return new Promise((resolve) => {
			if (!navigator.geolocation) {
				setPosition({
					latitude: null,
					longitude: null,
					error: "Geolocation is not supported by your browser",
				});
				resolve();
				return;
			}

			const handleSuccess = (pos: GeolocationPosition) => {
				setPosition({
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude,
					error: null,
				});
				resolve();
			};

			const handleError = (err: GeolocationPositionError) => {
				setPosition({
					latitude: null,
					longitude: null,
					error: err.message,
				});
				resolve();
			};

			const options: PositionOptions = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			};

			navigator.geolocation.getCurrentPosition(
				handleSuccess,
				handleError,
				options
			);
		});
	}, []);

	return { ...position, getPosition };
};

export default usePosition;

import { useEffect, useState } from "react";

interface Position {
	latitude: number | null;
	longitude: number | null;
	error: string | null;
}

const usePosition = (): Position => {
	const [position, setPosition] = useState<Position>({
		latitude: null,
		longitude: null,
		error: null,
	});

	useEffect(() => {
		const handleSuccess = (pos: GeolocationPosition) => {
			setPosition({
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude,
				error: null,
			});
		};

		const handleError = (err: GeolocationPositionError) => {
			setPosition({
				latitude: null,
				longitude: null,
				error: err.message,
			});
		};

		const options: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};

		const watchId = navigator.geolocation.watchPosition(
			handleSuccess,
			handleError,
			options
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, []);

	return position;
};

export default usePosition;

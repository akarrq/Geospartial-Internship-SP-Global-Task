import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';

import { haversineDistance } from '../../helpers/calculations';
import { Alert, Input, Results } from './calcComponents';

import {
	setIslandCoordinatesLon,
	setIslandCoordinatesLat,
	setPortCoordinatesLon,
	setPortCoordinatesLat,
	setSpeed,
	setFuelUsage,
} from '../../store/slices/appSlice';

export default function Calc() {
	const portCoordinates = useSelector(
		(state: RootState) => state.app.portCoordinates
	);
	const islandCoordinates = useSelector(
		(state: RootState) => state.app.islandCoordinates
	);
	const fuelUsage = useSelector((state: RootState) => state.app.fuelUsage);
	const speed = useSelector((state: RootState) => state.app.speed);
	const dispatch = useDispatch();

	const [distance, setDistance] = useState(0);
	const [travelTime, setTravelTime] = useState(0);
	const [requiredFuel, setRequiredFuel] = useState(0);

	const [isDataCorrect, setIsDataCorrect] = useState(true);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if ([...portCoordinates, ...islandCoordinates].every((v) => !isNaN(v))) {
			if (
				!(-180 <= portCoordinates[0] && portCoordinates[0] <= 180) ||
				!(-90 <= portCoordinates[1] && portCoordinates[1] <= 90) ||
				!(-180 <= islandCoordinates[0] && islandCoordinates[0] <= 180) ||
				!(-90 <= islandCoordinates[1] && islandCoordinates[1] <= 90)
			) {
				setIsDataCorrect(false);
				return;
			}
			setIsDataCorrect(true);

			const calculatedDistance = haversineDistance(
				portCoordinates[1],
				portCoordinates[0],
				islandCoordinates[1],
				islandCoordinates[0]
			);
			const calculatedTravelTime = calculatedDistance / speed;
			const calculatedRequiredFuel = calculatedDistance * fuelUsage;

			setDistance(calculatedDistance);
			setTravelTime(calculatedTravelTime);
			setRequiredFuel(calculatedRequiredFuel);
		} else {
			setIsDataCorrect(false);
		}
	};

	return (
		<div className="vh-90 container d-flex flex-column justify-content-center align-items-center">
			<h1>Travel Calculator</h1>
			<form className="w-90" onSubmit={handleSubmit}>
				<Input
					labelName="Fuel consumption (l/km):"
					name="fuelConsumption"
					value={fuelUsage}
					handleOnChange={(e) => dispatch(setFuelUsage(e.currentTarget.value))}
				/>
				<Input
					labelName="Speed (km/h):"
					name="speed"
					value={speed}
					handleOnChange={(e) => dispatch(setSpeed(e.currentTarget.value))}
				/>
				<Input
					labelName={'The latitude of the port:'}
					name={'portLatitude'}
					value={portCoordinates[1]}
					handleOnChange={(e) =>
						dispatch(setPortCoordinatesLat(e.currentTarget.value))
					}
				/>
				<Input
					labelName={'The longitude of the port:'}
					name={'portLongitude'}
					value={portCoordinates[0]}
					handleOnChange={(e) =>
						dispatch(setPortCoordinatesLon(e.currentTarget.value))
					}
				/>
				<Input
					labelName={'The latitude of the island:'}
					name={'islandLatitude'}
					value={islandCoordinates[1]}
					handleOnChange={(e) =>
						dispatch(setIslandCoordinatesLat(e.currentTarget.value))
					}
				/>
				<Input
					labelName={'The longitude of the island:'}
					name={'islandLongitude'}
					value={islandCoordinates[0]}
					handleOnChange={(e) =>
						dispatch(setIslandCoordinatesLon(e.currentTarget.value))
					}
				/>
				<button className="btn btn-primary m-2" type="submit">
					Calculate
				</button>
			</form>
			<Alert isDataCorrect={isDataCorrect} />
			<Results
				distance={distance}
				travelTime={travelTime}
				requiredFuel={requiredFuel}
				isDataCorrect={isDataCorrect}
			/>
		</div>
	);
}

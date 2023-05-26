import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';

import { haversineDistance } from '../../helpers/calculations';
import { Alert, Input } from './calcComponents';

import {
	setIslandCoordinatesLon,
	setIslandCoordinatesLat,
	setPortCoordinatesLon,
	setPortCoordinatesLat,
	setSpeed,
	setFuelUsage,
} from '../../slices/appSlice';

import './Calc.css';

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

		if (
			!isNaN(portCoordinates[0]) &&
			!isNaN(portCoordinates[1]) &&
			!isNaN(islandCoordinates[0]) &&
			!isNaN(islandCoordinates[1])
		) {
			if (
				portCoordinates[0] > 180 ||
				portCoordinates[0] < -180 ||
				portCoordinates[1] > 90 ||
				portCoordinates[1] < -90 ||
				islandCoordinates[0] > 180 ||
				islandCoordinates[0] < -180 ||
				islandCoordinates[1] > 90 ||
				islandCoordinates[1] < -90
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
		<div className="form-container">
			<h1>Travel Calculator</h1>
			<form onSubmit={handleSubmit}>
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
				<button type="submit">Calculate</button>
				<Alert isDataCorrect={isDataCorrect} />
			</form>
			<div>
				<h2>Results:</h2>
				<p>Distance: {distance.toFixed(2)} km</p>
				<p>Travel time: {travelTime.toFixed(2)} hours</p>
				<p>Required amount of fuel: {requiredFuel.toFixed(2)} liters</p>
			</div>
		</div>
	);
}

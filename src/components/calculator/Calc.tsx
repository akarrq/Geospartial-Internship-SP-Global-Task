import React, { useState } from 'react';

import { haversineDistance } from '../../helpers/calculations';
import { MapProps } from '../../interface/interface';
import { Alert, Input } from './calcComponents';

import './Calc.css';

export default function Calc({
	portCoordinates: portCoordinates,
	setPortCoordinates: setPortCoordinates,
	islandCoordinates: islandCoordinates,
	setIslandCoordinates: setIslandCoordinates,
}: MapProps) {
	const [fuel, setFuel] = useState(1);
	const [speed, setSpeed] = useState(10);
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
			const calculatedRequiredFuel = calculatedDistance * fuel;

			setDistance(calculatedDistance);
			setTravelTime(calculatedTravelTime);
			setRequiredFuel(calculatedRequiredFuel);
		} else {
			setIsDataCorrect(false);
		}
	};

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		switch (e.currentTarget.id) {
			case 'portLatitude':
				setPortCoordinates([
					portCoordinates[0],
					isNaN(parseFloat(e.currentTarget.value))
						? 0
						: parseFloat(e.currentTarget.value),
				]);
				break;
			case 'portLongitude':
				setPortCoordinates([
					isNaN(parseFloat(e.currentTarget.value))
						? 0
						: parseFloat(e.currentTarget.value),
					portCoordinates[1],
				]);
				break;
			case 'islandLatitude':
				setIslandCoordinates([
					islandCoordinates[0],
					isNaN(parseFloat(e.currentTarget.value))
						? 0
						: parseFloat(e.currentTarget.value),
				]);
				break;
			case 'islandLongitude':
				setIslandCoordinates([
					isNaN(parseFloat(e.currentTarget.value))
						? 0
						: parseFloat(e.currentTarget.value),
					islandCoordinates[1],
				]);
				break;
			case 'speed':
				setSpeed(
					isNaN(parseFloat(e.currentTarget.value))
						? 0
						: parseFloat(e.currentTarget.value)
				);
				break;
			case 'fuelConsumption':
				setFuel(
					isNaN(parseFloat(e.currentTarget.value))
						? 0
						: parseFloat(e.currentTarget.value)
				);
				break;
			default:
				break;
		}
	};

	return (
		<div className="form-container">
			<h1>Travel Calculator</h1>
			<form onSubmit={handleSubmit}>
				<Input
					labelName="Fuel consumption (l/km):"
					name="fuelConsumption"
					value={fuel}
					handleOnChange={handleOnChange}
				/>
				<Input
					labelName="Speed (km/h):"
					name="speed"
					value={speed}
					handleOnChange={handleOnChange}
				/>
				<Input
					labelName={'The latitude of the port:'}
					name={'portLatitude'}
					value={portCoordinates[1]}
					handleOnChange={handleOnChange}
				/>
				<Input
					labelName={'The longitude of the port:'}
					name={'portLongitude'}
					value={portCoordinates[0]}
					handleOnChange={handleOnChange}
				/>
				<Input
					labelName={'The latitude of the island:'}
					name={'islandLatitude'}
					value={islandCoordinates[1]}
					handleOnChange={handleOnChange}
				/>
				<Input
					labelName={'The longitude of the island:'}
					name={'islandLongitude'}
					value={islandCoordinates[0]}
					handleOnChange={handleOnChange}
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

import React, { useState } from 'react';

import { haversineDistance } from '../assets/calculations';
import { MapProps } from '../assets/interface';

import './Calc.css';

export default function Calc({
	portCoordinates: portCoordinates,
	setPortCoordinates: setPortCoordinates,
	islandCoordinates: islandCoordinates,
	setIslandCoordinates: setIslandCoordinates,
}: MapProps) {
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
				portCoordinates[0],
				portCoordinates[1],
				islandCoordinates[0],
				islandCoordinates[1]
			);
			const calculatedTravelTime = calculatedDistance / 10; // Przyjmujemy prędkość 10 km/h
			const calculatedRequiredFuel = calculatedDistance; // Przyjmujemy zużycie paliwa 1 litr na kilometr

			setDistance(calculatedDistance);
			setTravelTime(calculatedTravelTime);
			setRequiredFuel(calculatedRequiredFuel);
		} else {
			setIsDataCorrect(false);
		}
	};

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		switch (e.target.id) {
			case 'portLatitude':
				setPortCoordinates([
					isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value),
					portCoordinates[1],
				]);
				break;
			case 'portLongitude':
				setPortCoordinates([
					portCoordinates[0],
					isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value),
				]);
				break;
			case 'islandLatitude':
				setIslandCoordinates([
					isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value),
					islandCoordinates[1],
				]);
				break;
			case 'islandLongitude':
				setIslandCoordinates([
					islandCoordinates[0],
					isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value),
				]);
				break;
			default:
				break;
		}
	};

	const Alert = () => {
		return isDataCorrect ? null : (
			<p className="alert">
				The entered data is incorrect. <br></br>Make sure that latitude is
				specified in degrees within the range [-90, 90]. Longitude is specified
				in degrees within the range [-180, 180).
			</p>
		);
	};

	return (
		<div className="form-container">
			<h1>Travel Calculator</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-element">
					<label className="form-label" htmlFor="portLatitude">
						The latitude of the port:
					</label>
					<input
						type="text"
						id="portLatitude"
						value={portCoordinates[0]}
						onChange={(e) => handleOnSubmit(e)}
					/>
				</div>
				<div className="form-element">
					<label className="form-label" htmlFor="portLongitude">
						The longitude of the port:
					</label>
					<input
						type="text"
						id="portLongitude"
						value={portCoordinates[1]}
						onChange={(e) => handleOnSubmit(e)}
					/>
				</div>
				<div className="form-element">
					<label className="form-label" htmlFor="islandLatitude">
						The latitude of the island:
					</label>
					<input
						type="text"
						id="islandLatitude"
						value={islandCoordinates[0]}
						onChange={(e) => handleOnSubmit(e)}
					/>
				</div>
				<div className="form-element">
					<label className="form-label" htmlFor="islandLongitude">
						The longitude of the island:
					</label>
					<input
						type="text"
						id="islandLongitude"
						value={islandCoordinates[1]}
						onChange={(e) => handleOnSubmit(e)}
					/>
				</div>
				<button type="submit">Calculate</button>
				<Alert />
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

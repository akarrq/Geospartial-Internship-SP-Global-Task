import { useState } from 'react';

import './App.css';

import Map from './components/MapComp';
import Calc from './components/Calc';
import { defaultCoords } from './assets/coords';

function App() {
	const [portCoordinates, setPortCoordinates] = useState(defaultCoords.port);
	const [islandCoordinates, setIslandCoordinates] = useState(
		defaultCoords.island
	);
	return (
		<>
			<Calc
				portCoordinates={portCoordinates}
				setPortCoordinates={setPortCoordinates}
				islandCoordinates={islandCoordinates}
				setIslandCoordinates={setIslandCoordinates}
			/>
			<Map
				portCoordinates={portCoordinates}
				setPortCoordinates={setPortCoordinates}
				islandCoordinates={islandCoordinates}
				setIslandCoordinates={setIslandCoordinates}
			/>
		</>
	);
}

export default App;

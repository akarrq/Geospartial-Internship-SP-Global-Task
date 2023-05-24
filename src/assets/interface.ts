import { Coordinate } from 'ol/coordinate';

export interface MapProps {
	portCoordinates: Coordinate;
	setPortCoordinates: (coords: Coordinate) => void;
	islandCoordinates: Coordinate;
	setIslandCoordinates: (coords: Coordinate) => void;
}

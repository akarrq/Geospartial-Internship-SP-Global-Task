import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { defaultCoords } from '../../helpers/coords';

const initialState = {
	portCoordinates: defaultCoords.port,
	islandCoordinates: defaultCoords.island,
	fuelUsage: 1,
	speed: 10,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setCoordinates: (state, action) => {
			if (action.payload.id === 'port') {
				state.portCoordinates = action.payload.coords;
			} else if (action.payload.id === 'island') {
				state.islandCoordinates = action.payload.coords;
			}
		},
		setPortCoordinatesLat: (state, action: PayloadAction<string>) => {
			state.portCoordinates = [
				state.portCoordinates[0],
				parseFloat(action.payload) || 0,
			];
		},
		setPortCoordinatesLon: (state, action: PayloadAction<string>) => {
			state.portCoordinates = [
				parseFloat(action.payload) || 0,
				state.portCoordinates[1],
			];
		},

		setIslandCoordinatesLat: (state, action: PayloadAction<string>) => {
			state.islandCoordinates = [
				state.islandCoordinates[0],
				parseFloat(action.payload) || 0,
			];
		},
		setIslandCoordinatesLon: (state, action: PayloadAction<string>) => {
			state.islandCoordinates = [
				parseFloat(action.payload) || 0,
				state.islandCoordinates[1],
			];
		},
		setFuelUsage: (state, action: PayloadAction<string>) => {
			state.fuelUsage = parseFloat(action.payload) || 0;
		},
		setSpeed: (state, action: PayloadAction<string>) => {
			state.speed = parseFloat(action.payload) || 0;
		},
	},
});

export const {
	setCoordinates,
	setPortCoordinatesLat,
	setPortCoordinatesLon,
	setIslandCoordinatesLat,
	setIslandCoordinatesLon,
	setFuelUsage,
	setSpeed,
} = appSlice.actions;

export default appSlice.reducer;

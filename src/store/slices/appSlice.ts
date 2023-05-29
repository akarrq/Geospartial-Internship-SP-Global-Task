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
		setPortCoordinatesLat: (state, action: PayloadAction<string>) => {
			state.portCoordinates = [
				state.portCoordinates[0],
				isNaN(parseFloat(action.payload)) ? 0 : parseFloat(action.payload),
			];
		},
		setPortCoordinatesLon: (state, action: PayloadAction<string>) => {
			state.portCoordinates = [
				isNaN(parseFloat(action.payload)) ? 0 : parseFloat(action.payload),
				state.portCoordinates[1],
			];
		},
		setPortCoordinates: (state, action: PayloadAction<number[]>) => {
			state.portCoordinates = action.payload;
		},
		setIslandCoordinatesLat: (state, action: PayloadAction<string>) => {
			state.islandCoordinates = [
				state.islandCoordinates[0],
				isNaN(parseFloat(action.payload)) ? 0 : parseFloat(action.payload),
			];
		},
		setIslandCoordinatesLon: (state, action: PayloadAction<string>) => {
			state.islandCoordinates = [
				isNaN(parseFloat(action.payload)) ? 0 : parseFloat(action.payload),
				state.portCoordinates[1],
			];
		},
		setIslandCoordinates: (state, action: PayloadAction<number[]>) => {
			state.islandCoordinates = action.payload;
		},
		setFuelUsage: (state, action: PayloadAction<string>) => {
			state.fuelUsage = isNaN(parseFloat(action.payload))
				? 0
				: parseFloat(action.payload);
		},
		setSpeed: (state, action: PayloadAction<string>) => {
			state.speed = isNaN(parseFloat(action.payload))
				? 0
				: parseFloat(action.payload);
		},
	},
});

export const {
	setPortCoordinates,
	setPortCoordinatesLat,
	setPortCoordinatesLon,
	setIslandCoordinates,
	setIslandCoordinatesLat,
	setIslandCoordinatesLon,
	setFuelUsage,
	setSpeed,
} = appSlice.actions;

export default appSlice.reducer;

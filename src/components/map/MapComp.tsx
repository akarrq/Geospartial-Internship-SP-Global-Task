import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {
	setIslandCoordinates,
	setPortCoordinates,
} from '../../store/slices/appSlice';

import { fromLonLat, toLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import 'ol/ol.css';
import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle } from 'rlayers';
import type { RFeatureUIEvent } from 'rlayers';

import locationIcon from '../../assets/location.svg';
import './MapComp.css';

import { mapCoords } from '../../helpers/coords';

export default function Map(): JSX.Element {
	const portCoordinates = useSelector(
		(state: RootState) => state.app.portCoordinates
	);
	const islandCoordinates = useSelector(
		(state: RootState) => state.app.islandCoordinates
	);
	const dispatch = useDispatch();

	const onPointerDrag = useCallback((e: RFeatureUIEvent) => {
		const coords = e.map.getCoordinateFromPixel(e.pixel);
		e.target.setGeometry(new Point(coords));
		e.preventDefault();
		return false;
	}, []);

	const onPointerIslandDragEnd = useCallback(
		(e: RFeatureUIEvent) => {
			const coords = e.map.getCoordinateFromPixel(e.pixel);
			dispatch(setIslandCoordinates(toLonLat(coords)));
		},
		[dispatch]
	);

	const onPointerPortDragEnd = useCallback(
		(e: RFeatureUIEvent) => {
			const coords = e.map.getCoordinateFromPixel(e.pixel);
			dispatch(setPortCoordinates(toLonLat(coords)));
		},
		[dispatch]
	);

	const onPointerEnter = useCallback(
		(e: RFeatureUIEvent) =>
			(e.map.getTargetElement().style.cursor = 'move') && undefined,
		[]
	);

	const onPointerLeave = useCallback(
		(e: RFeatureUIEvent) =>
			(e.map.getTargetElement().style.cursor = 'initial') && undefined,
		[]
	);

	return (
		<div className="vh-100 container pe-0">
			<RMap
				className="h-100 w-100"
				initial={{ center: fromLonLat(mapCoords.center), zoom: 0 }}
			>
				<ROSM />
				<RLayerVector>
					<RFeature
						geometry={new Point(fromLonLat(portCoordinates))}
						onPointerDrag={onPointerDrag}
						onPointerDragEnd={onPointerPortDragEnd}
						onPointerEnter={onPointerEnter}
						onPointerLeave={onPointerLeave}
					>
						<RStyle.RStyle>
							<RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
						</RStyle.RStyle>
						<ROverlay className="map-info">Set port location</ROverlay>
					</RFeature>
					<RFeature
						geometry={new Point(fromLonLat(islandCoordinates))}
						onPointerDrag={onPointerDrag}
						onPointerDragEnd={onPointerIslandDragEnd}
						onPointerEnter={onPointerEnter}
						onPointerLeave={onPointerLeave}
					>
						<RStyle.RStyle>
							<RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
						</RStyle.RStyle>
						<ROverlay className="map-info">Set island location</ROverlay>
					</RFeature>
				</RLayerVector>
			</RMap>
		</div>
	);
}

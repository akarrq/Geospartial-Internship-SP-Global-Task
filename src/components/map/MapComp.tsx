import { useCallback } from 'react';

import { fromLonLat, toLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import 'ol/ol.css';
import {
	RMap,
	ROSM,
	RLayerVector,
	RFeature,
	ROverlay,
	RStyle,
	RFeatureUIEvent,
} from 'rlayers';

import locationIcon from '../../assets/location.svg';
import './MapComp.css';

import { MapProps } from '../../interface/interface';
import { mapCoords } from '../../helpers/coords';

export default function Map({
	portCoordinates: portCoordinates,
	setPortCoordinates: setPortCoordinates,
	islandCoordinates: islandCoordinates,
	setIslandCoordinates: setIslandCoordinates,
}: MapProps): JSX.Element {
	return (
		<>
			<div className="map-container">
				<RMap
					className="map"
					initial={{ center: fromLonLat(mapCoords.center), zoom: 0 }}
				>
					<ROSM />
					<RLayerVector>
						<RFeature
							geometry={new Point(fromLonLat(portCoordinates))}
							onPointerDrag={useCallback((e: RFeatureUIEvent) => {
								const coords = e.map.getCoordinateFromPixel(e.pixel);
								e.target.setGeometry(new Point(coords));
								e.preventDefault();
								return false;
							}, [])}
							onPointerDragEnd={useCallback(
								(e: RFeatureUIEvent) => {
									const coords = e.map.getCoordinateFromPixel(e.pixel);
									setPortCoordinates(toLonLat(coords));
								},
								[setPortCoordinates]
							)}
							onPointerEnter={useCallback(
								(e: RFeatureUIEvent) =>
									(e.map.getTargetElement().style.cursor = 'move') && undefined,
								[]
							)}
							onPointerLeave={useCallback(
								(e: RFeatureUIEvent) =>
									(e.map.getTargetElement().style.cursor = 'initial') &&
									undefined,
								[]
							)}
						>
							<RStyle.RStyle>
								<RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
							</RStyle.RStyle>
							<ROverlay className="map-info">Set port location</ROverlay>
						</RFeature>
						<RFeature
							geometry={new Point(fromLonLat(islandCoordinates))}
							onPointerDrag={useCallback((e: RFeatureUIEvent) => {
								const coords = e.map.getCoordinateFromPixel(e.pixel);
								e.target.setGeometry(new Point(coords));
								e.preventDefault();
								return false;
							}, [])}
							onPointerDragEnd={useCallback(
								(e: RFeatureUIEvent) => {
									const coords = e.map.getCoordinateFromPixel(e.pixel);
									setIslandCoordinates(toLonLat(coords));
								},
								[setIslandCoordinates]
							)}
							onPointerEnter={useCallback(
								(e: RFeatureUIEvent) =>
									(e.map.getTargetElement().style.cursor = 'move') && undefined,
								[]
							)}
							onPointerLeave={useCallback(
								(e: RFeatureUIEvent) =>
									(e.map.getTargetElement().style.cursor = 'initial') &&
									undefined,
								[]
							)}
						>
							<RStyle.RStyle>
								<RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
							</RStyle.RStyle>
							<ROverlay className="map-info">Set island location</ROverlay>
						</RFeature>
					</RLayerVector>
				</RMap>
			</div>
		</>
	);
}

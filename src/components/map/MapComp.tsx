import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoordinates } from '../../store/slices/appSlice';
import type { RootState } from '../../store/store';

import { fromLonLat, toLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import type { TranslateEvent } from 'ol/interaction/Translate';
import type { Coordinate } from 'ol/coordinate';
import 'ol/ol.css';
import {
	RMap,
	ROSM,
	RLayerVector,
	RFeature,
	RInteraction,
	RStyle,
} from 'rlayers';

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

	const [features, setFeatures] = useState<Feature[]>([]);

	useEffect(() => {
		const stateCoords: Record<string, Coordinate> = {
			port: portCoordinates,
			island: islandCoordinates,
		};

		const updatedFeatures = Object.keys(stateCoords).map(
			(f) =>
				new Feature({
					geometry: new Point(fromLonLat(stateCoords[f])),
					name: f,
				})
		);
		setFeatures(updatedFeatures);
	}, [portCoordinates, islandCoordinates]);

	const vectorRef = useRef() as React.RefObject<RLayerVector>;

	return (
		<div className="vh-100 container pe-0">
			<RMap
				className="h-100 w-100"
				initial={{ center: fromLonLat(mapCoords.center), zoom: 0 }}
			>
				<ROSM />
				<RLayerVector ref={vectorRef}>
					<RStyle.RStyle>
						<RStyle.RIcon src={locationIcon} />
					</RStyle.RStyle>
					{features.map((f, i) => (
						<RFeature key={i} feature={f} />
					))}
				</RLayerVector>

				<RInteraction.RTranslate
					onTranslateEnd={useCallback(
						(e: TranslateEvent) => {
							const f = e.features.item(0);
							const pinId = f.get('name');
							const PinCoords = toLonLat(
								(f.getGeometry() as Point).getFirstCoordinate()
							);
							const coords = { id: pinId, coords: PinCoords };
							dispatch(setCoordinates(coords));
						},
						[dispatch]
					)}
				/>
			</RMap>
		</div>
	);
}

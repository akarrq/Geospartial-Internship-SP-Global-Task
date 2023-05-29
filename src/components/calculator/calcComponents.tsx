import { InputProps, ResultsProps } from '../../interface/interface';

export const Alert = ({ isDataCorrect }: { isDataCorrect: boolean }) => {
	return isDataCorrect ? null : (
		<p className="alert alert-danger" role="alert">
			The entered data is incorrect. <br></br>Make sure that latitude is
			specified in degrees within the range [-90, 90]. Longitude is specified in
			degrees within the range [-180, 180].
		</p>
	);
};

export const Input = ({
	labelName,
	name,
	value,
	handleOnChange,
}: InputProps) => {
	return (
		<div className="d-flex flex-column flex-sm-row p-1">
			<label className="form-label" htmlFor={name}>
				{labelName}
			</label>
			<input
				className="form-control align-self-center bg-dark-subtle"
				type="text"
				id={name}
				value={value}
				onChange={(e) => handleOnChange(e)}
			/>
		</div>
	);
};

export const Results = ({
	distance,
	travelTime,
	requiredFuel,
	isDataCorrect,
}: ResultsProps) => {
	return isDataCorrect ? (
		<div className="p-3">
			<h2>Results:</h2>
			<p>Distance: {distance.toFixed(2)} km</p>
			<p>Travel time: {travelTime.toFixed(2)} hours</p>
			<p>Required amount of fuel: {requiredFuel.toFixed(2)} liters</p>
		</div>
	) : null;
};

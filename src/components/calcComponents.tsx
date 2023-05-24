export const Alert = ({ isDataCorrect }: { isDataCorrect: boolean }) => {
	return isDataCorrect ? null : (
		<p className="alert">
			The entered data is incorrect. <br></br>Make sure that latitude is
			specified in degrees within the range [-90, 90]. Longitude is specified in
			degrees within the range [-180, 180).
		</p>
	);
};

export const Input = ({
	labelName,
	name,
	value,
	handleOnChange,
}: {
	labelName: string;
	name: string;
	value: number;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div className="form-element">
			<label className="form-label" htmlFor={name}>
				{labelName}
			</label>
			<input
				type="text"
				id={name}
				value={value}
				onChange={(e) => handleOnChange(e)}
			/>
		</div>
	);
};

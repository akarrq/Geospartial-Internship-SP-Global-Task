export interface ResultsProps {
	distance: number;
	travelTime: number;
	requiredFuel: number;
	isDataCorrect: boolean;
}

export interface InputProps {
	labelName: string;
	name: string;
	value: number;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

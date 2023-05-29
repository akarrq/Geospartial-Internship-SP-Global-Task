import 'bootstrap/dist/css/bootstrap.min.css';

import Map from './components/map/MapComp';
import Calc from './components/calculator/Calc';

function App() {
	return (
		<div className="d-flex flex-column flex-md-row flex-sm-nowrap bg-dark text-white">
			<Calc />
			<Map />
		</div>
	);
}

export default App;

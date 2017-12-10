import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// Individual components
import WeatherCard from './weatherCard.js';

class WeatherApp extends React.Component {
	render() {
		return (
			<WeatherCard/>
		);
	}
}

ReactDOM.render(
	<WeatherApp/>,
	document.querySelector("#root")
);
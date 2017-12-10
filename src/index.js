import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// Data
import WeatherData from './data/weather_sample_data.js';

// Individual components
import WeatherCard from './weatherCard.js';


class WeatherApp extends React.Component {
	handleData() {
		return WeatherData.map((item, i) => {
			return <WeatherCard
				weatherInfo={item}
				key={i}
			/>
		});
	}



	render() {
		return (
			<div className="weather-cards-group">
				{this.handleData()}
			</div>
		);
	}
}

ReactDOM.render(
	<WeatherApp/>,
	document.querySelector("#root")
);
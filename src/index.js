import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// Data
import WeatherData from './data/weather_sample_data.js';

// Individual components
import WeatherCard from './weatherCard.js';
import HourlyForecast from './hourlyForecast.js';


class WeatherApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hourly: WeatherData[0].hourly
		}
	}
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
			<div className="container">
				<div className="weather-cards-group">
					{this.handleData()}
				</div>
				<div className="hourly">
					<HourlyForecast forecast={this.state.hourly}/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<WeatherApp/>,
	document.querySelector("#root")
);
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

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

	// Modifies the state of the hourly forecast.
	changeState(ind) {
		this.setState({hourly: WeatherData[ind].hourly});
	}

	handleData() {
		return WeatherData.map((item, i) => {
			return (
				<Link key={i} to={item.day}>
					<WeatherCard
						weatherInfo={item}
						modifyState={() => this.changeState(i)}
					/>
				</Link>
			);
		});
	}

	handleGraphs() {
		return WeatherData.map((item, i) => {
			return 	(
				<Route key={i} path={`/${item.day}`}
					// Apparently this is how you pass props down to components with react-router. Who knew? 
					render={(routeProps) => (
						<HourlyForecast {...routeProps} {...item} />
					)}
				/>
			);
		});
	}

	render() {
		return (
			<Router>
				<div className="container">
					<div className="weather-cards-group">
						{this.handleData()}
					</div>
					<div className="hourly">
						{this.handleGraphs()}
					</div>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(
	<WeatherApp/>,
	document.querySelector("#root")
);
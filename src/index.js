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

	componentDidMount() {
		fetch('https://api.openweathermap.org/data/2.5/forecast?q=Tampa&appid=c753b4feae5388aca46414f0ab6a4c14').then(function(response){
			return response.json();
		}).then((data) => {
			// At this point, all of the data is logged.
			var dataObj = {};
			var dates = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			// console.log(data.list);
			var current="";
			var previous="";
			data.list.forEach((arr, index) => {
				let day = new Date(arr.dt*1000);
				// console.log(day, dates[day.getDay()]);
				if(!(dates[day.getDay()] in dataObj)){
					previous = current;
					current = dates[day.getDay()];
					// Initialize the array
					dataObj[current] = [];
					// Push in the last datapoint for the previous set.
					if(previous){
						dataObj[previous].push(arr);				
					}
					// push in the first datapoint for the new set.
					dataObj[current].push(arr);
				} else if((dates[day.getDay()] in dataObj)){
					dataObj[dates[day.getDay()]].push(arr);
				}
			});
			this.setState({weatherData: dataObj});
		});		
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
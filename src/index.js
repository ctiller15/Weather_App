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
			hourly: WeatherData[0].hourly,
		}
	}

	componentDidMount() {
		Promise.all([
			fetch('https://api.openweathermap.org/data/2.5/forecast?q=Tampa&appid=c753b4feae5388aca46414f0ab6a4c14').then(function(response){
				return response.json();
			}),
			fetch('https://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=c753b4feae5388aca46414f0ab6a4c14').then(function(response){
				return response.json();
			})
			]).then((data) => {
				console.log(data);
			// At this point, all of the data is logged.
			var dataObj = {};
			var dates = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			// console.log(data.list);
			var current="";
			var previous="";
			data[0].list.forEach((arr, index) => {
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
			this.setState(
				{
					currentTemp: {
						kelvin: {
							current: data[1].main.temp,
							min: data[1].main.temp_min,
							max: data[1].main.temp_max
						},
						celsius: {
							current: data[1].main.temp - 273.15,
							min: data[1].main.temp_min - 273.15,
							max: data[1].main.temp_max - 273.15
						},
						fahrenheit:{
							current: ((data[1].main.temp - 273.15) * 1.8) + 32,
							min: ((data[1].main.temp_min - 273.15) * 1.8) + 32,
							max: ((data[1].main.temp_max - 273.15) * 1.8) + 32
						},
					},
					weekdata: dataObj
				},
			);
		});
	}

	handleDayData(day) {
		if(this.state.weekdata){
			return this.state.weekdata[day];
		}
	}

	handleData() {
		return WeatherData.map((item, i) => {
			return (
				<Link key={i} to={item.day}>
					<WeatherCard
						weatherInfo={item}
						first={i === 0}
						currentTemp={this.state.currentTemp}
						hourly={this.handleDayData(item.day)}
						currentDay={item.day}
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
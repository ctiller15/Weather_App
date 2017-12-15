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
		var icons = {
			"01d": "clear.png",
			"01n": "clearnight.png",
			"02d": "partlycloudy.png",
			"02n": "partlycloudynight.png",
			"03d": "scatteredclouds.png",
			"03n": "scatteredclouds.png",
			"04d": "hazy.png",
			"04n": "hazy.png",
			"09d": "rain01.png",
			"09n": "rain01.png",
			"10d": "partlysunnyrain.png",
			"10n": "rainnight.png",
			"11d": "thunderstorms01.png",
			"11n": "thunderstorms01.png",
			"13d": "snow.png",
			"13n": "snownight.png",
			"50d": "fog.png",
			"50n": "fog.png"
		}
		console.log(icons);
		Promise.all([
			fetch('https://api.openweathermap.org/data/2.5/forecast?q=Tampa&appid=c753b4feae5388aca46414f0ab6a4c14').then(function(response){
				return response.json();
			}),
			fetch('https://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=c753b4feae5388aca46414f0ab6a4c14').then(function(response){
				return response.json();
			})
			]).then((data) => {
				// console.log(data, icons[data[1].weather[0].icon]);
			// At this point, all of the data is logged.
			var dataObj = {};
			var dates = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			var dateOrder = [];
			var iconArray = [];
			// Pushing in the current icon for today.
			iconArray.push(icons[data[1].weather[0].icon]);
			console.log(iconArray);
			// console.log(data.list);
			var current="";
			var previous="";
			let tempIcon = [];
			data[0].list.forEach((arr, index) => {

				// console.log(arr.weather[0].icon);

				let day = new Date(arr.dt*1000);
				// console.log(day, dates[day.getDay()]);
				// Only runs upon hitting a new day of the week.
				if(!(dates[day.getDay()] in dataObj)){
					if(tempIcon.length > 0){
						// console.log(tempIcon);
						this.findMode(tempIcon);
						iconArray.push(this.findMode(tempIcon));
					}
					tempIcon = [];
					previous = current;
					current = dates[day.getDay()];
					dateOrder.push(current);
					// Initialize the array
					dataObj[current] = [];
					// Push in the last datapoint for the previous set.
					if(previous){
						dataObj[previous].push(arr);
						tempIcon.push(icons[arr.weather[0].icon]);
					}
					// push in the first datapoint for the new set.
					dataObj[current].push(arr);

				} else if((dates[day.getDay()] in dataObj)){
					dataObj[dates[day.getDay()]].push(arr);
					// If it is not the first date of the array, place the icon in the array.
					if(previous){
						tempIcon.push(icons[arr.weather[0].icon]);
					}
				}
			});
			// console.log(tempIcon);
			this.findMode(tempIcon);
			iconArray.push(this.findMode(tempIcon));
			// console.log(iconArray);
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
					weekdata: dataObj,
					dateorder: dateOrder,
					icons: iconArray
				},
			);
		});
	}

	// Finds the mode of a given array. Currently used to find the most appropriate icon for an upcoming day.
	findMode(arr){
		let objChecker = {};
		var max = 0;
		var icon = "";
		for(var i = 0; i < arr.length; i++){
			// Check if it is recorded in the object.
			if(!(arr[i] in objChecker)){
				objChecker[arr[i]] = 1;
			} else {
				objChecker[arr[i]] += 1;
			}
			// Check if it has a value greater than the current item
			if(objChecker[arr[i]] > max){
				max = objChecker[arr[i]];
				icon = arr[i];
			}
		}
		return icon;
	}

	handleDayData(day) {
		if(this.state.weekdata){
			return this.state.weekdata[day];
		}
	}

	handleData() {
		if(this.state.dateorder){
			return this.state.dateorder.map((date, i) => {
				return (
					<Link key={i} to={date}>
						<WeatherCard
							first={i === 0}
							currentTemp={this.state.currentTemp}
							hourly={this.handleDayData(date)}
							currentDay={this.state.dateorder ? this.state.dateorder[i] : ""}
							icon={this.state.icons[i]}
						/>
					</Link>
				);
			});
		}
	}

	handleGraphs() {
		if(this.state.dateorder){

			return this.state.dateorder.map((date, i) => {
				console.log(this.state.weekdata[date], "this is it!");
				return 	(
					<Route key={i} path={`/${this.state.dateorder ? this.state.dateorder[i] : ""}`}
						// Apparently this is how you pass props down to components with react-router. Who knew? 
						render={(routeProps) => (
							<HourlyForecast {...routeProps} weekdata={this.state.weekdata[date]} />
						)}
					/>
				);
			});			
		}
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
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import './index.css';

// Individual components
import DataWrapper from './wrapper.js';

class WeatherApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		// A list of all the possible icons, and mapping them to the correct image file.
		var icons = {
			"01d": "clear.png",
			"01n": "clear.png",
			"02d": "partlycloudy.png",
			"02n": "partlycloudy.png",
			"03d": "scatteredclouds.png",
			"03n": "scatteredclouds.png",
			"04d": "hazy.png",
			"04n": "hazy.png",
			"09d": "rain01.png",
			"09n": "rain01.png",
			"10d": "partlysunnyrain.png",
			"10n": "partlysunnyrain.png",
			"11d": "thunderstorms01.png",
			"11n": "thunderstorms01.png",
			"13d": "snow.png",
			"13n": "snow.png",
			"50d": "fog.png",
			"50n": "fog.png"
		}

		// Only runs once both promises are fulfilled. Allows us to keep this synchronous.
		Promise.all([

			fetch('https://api.openweathermap.org/data/2.5/forecast?q=Tampa&appid=c753b4feae5388aca46414f0ab6a4c14').then(function(response){
				return response.json();
			}),
			fetch('https://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=c753b4feae5388aca46414f0ab6a4c14').then(function(response){
				return response.json();
			})

		]).then((data) => {

			// At this point, all of the data is logged.
			// dataObj is where we will put all of the main weather data we care about.
			// dateOrder lets us know which date we start/end with so that everything displays chronologically.
			// iconArray is to help us figure out what icon is appropriate for the upcoming forecast.

			var dataObj = {};
			var dates = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			var dateOrder = [];
			var iconArray = [];

			// Pushing in the current icon for today.
			iconArray.push(icons[data[1].weather[0].icon]);

			var current="";
			var previous="";
			let tempIcon = [];

			data[0].list.forEach((arr, index) => {

				let day = new Date(arr.dt*1000);

				// Only runs upon hitting a new day of the week.
				if(!(dates[day.getDay()] in dataObj)){

					if(tempIcon.length > 0){

						this.findMode(tempIcon);
						iconArray.push(this.findMode(tempIcon));

					}

					// Reset arrays, increment through variables, and push data
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
			this.findMode(tempIcon);
			iconArray.push(this.findMode(tempIcon));
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

	render() {
		return (
			<Router>
				<DataWrapper weatherData={this.state}/>
			</Router>
		);
	}
}

ReactDOM.render(
	<WeatherApp/>,
	document.querySelector("#root")
);
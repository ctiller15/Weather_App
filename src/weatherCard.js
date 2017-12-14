import React from 'react';

// Components
import CardTop from "./cardTop.js";
import CardMiddle from "./cardMiddle.js";
import CardBottom from "./cardBottom.js";

// TODO: Figure out how to dynamically update the icons.

function averageDayTemps(weatherArray, type){
	var sum = 0;
	if(type === "max"){
		weatherArray.forEach((weatherElem) => {
			sum += weatherElem.main.temp_max;
		});
	} else if(type === "min"){
		weatherArray.forEach((weatherElem) => {
			sum += weatherElem.main.temp_min;
		});
	}
	// Creates the average temperature in Fahrenheit. Converting to Celsius wouldn't be difficult,
	// But since I have limited API calls I would have to do it the less fun way, using JavaScript to mess with the DOM.
	var averaged = ((((sum / weatherArray.length) - 273.15) * 1.8) + 32).toFixed(2);
	return averaged;
}

// A little confusing, but this just takes in the props object from WeatherCard.
function displayCardBottom(props){
	if(props.currentTemp){
		return( 
			<CardBottom 
				temps={
					{
						high: props.first ? props.currentTemp.fahrenheit.max.toFixed(2) : averageDayTemps(props.hourly, "max"),
						 low: props.first ? props.currentTemp.fahrenheit.min.toFixed(2) : averageDayTemps(props.hourly, "min")
					}
				}
			/>
		);
	}
}

function WeatherCard(props) {
	return(
		<div className="weather-card">
			<CardTop day={props.currentDay}/>
			<CardMiddle icon={props.icon}/>
			{displayCardBottom(props)}
		</div>
	);
}

export default WeatherCard;
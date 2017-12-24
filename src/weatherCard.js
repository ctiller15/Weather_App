import React from 'react';

// Components
import CardTop from "./cardTop.js";
import CardMiddle from "./cardMiddle.js";
import CardBottom from "./cardBottom.js";

function maxMinTemps(weatherArray, type){
	let tempArray = weatherArray.map(function(weatherElem){
		if(type === "max"){
			return weatherElem.main.temp_max;
		} else{
			return weatherElem.main.temp_min;
		}
	});
	console.log(tempArray);
	if(type === "max"){
		return (((Math.max(...tempArray) - 273.15) * 1.8) + 32).toFixed(2);
	} else if(type === "min"){
		return (((Math.min(...tempArray) - 273.15) * 1.8) + 32).toFixed(2);
	}
}

// A little confusing, but this just takes in the props object from WeatherCard.
function displayCardBottom(props){
	if(props.currentTemp){
		return( 
			<CardBottom 
				temps={
					{
						high: props.first ? props.currentTemp.fahrenheit.max.toFixed(2) : maxMinTemps(props.hourly, "max"),
						 low: props.first ? props.currentTemp.fahrenheit.min.toFixed(2) : maxMinTemps(props.hourly, "min")
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
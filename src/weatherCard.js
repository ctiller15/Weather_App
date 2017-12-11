import React from 'react';

// Components
import CardTop from "./cardTop.js";
import CardMiddle from "./cardMiddle.js";
import CardBottom from "./cardBottom.js";

function WeatherCard(props) {
	return(
		<div className="weather-card" onClick={() => {props.modifyState()}}>
			<CardTop day={props.weatherInfo.day}/>
			<CardMiddle icon={props.weatherInfo.weatherIcon}/>
			<CardBottom temps={{high: props.weatherInfo.highTemp, low: props.weatherInfo.lowTemp}}/>
		</div>
	);
}

export default WeatherCard;
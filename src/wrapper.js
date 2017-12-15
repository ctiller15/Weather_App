import React from 'react';

import WeatherCard from './weatherCard.js';
import HourlyForecast from './hourlyForecast.js';

import {
  Route,
  Link
} from 'react-router-dom'

// Now I should be able to change the state of this from Fahrenheit to Celsius without calling the API all over again.

class DataWrapper extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	handleDayData(day) {
		if(this.props.weatherData.weekdata){
			return this.props.weatherData.weekdata[day];
		}
	}

	handleData() {
		if(this.props.weatherData.dateorder){
			return this.props.weatherData.dateorder.slice(0,5).map((date, i) => {
				return (
					<Link key={i} to={date}>
						<WeatherCard
							first={i === 0}
							currentTemp={this.props.weatherData.currentTemp}
							hourly={this.handleDayData(date)}
							currentDay={this.props.weatherData.dateorder ? this.props.weatherData.dateorder[i] : ""}
							icon={this.props.weatherData.icons[i]}
						/>
					</Link>
				);
			});
		}
	}

	handleGraphs() {
		if(this.props.weatherData.dateorder){

			return this.props.weatherData.dateorder.slice(0,5).map((date, i) => {
				console.log(this.props.weatherData.weekdata[date], "this is it!");
				return 	(
					<Route key={i} path={`/${this.props.weatherData.dateorder ? this.props.weatherData.dateorder[i] : ""}`}
						// Apparently this is how you pass props down to components with react-router. Who knew? 
						render={(routeProps) => (
							<HourlyForecast {...routeProps} weekdata={this.props.weatherData.weekdata[date]} />
						)}
					/>
				);
			});			
		}
	}

	render() {
		return(
			<div className="container">
				<div className="weather-cards-group">
					{this.handleData()}
				</div>
				<div className="hourly">
					{this.handleGraphs()}
				</div>
			</div>			
		);
	}
}

export default DataWrapper;
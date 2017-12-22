import React from 'react';

import WeatherCard from './weatherCard.js';
import HourlyForecast from './hourlyForecast.js';

import {
  Route,
  Link,
  Switch
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

	handleIndex() {
		if(this.props.weatherData.weekdataFull){
			return (
				<Link className="index-link" to='/'>
						5-day forecast
				</Link>
			)
		}
	}

	handleIndexGraph() {
		if(this.props.weatherData.weekdataFull){
			return (
				<Route exact path='/'
					render={(routeProps) => (
						<HourlyForecast {...routeProps} weekdata={this.props.weatherData.weekdataFull} />
					)}
				/>
			);
		}
	}

	handleGraphs() {
		if(this.props.weatherData.dateorder){

			return this.props.weatherData.dateorder.slice(0,5).map((date, i) => {
				// console.log(this.props.weatherData.weekdata[date], "this is it!");
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
				<div className="center-links">
					{this.handleIndex()}
				</div>
				<div className="hourly">
					<Switch>
						{this.handleIndexGraph()}
						{this.handleGraphs()}
					</Switch>
				</div>
				<footer className="footer">
					<p>Powered by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeather</a> and <a href="https://vx-demo.now.sh/" target="_blank" rel="noopener noreferrer">vx</a></p>
					<p>App planned, designed and developed by <a href="https://www.curiouschriscodes.com/" target="_blank" rel="noopener noreferrer">Christopher Tiller</a></p>
					<p>Icons provided by <a href="https://vclouds.deviantart.com/art/weather-icon-set-165476034" target="_blank" rel="noopener noreferrer">umutavci</a></p>
					<div className="social">

					</div>
				</footer>
			</div>			
		);
	}
}

export default DataWrapper;
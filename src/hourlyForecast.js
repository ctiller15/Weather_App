import React from 'react';

function HourlyForecast(props) {

	// Calculates the current time in hours, given a ms input.
	function currentHours(timems){
		return (new Date(timems * 1000)).getHours();
	}

	// Loops through all of the snapshot data we have and outputs it to the DOM.
	const listItems = props.weekdata.map((item, i) => {
		return( 
			<div key={i} className="hourly-snapshot">
				<p>{currentHours(item.dt) >= 12 ? currentHours(item.dt) % 12 + " PM" : currentHours(item.dt) + " AM"}</p>
				<p>{((item.main.temp - 273.15) * 1.8 + 32).toFixed(2) + " F"}</p>
			</div>
		);
	});

	return(
		<div className="hourly-data">
			{listItems}
		</div>
	);
}

export default HourlyForecast;
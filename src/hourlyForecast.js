import React from 'react';

function HourlyForecast(props) {

	const listItems = props.forecast.map((item, i) => {
		return( 
			<div key={i} className="hourly-snapshot">
				<p>{item.time}</p>
				<p>{item.temp}</p>
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
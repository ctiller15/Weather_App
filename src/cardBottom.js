import React from 'react';

function chooseDisplay(props){
	// If the high and low values are within a degree, forget it! Just display the low value.
	if(Math.abs(props.temps.high - props.temps.low) < 1){
		return(
			<div className="temperatures">
				<p>{props.temps.low} &deg;F</p>
			</div>
		);
	} else {
		// Otherwise, show both!
		return(
			<div className="temperatures">
				<p>{props.temps.low} &deg;F</p>
				<p>{props.temps.high} &deg;F</p>
			</div>
		);
	}	
}

function cardBottom(props) {
	return(
		<div>
			{chooseDisplay(props)}
		</div>
	);
}

export default cardBottom;
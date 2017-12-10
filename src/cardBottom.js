import React from 'react';

function cardBottom(props) {
	return(
		<div className="temperatures">
			<p>{props.temps.low} F</p>
			<p>{props.temps.high} F</p>
		</div>
	);
}

export default cardBottom;
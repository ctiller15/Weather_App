import React from 'react';

function CardMiddle(props) {
	return(
		<div className="weather-icon">
			<img src={require(`./images/icons/Weather_Icons/${props.icon}`)} alt=""/>
		</div>
	);
}

export default CardMiddle;
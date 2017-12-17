import React from 'react';

// Working on getting a fancy ol' graph...

import { AxisLeft, AxisBottom } from '@vx/axis';
import { GradientOrangeRed } from '@vx/gradient';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';

import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { AreaClosed } from '@vx/shape';

const width = 750;
const height = 400;

const margin = {
	top: 60,
	bottom: 60,
	left: 80,
	right: 80,
};

const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

function HourlyForecast(props) {

	const data = props.weekdata;

	const x = w => new Date(w.dt * 1000);
	const y = w => ((w.main.temp - 273.15) * 1.8 + 32).toFixed(2)

	const xScale = scaleTime({
		range: [0, xMax],
		domain: extent(data, x)
	});

	const yScale = scaleLinear({
		range: [yMax, 0],
		domain: [0, max(data, y)],
	});

	// Calculates the current time in hours, given a ms input.
	function currentHours(timems){
		// console.log((new Date(timems * 1000)).getHours());
		return (new Date(timems * 1000)).getHours();
	}

const chart = ( 
	<svg width={width} height={height}>
		<Group top={margin.top} left={margin.left}>

			<AreaClosed
				data={data}
				xScale={xScale}
				yScale={yScale}
				x={x}
				y={y}
				fill={"url(#gradient)"}
				stroke={""}
			/>

			<AxisBottom
				scale={ xScale }
				top={ yMax }
				label={'Time'}
				stroke={'#1b1a1e'}
				tickTextFill={'#1b1a1e'}
			/>

			<AxisLeft
				scale={yScale}
				top={0}
				left={0}
				label={'Temperature (F)'}
				stroke={'#1b1a1e'}
				tickTextFill={'#1b1a1e'}
			/>

			<LinearGradient
				from='#fbc2eb'
				to='#a6c1ee'
				id='gradient'
			/>

		</Group>
	</svg> );

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
			{/* {listItems} */}
			{ chart }
		</div>
	);
}

export default HourlyForecast;
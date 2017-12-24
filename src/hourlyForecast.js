import React from 'react';

// Working on getting a fancy ol' graph...

import { AxisLeft, AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';
import { withParentSize } from '@vx/responsive';

import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { AreaClosed } from '@vx/shape';

// withParentSize passes down the size of the parent as a prop to this element.

function HourlyForecast(props) {

	const height = props.parentHeight;
	const width = props.parentWidth;

	const margin = {
		top: 20,
		bottom: 60,
		left: 60,
		right: 20,
	};

	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;

	const data = props.weekdata;

	const x = w => new Date(w.dt * 1000);
	const y = w => ((w.main.temp - 273.15) * 1.8 + 32).toFixed(2);

	const xScale = scaleTime({
		range: [0, xMax],
		domain: extent(data, x)
	});

	const yScale = scaleLinear({
		range: [yMax, 0],
		domain: [0, max(data, y)],
	});

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
					numTicks={ 6 }
					label={'Time'}
			        labelProps={{
			          fill: '#000000',
			          textAnchor: 'middle',
			          fontSize: 24,
			          fontFamily: 'Roboto',
			        }}
					stroke={'#1b1a1e'}
					tickTextFill={'#1b1a1e'}
				/>

				<AxisLeft
					scale={yScale}
					top={0}
					left={0}
					label={'Temperature (F)'}
			        labelProps={{
			          fill: '#000000',
			          textAnchor: 'middle',
			          fontSize: 20,
			          fontFamily: 'Roboto',
			        }}
					stroke={'#1b1a1e'}
					tickTextFill={'#1b1a1e'}
				/>

				<LinearGradient
					from='#FF0000'
					to='#0000FF'
					id='gradient'
				/>

			</Group>
		</svg> );

		return(
			<div className="hourly-data">
				{chart}
			</div>
		);
	}

export default withParentSize(HourlyForecast);
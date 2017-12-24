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
	
	console.log(window.innerWidth);
//	if(window.innerWidth >)


	const height = props.parentHeight;
	const width = props.parentWidth;

	const margin = {
		top: 20,
		bottom: 60,
		left: 60,
		right: 20,
	};
		
	var labelPropsBottom = {
						  fill: '#3f4a4f',
						  textAnchor: 'middle',
						  fontSize: 24,
						  fontFamily: 'Roboto',
						};
	
	var labelPropsLeft = {
						  fill: '#3f4a4f',
						  textAnchor: 'middle',
						  fontSize: 20,
						  fontFamily: 'Roboto',
						};
	
//	tickTextFontSize doesn't seem to work. Look into it!
//	var tickTextFontSizeBottom = 10;
//	var tickTextFontSizeLeft = 10;
	
	if(window.innerWidth >= 768){
			labelPropsBottom.fontSize = 30;
			labelPropsLeft.fontSize = 30;
			margin.left = 80;
//			tickTextFontSizeBottom = 20;
	} if(window.innerWidth >= 1024){
			labelPropsBottom.fontSize = 40;
			margin.bottom = 80;
			labelPropsLeft.fontSize = 40;
			margin.left = 100;
	} if(window.innerWidth >= 1224){
		labelPropsBottom.fontSize = 20;
		labelPropsLeft.fontSize = 20;
	}
	
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
			        labelProps={labelPropsBottom}
					stroke={'#3f4a4f'}
					tickTextFill={'#3f4a4f'}
//					tickTextFontSize={ 20 }
				/>

				<AxisLeft
					scale={yScale}
					top={0}
					left={0}
					label={'Temperature (F)'}
			        labelProps={labelPropsLeft}
					stroke={'#3f4a4f'}
					tickTextFill={'#3f4a4f'}
//					tickTextFontSize={ 50 }
				/>

				<LinearGradient
					from='#D70500'
					to='#100650'
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
import React from 'react';
import ReactDOM from 'react-dom';

class WeatherApp extends React.Component {
	render() {
		return (
			<h1>Hello, World!</h1>
		);
	}
}

ReactDOM.render(
	<WeatherApp/>,
	document.querySelector("#root")
);
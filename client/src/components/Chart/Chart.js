import React, { Component } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2'

class Chart extends Component {
	componentWillMount() {
	}
	componentWillUpdate(nextProps, nextState) {
	} //end componetUpdate	
	state = {

		data: {
			labels: [
				'raman', 'kiran', 'pari', 'samu'
			],
			datasets: [{
				label: "Team Contribution",
				data: [
					90, 90, 90, 90
				],
				backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#CCC", "#FFUD3"]
			}]
		}


	} //end of state


	getChartData = () => {

	}


	render() {

		let chart;
		if (this.props.type == 'Pie') {
			chart = (< Pie id="test1"
				data={this.props.data}

			/>)
		}
		else {
			chart = (< Bar id="test2"
				data={this.props.data}

			/>)
		}

		return (<div className="Chart" >
			{chart}
		</div>
		)
	}
}

export default Chart;
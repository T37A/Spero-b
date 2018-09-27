import React, { Component } from 'react';
import { Pie, Bar, Doughnut } from 'react-chartjs-2'

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
		if (this.props.type === 'Pie') {
			chart = (< Pie id="test1"
				data={this.props.data}

				onElementsClick={(element)=>{
					
					//console.log(element)
				}}

				getElementsAtEvent={(elems) => {
					//debugger
					console.log(elems[0]._chart.config.data.labels[elems[0]._index])
				}} 

				getDatasetAtEvent={(elems) => {
					//debugger
					//console.log("1"+elems[0]._chart.config.data.labels[elems[0]._index])
				}} 

				 

			/>)
		}
		else if (this.props.type === 'Bar'){
			chart = (< Bar id="test2"
				data={this.props.data}

			/>)
		}else if (this.props.type === 'Doughnut'){
			chart = (< Doughnut id="test2"
				data={this.props.data}

				getElementsAtEvent={(elems) => {
					//debugger
					console.log(elems[0]._chart.config.data.labels[elems[0]._index])
				}}

			/>)
		}


		return (<div className="shadow-lg p-3 mb-5 bg-white rounded" >
			{chart}
		</div>
		)
	}
}

export default Chart;
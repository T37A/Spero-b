import React, { Component } from 'react';
import  './chart.css'
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
				backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#CCC", "#FFUD3","#ffc107","#dc3545"]
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
					this.props.clickHandler(elems)
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
					
					this.props.clickHandler(elems)
				}}

			/>)
		}


		return (<div className="chartdiv">
				<div className="chartHeader">{this.props.data.datasets?this.props.data.datasets[0].label:""}</div>
				<div className="chartBody"> {chart}</div>
			
		</div>
		)
	}
}

export default Chart;
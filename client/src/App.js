import React, { Component } from 'react';
import Commits from './components/Commits/Commits'
import Chart from './components/Chart/Chart'


class App extends Component {


  state = {
    commits: [],
    chartData: {}
  }


  getChartData = (commits) => {
    const members = new Map();
    commits.map(commit => {
      const key = members.has(commit.authorName);

      if (key) {
        let count = members.get(commit.authorName);
        count = count + 1;
        members.set(commit.authorName, count);
      } else {
        members.set(commit.authorName, 1);
      }


    })

    const data = {
      labels: [
      ],
      datasets: [
        {
          label: "GIT Commits",
          data: [
          ],
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#CCC", "#42f456"],

          options: {

            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  max: this.props.maxY,
                  min: 0,
                  stepSize: 3
                }
              }]
            },
            title: {
              display: this.props.display,
              text: this.props.title
            }
          }
        }
      ]
    }
    for (let [key, value] of members.entries()) {
      console.log(key + ":" + value);
      data.labels.push(key);
      data.datasets[0].data.push(value)
    }


    return data;

  }


  componentWillMount() {

    fetch('http://localhost:4000/getCommits?repoName=Spero-b&autherName=T37A').then((res) => res.json()).then(res => {


      const commitArray = res.map((commitObj) => {


        return ({

          authorName: commitObj.commit.author.name,
          authorEmail: commitObj.commit.author.email,
          date: commitObj.commit.author.date,
          CommitMsg: commitObj.commit.message,
          htmlUrl: commitObj.html_url
        })
      })


      const data = this.getChartData(commitArray);

      this.setState({
        commits: commitArray,
        chartData: data
      })

    })
  }



  render() {



    const style = {
      'background-color': 'wheat',
      'text-align': 'center'
    }

    return (

      
      <div className="container-fluid">

        <div className="row">
          <div className="col-sm-12" >
            <h2 className='display-4' style={style}>Spero-B Team Teja</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6" ><Chart type="Pie" data={this.state.chartData} />
          </div>
          <div className="col-sm-6" ><Chart type="Bar" data={this.state.chartData} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12" ><Commits commits={this.state.commits} />
          </div>
        </div>
      </div>



    )
  }

}

export default App;


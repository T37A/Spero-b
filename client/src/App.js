import React, { Component } from 'react';
import Commits from './components/Commits/Commits'
import Chart from './components/Chart/Chart'
import Form from './components/form/Form'
import BackDrop from './components/backDrop/backDrop';
import Modal from './components/modal/modal';
import Comments from './components/comments/comments';

class App extends Component {


    state = {
        commits: [],
        chartData: {},
        showDemo: false,
        showSpero: true,
        showModal:false,
        activeSubTheme:null,
        serverResponse:null
    }

    getChartDataTemplate = () => {
        return ({
            labels: [],
            datasets: [{
                label: "GIT Commits",
                data: [],
                backgroundColor: ["#F7464A", "#46BFBD", "#fd7e14", "#007bff", "#28a745","#ffc107","#dc3545"],

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
            }]
        })
    }

    getSubThemeCharData = (obj) => {
        
        const data = this.getChartDataTemplate();
        data.datasets[0].label = obj.themeName;
        for (var i = 0; i < obj.subThemes.length; i++) {
            data.labels.push(obj.subThemes[i].name);
            data.datasets[0].data.push(obj.subThemes[i].data.hitCount)
        }
        return data;
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

        const data = this.getChartDataTemplate();
        for (let [key, value] of members.entries()) {
            
            data.labels.push(key);
            data.datasets[0].data.push(value)
        }
        return data;

    }


    componentWillMount() {

        if (this.state.showDemo) {
            fetch('http://localhost:4000/getCommits?repoName=Spero-b&autherName=T37A')
                .then((res) => res.json())
                .then(res => {
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
                        chartData: data,

                    })

                })
        } //end if
        if (this.state.showSpero) {


        }

    }


    formHandler = (event) => {

        event.preventDefault();
        const data = new FormData(event.target);
        console.log('form submit caled');
        fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: data,
            enctype: "multipart/form-data"
        }).then(res => res.json())
            .then(res => {
                this.setState({serverResponse: res})
                let chartDataArray = [];
                res.forEach((element) => {
                      chartDataArray.push(this.getSubThemeCharData(element))
                })

                this.setState({
                    speroChartData: chartDataArray

                })

            });
    }

    chartClickHandler=(elems)=>{
        
        if(elems.length>0){
            const sliceName=elems[0]._chart.config.data.labels[elems[0]._index];
        const response=this.state.serverResponse;
        let  activeSubtheme=null;
           response.some((element) => {
               
              activeSubtheme =  element.subThemes.find((subTheme)=>{
                    if(subTheme.name===sliceName){
                        return subTheme;
                   }
               })//end of find
              
              if(activeSubtheme) return true;


           })//end of for

          
        this.setState({showModal:true,activeSubTheme:activeSubtheme});
        }
        
        
    }

    closeClickHandler=()=>{
        this.setState({showModal:false});
    }

    render() {


        const style = {
            'background-color': 'wheat',
            'text-align': 'center'
        }
        let content = null;

        if (this.state.showDemo) {
            content = (
                <div className="container-fluid">

               
                    <div className="row">
                        <div className="col-sm-12" >
                            <h2 className='display-4' style={style}>Spero-B Team Teja</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6" ><Chart clickHandler={this.chartClickHandler} type="Pie" data={this.state.chartData} />
                        </div>
                        <div className="col-sm-6" ><Chart clickHandler={this.chartClickHandler} type="Bar" data={this.state.chartData} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12" ><Commits commits={this.state.commits} />
                        </div>
                    </div>
                </div>
            )
        }

        if (this.state.showSpero) {
            if (this.state.speroChartData) {
                content = (<div className="container-fluid">

                <BackDrop show={this.state.showModal}>
                </BackDrop>
                <Modal show={this.state.showModal} closeClickHandler={this.closeClickHandler}>
                    <Comments subTheme={this.state.activeSubTheme}/>
                </Modal>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-4" ><Chart clickHandler={this.chartClickHandler} type="Pie" data={this.state.speroChartData[0]} />
                        </div>
                        <div className="col-sm-4" ><Chart clickHandler={this.chartClickHandler} type="Doughnut" data={this.state.speroChartData[1]} />
                        </div>
                        <div className="col-sm-4" ><Chart clickHandler={this.chartClickHandler} type="Pie" data={this.state.speroChartData[2]} />
                        </div>

                    
                        <div className="col-sm-6" ><Chart clickHandler={this.chartClickHandler} type="Pie" data={this.state.speroChartData[3]} />
                        </div>
                        <div className="col-sm-6" ><Chart clickHandler={this.chartClickHandler} type="Doughnut" data={this.state.speroChartData[4]} />
                        </div>


                    </div>


                </div>)
            } else {

                content = (
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-sm-12" >
                                <Form formHandler={this.formHandler} />
                            </div>
                        </div>


                    </div>
                )
            }


        }

        return (

            <div>{content}</div>

        )
    }

}

export default App;
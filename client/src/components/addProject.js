import React, {Component} from 'react';

class AddProject extends Component{



constructor(){
	super();
	this.state={
	newProject:{}	
	}
}


static defaultProps= {
	cat: ['c1','c2','c3'] 
}

handleSubmit(e){
	
	this.setState({
		newProject:{
		title: this.refs.title.value,
		category:this.refs.category.value
	}
	}, function(){
		this.props.addProject(this.state.newProject);
	})
	e.preventDefault();
}

render(){

let categoryOption=this.props.cat.map(c=>{
	//console.log(c);
	return (<option key={c} value={c}>{c}</option>);
});

	return(

<div>
<br />
<form onSubmit={this.handleSubmit.bind(this)} >
<lable> Title </lable>
<input type='text' ref='title' />

<lable> category</lable>
<select ref='category'>
{categoryOption}
</select>
<br/><br/>
<input type='submit' value='submit'  />

</form>


</div>

		)
}

}

export default AddProject;
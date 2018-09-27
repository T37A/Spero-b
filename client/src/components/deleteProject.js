import React,{Component} from 'react'

class DeleteProject extends Component{

constructor(){
	super()
	this.state={
		deleteProjcet:{}
	}
}


handleDelete( title){


this.props.handleDelete(title);

console.log(title);

}

render(){
	return(
<a herf='#' onClick={this.handleDelete.bind(this,this.props.project.title)}><strong>X</strong></a>

		)

}

}

export default DeleteProject;
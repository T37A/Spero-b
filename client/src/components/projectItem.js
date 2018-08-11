import React, {Component} from 'react';
import DeleteProject from './deleteProject'

class ProjectItem extends Component{


handleDelete(projectTitle){

this.props.onDelete(projectTitle);
}

render(){

return(
<div>
<strong>{this.props.item.title}</strong> {this.props.item.category} 
<DeleteProject project={this.props.item} handleDelete={this.handleDelete.bind(this)}/>
</div>
	

	)

}

}
export default ProjectItem;
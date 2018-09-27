import React, { Component } from 'react';
import ProjectItem from './projectItem'

class Project extends Component {

	render() {



		let projectItems = this.props.projects.map(project => {

			return (
				<ProjectItem onDelete={this.props.onDelete} key={project.title} item={project} />
			);
		});

		return (
			<div>
				{projectItems}
			</div>
		);

	}// end render
}

export default Project;
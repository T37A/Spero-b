import React from 'react';
import './backDrop.css';
const backDrop = (props) => {
	
		return (props.show?<div className="backDrop"></div>:null)
}
export default backDrop
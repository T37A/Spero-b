import React from 'react'
import './modal.css'
const modal = (props) => {
	let a=(<div className="modal1">
					<div className="modalHeader">
						<button className="closeButton"
						 onClick={props.closeClickHandler}>X</button>
					</div>
					<div >
						{props.children}
					</div>
			</div>)

	let b=(<div className="modal1">
					
						{props.children}
					
			</div>)

	return (props.show?a:null)
}
export default modal
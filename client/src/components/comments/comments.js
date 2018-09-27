import React from 'react';
import './comments.css';
const comments = (props) => {

	{/*let key = (<div align="center">{props.subTheme.data.keyWords.join(",")}</div>)*/}

	let commentArr = props.subTheme.data.comments.map((comment) => {
		return comment;
	})
	//debugger
	let content = commentArr.map((comment,index) => {

		let commentWord = comment.comment.split(" ");
		let commentWord2 = commentWord.map((word) => {

			if (props.subTheme.data.keyWords.includes(word)) {
				return (<span className="matchword">{word + " "}</span>)
			} else {
				return word + " ";
			}
		})

		
		return (
				<tr ><td>{comment.sentiment}</td><td><div > {commentWord2.map((i) => i)}</div></td></tr>
		)
	})

	return (

		<div className="commentsSection">
		<div className="commentHeader" >{props.subTheme.name}</div>	
			<table className="table table-striped">
			<thead><tr><th>sentiment</th><th >comment</th></tr></thead>
			<tbody>{content}</tbody>
			
				
			</table>
		</div>
	)
}
export default comments
import React from 'react';

const Commit=(props)=>{

	return(
		 < tr >
        < td > {props.commit.authorName} < /td> 
        < td > {props.commit.authorEmail} < /td> 
        < td > {new Date(props.commit.date).toLocaleDateString()} < /td> 
        < td > {props.commit.CommitMsg} < /td> 
        < td > <a href={props.commit.htmlUrl} target="_blank">Click Me</a>< /td>
        < /tr> 
		);

}

export default Commit; 
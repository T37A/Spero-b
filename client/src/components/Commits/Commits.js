import React,{Component} from 'react';
import Commit from './Commit/Commit'



class Commits extends Component{





	render(){


		const list=this.props.commits.map(commit=>{
			return (
				<Commit commit={commit}/>
				)
		})


	return ( < table className = "table table-dark" >
        <thead>
        < tr >
        < th > Author Name < /th>
         < th > Author Email < /th>
         < th > Date < /th>
		< th > Commit Message < /th>
		< th > Commit URL < /th>
         < /tr>
         </thead> 
        < tbody >
       	
       	{list}
       
        < /tbody> 
        < /table>
    );


	}
} 

export default Commits;
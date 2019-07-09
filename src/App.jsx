import React,{Component} from 'react';
import Header from './component/Header';
import Playground from './component/Playground';



import './App.css';

// const examples = { json: '# Json example', internetobject: '// Internet Object Example' };

export default class App extends Component {


	render(){
		return (
		  <div className="App">
		      <div className="wrapper">
			  	<Header/>
				<Playground/>
			  </div>
		  </div>
		);
	}
}

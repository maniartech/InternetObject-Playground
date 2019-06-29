import React,{Component} from 'react';
import logo from '../static/img/full-logo.png';
import './Header.scss';

export default class Header extends Component {
	render(){
		return (
		  <div className="header">
			  <div className="row">
				  <div className="col left">
				  	<a href="/" className="logo pull-left"><img src={ logo } width="180px"/></a>
				  </div>

				  <div className="col right">
					<ul className="menu-link pull-right">
						<li><a href="#"> Link 1 </a></li>
						<li><a href="#"> Link 2 </a></li>
						<li><a href="#"> Link 3 </a></li>
						<li><a href="#"> Link 4 </a></li>
					</ul>
				  </div>
				  <div className="clearfix"></div>
			  </div>
		  </div>
		);
	}
}

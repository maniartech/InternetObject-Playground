import React,{Component} from 'react';
import './Toolbar.scss';

export default class Toolbar extends Component{
    render(){
        return(
            <div className="toolbar">
                <div className="row">
                    <div className="col">
                    <div className="left pull-left">
                            <a href="#" className="">New</a>
                            <a href="#" className="">Share</a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="right pull-right">
                            <a href="#" className="">Help</a>
                            <a href="#" className="">Blog</a>
                            <a href="#" className="button-dropdown-arrow">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


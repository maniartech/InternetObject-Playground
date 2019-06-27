import React,{Component} from 'react';
import Toolbar from './Toolbar';
import Editor from './Editor';
import './Playground.scss';

export default class Playground extends Component{
    render(){
        return(
            <div className="playground">
                <Toolbar/>
                <Editor/>
			</div>
        );
    }
}
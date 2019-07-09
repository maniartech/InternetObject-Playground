import React,{Component} from 'react';
import Iheader from './Iheader';
import Idata from './Idata';
import Json from './Json';
import SplitPane from 'react-split-pane';
import './Editor.scss';

export default class Editor extends Component{
    constructor (props) {
        super(props)
        this.state = {
            counter: 1
        }
    }

    render(){
        return(
            <div className="editor">
                <SplitPane split="vertical" defaultSize="61.8%" onChange={this.onChange}>
                    <SplitPane split="horizontal" defaultSize="30%" onChange={this.onChange}> 
                        <Iheader refresh={this.state.counter} />
                        <Idata refresh={this.state.counter} />
                    </SplitPane>
                    <Json refresh={this.state.counter}/>
                </SplitPane>
            </div>
        );
    }

    onChange = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
}
import React,{Component} from 'react';
import  MonacoEditor from './common/ResizableMonacoEditor';

export default class Iheader extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            code: '',
        }
    }

    render(){
        const code = this.state.code;
    
        return(
            <div className="iheader">
                <label>Header</label>
                <div className="pane-wrapper">
                    <MonacoEditor
                        width="100%"
                        height="100%"
                        language="javascript"
                        theme="vs"
                        value={code}
                        // options={
                        //    
                        // }
                        onChange={this.onChange}
                        editorDidMount={this.editorDidMount}
                        refresh={this.props.refresh}
                    />
                </div>
            </div>
        );
    }
}
import React,{Component} from 'react';

// React Monaco Editor
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
            const options = {
            selectOnLineNumbers: true,
        };
    
        return(
            <div className="iheader">
                <label>Header</label>
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language="javascript"
                    theme="vs"
                    value={code}
                    // options={
                    //     {
                    //         lineNumbers : 'off',
                    //         minimap:{
                    //             enabled: false
                    //         }
                    //     }
                    // }
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                    refresh={this.props.refresh}
                />
            </div>
        );
    }
}
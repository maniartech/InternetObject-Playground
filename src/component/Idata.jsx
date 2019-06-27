import React,{Component} from 'react';

// React Monaco Editor
import  MonacoEditor from './common/ResizableMonacoEditor';

export default class Idata extends Component{

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
            minimap: { enabled: false }
        };

        return(
            <div className="idata">
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                    refresh={this.props.refresh}
                />
            </div>
        );
    }
}
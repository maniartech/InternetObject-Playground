import React,{ Component} from 'react';
import './Json.scss';

// React Monaco Editor
import  MonacoEditor from 'react-monaco-editor';

export default class Json extends Component{
    constructor(props) {
        super(props);
        this.state = {
            code: '// type your code...',
        }
    }

    editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();
    }

    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
    }

    render(){

        const code = this.state.code;
            const options = {
            selectOnLineNumbers: true
        };

        return(
            <div className="section-json">
                <MonacoEditor
                    width="600"
                    height="700"
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
            </div>
        );
    }
}
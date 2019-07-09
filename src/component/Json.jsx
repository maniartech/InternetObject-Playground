import React,{ Component} from 'react';
import  MonacoEditor from './common/ResizableMonacoEditor';

export default class Json extends Component{
    constructor(props) {
        super(props);
        this.state = {
            code: ' ',
        }
    }

    render(){
        const code = this.state.code;

        return(
            <div className="section-json">
                <label>Json</label>
                <div className="pane-wrapper">
                    <MonacoEditor
                        width="100%"
                        height="100%"
                        language="javascript"
                        
                        value={code}
                        options={
                            {
                                lineDecorationsWidth: 5,
                                readonly: true
                            }
                        }
                        onChange={this.onChange}
                        editorDidMount={this.editorDidMount}
                        refresh={this.props.refresh}
                    />
                </div>
            </div>
        );
    }
}
import React,{Component} from 'react';
import debounce from 'lodash/debounce'
import  MonacoEditor from 'react-monaco-editor';

export default class ResizableMonacoEditor extends Component {

    constructor (props) {
        super(props)

        // this.handleResize = debounce(this.handleResize, 20)
    }

    editor = null

    handleEditorDidMount = editor => this.editor = editor
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.refresh !== this.props.refresh) {
            this.handleResize()
        }
    }

	render() {
        // return null
		return (
			<MonacoEditor
                { ...this.props }
                theme="vs"
                options = {
                    {
                        lineNumbers: 'off',
                        glyphMargin: false,
                        folding: false,
                        lineDecorationsWidth: 10,
                        lineNumbersMinChars: 0,
                        highlightActiveIndentGuide: true,
                        renderLineHighlight: "none",
                        overviewRulerBorder: false,
                        scrollbar: {
                            vertical: "auto",
                            horizontal: "auto"
                        },
                        minimap:{
                            enabled: false
                        }
                    }
                }
				editorDidMount={this.handleEditorDidMount}
			/>
		);
	}

	handleResize = () => {
        this.editor.layout()
    }

	componentDidMount() {
		window.addEventListener('resize', this.handleResize)
	}
}
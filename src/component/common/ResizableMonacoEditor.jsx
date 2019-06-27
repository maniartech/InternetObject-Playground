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
		return (
			<MonacoEditor
				{ ...this.props }
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
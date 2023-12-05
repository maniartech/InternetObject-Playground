import                         "./Output.css"
import Editor, { EditorProps }             from "../editor/Editor"
import Overlay            from "../overlay/Overlay"

interface OutputProps extends EditorProps {
  error?: string
}

export default function Output({
  value,
  error,
  options
}:any) {
  return (
    <div className="output">
      <Editor value={value}  options={options} />
      {
      error &&  <Overlay
        heading="Complied with problems:"
        onClose={() => {}}
      >
        <div className="error">{error}</div>
      </Overlay>
      }
    </div>
  )
}
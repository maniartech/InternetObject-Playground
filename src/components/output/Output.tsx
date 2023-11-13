import                         "./Output.css"
import Editor, { EditorProps }             from "../editor/Editor"
import Overlay            from "../overlay/Overlay"

interface OutputProps extends EditorProps {
  error?: string
}

export default function Output({
  value,
  error
}:any) {
  return (
    <div className="output">
      <Editor value={value} />
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
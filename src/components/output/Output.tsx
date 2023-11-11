import                         "./Output.css"
import Editor             from "../editor/Editor"
import Overlay            from "../overlay/Overlay"

export default function Output() {
  return (
    <div className="output">
      <Editor />
      <Overlay
        heading="Complied with problems:"
        onClose={() => {}}
      >
        <p>Check for the error</p>
      </Overlay>
    </div>
  )
}
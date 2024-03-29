import { useRecoilValue }           from 'recoil'

import                                   './Footer.css'
import editorPosition               from '../../states/editor-pos'

export default function Footer() {
  const editorPos = useRecoilValue(editorPosition)


  return (
    <footer className="footer">
      <div className="left">
      <p>{ editorPos.editorName } <span>: </span></p>
        <p>Ln <span>{ editorPos.row }</span></p>
        <p>Col <span>{ editorPos.column }</span></p>
        <p>Pos <span>{ editorPos.position }</span></p>
      </div>
      <div className="right">
        <p>© 2019-2024 <img className='company-logo' src='/mt-logo.png' alt='Maniar Technologies Private Limited' /> <a className='highlight' rel="noreferrer" target='_blank' href='https://www.maniartech.com'><b>Maniar Technologies</b></a></p>
      </div>
    </footer>
  )
}
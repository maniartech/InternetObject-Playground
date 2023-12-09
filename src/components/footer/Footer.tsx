import                          './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="left">
        <p>Ln <span>7,</span></p>
        <p>Col <span>22,</span></p>
        <p>Pos <span>11</span></p>
      </div>
      <div className="right">
        <p><a className='highlight' rel="noreferrer" target='_blank' href='https://www.maniartech.com'><b>Maniar Technologies</b></a> An ISO 9001 & 27001 Registered Company </p>
      </div>
    </footer>
  )
}
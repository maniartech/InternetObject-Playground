import { Link }            from 'react-router-dom'

import                          './Header.css'
import Logo                from '../logo/Logo'

export default function Header(props: any) {
  return (
    <header className="App-header">
      <div className="left">
        <div className="logo-container">
          <Logo />
          <h1>Playground</h1>
        </div>
        <p className='description' title='Internet Object vs. JSON: Try It!'>Internet Object vs. JSON: Try It!</p>
      </div>

      <div className="right">
        <div className="menu-container">
          <ul className="header-menu">
            <li className="header-menuItem">
              <Link to="https://www.internetobject.org/" aria-label="Home">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </Link>
            </li>
            <li className="header-menuItem">
              <Link  to="https://www.internetobject.org/io-vs-json/" target="_blank" aria-label="IO vs JSON">
                IO vs JSON
              </Link>
            </li>
            <li className="header-menuItem">
              <Link to="https://www.internetobject.org/the-story/" target="_blank" aria-label="The Story">
                The Story
              </Link>
            </li>
            <li className="header-menuItem">
              <Link to="https://www.internetobject.org/community/" target="_blank" aria-label="Community">
                Join Community
              </Link>
            </li>
            <li className="header-menuItem">
              <Link to="https://docs.internetobject.org" target="_blank" aria-label="Specification">
                Specification
              </Link>
            </li>
          </ul>
        </div>
        {props.children}
      </div>
    </header>
  )
}

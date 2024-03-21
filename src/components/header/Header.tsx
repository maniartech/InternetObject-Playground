import                          './Header.css'
import Logo                from '../logo/Logo'

export default function Header() {
  return (
    <header className="App-header">
      <div className="left">
        <div className="logo-container">
          <Logo />
          <h1>Playground</h1>
        </div>
      </div>

      <div className="right">
        <div className="menu-container">
          <ul className="header-menu">
            <li className="header-menuItem">
              <a href="/" aria-label="Home">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </a>
            </li>
            <li className="header-menuItem">
              <a href="io-vs-json" aria-label="IO vs JSON">
                IO vs JSON
              </a>
            </li>
            <li className="header-menuItem">
              <a href="/the-story/" aria-label="About">
                The Story
              </a>
            </li>
            <li className="header-menuItem">
              <a href="/community/" aria-label="Community">
                Join Community
              </a>
            </li>
            <li className="header-menuItem">
              <a href="https://docs.internetobject.org" aria-label="Specification">
                Specification
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

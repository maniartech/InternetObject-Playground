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
              <a href="/home/" aria-label="Home">
                Home
              </a>
            </li>
            <li className="header-menuItem">
              <a href="/about/" aria-label="About">
                About IO
              </a>
            </li>
            <li className="header-menuItem">
              <a href="https://docs.internetobject.org" aria-label="Docs">
                Docs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

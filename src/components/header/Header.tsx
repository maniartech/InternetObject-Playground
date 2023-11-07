import                          "./Header.css";
import Logo                from "../logo/Logo";

export default function Header() {
  return (
    <header className="App-header">
      <div className="left">
        <div className="logo-container">
          <Logo />
          <h1>Playground</h1>
        </div>

        {/* <div className="actions">
        <button className="btn">
          <svg width="100px" height="40px" viewBox="0 0 100 40" className="border">
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
          </svg>
          <span>Run Code</span>
        </button>
      </div> */}
      </div>

      <div className="right">
        <div className="menu-container">
          <ul className="header-menu">
            <li className="header-menuItem ">
              <a href="/about/" aria-label="About">
                About IO
              </a>
            </li>
            <li className="header-menuItem ">
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

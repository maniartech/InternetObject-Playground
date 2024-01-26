import { useState, useRef, useEffect,  }             from 'react'
import                                                    './ButtonMenu.css'

interface DropDownMenuProps {
  icon: string;
  children?: any;
  OnClick?: () => void;
}

const ButtonMenu = (props:DropDownMenuProps) => {

  const { icon, children }                  = props
  const menuRef                             = useRef<HTMLDivElement>(null)

  const [showMenu, setShowMenu]             = useState(false)

  const handleOnClick = () => {
    setShowMenu(!showMenu)
    props.OnClick && props.OnClick()
  }

  const handleClose = () => {
    setShowMenu(false)
  }

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event:any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      handleClose()
    }
  }

  // Function to close the dropdown when 'Escape' key is pressed
  const handleKeyDown = (event:any) => {
    if (event.key === 'Escape') {
      handleClose()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <>
      <div className='buttonMenu'>
        <span
          className="material-symbols-outlined icon"
          onClick={handleOnClick}
          aria-haspopup="true"
          aria-expanded={showMenu}
          >
            {icon}
        </span>
        { showMenu &&
          <div
            ref={menuRef}
            className="menuContent fade-in"
            aria-labelledby="dropdown-menu"
            role="menu"
          >
            {children}
          </div>
        }
      </div>
    </>
  )
}

export default ButtonMenu
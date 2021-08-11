import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import Image from 'next/image'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import orcasoundlogo from '../images/orcasoundlogo.png'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Nav({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const openMenu = () => setIsOpen(!isOpen)
  return (
    <>
      <header className={navStyles.header}>
        <nav className={navStyles.navbar}>
          <Link href="/home">
            <a className={navStyles.navlogo}>
              <Image src={orcasoundlogo} width={90} height={70} />
            </a>
          </Link>
          <ul
            className={
              isOpen === false
                ? navStyles.navmenu
                : navStyles.navmenu + ' ' + navStyles.active
            }
          >
            <li className={navStyles.navitem}>
              <Link href="/about">
                <a
                  className={
                    isOpen === false
                      ? navStyles.navlink
                      : navStyles.navlink + ' ' + navStyles.active
                  }
                  onClick={openMenu}
                >
                  About
                </a>
              </Link>
            </li>
            <li className={navStyles.navitem}>
              <Link href="/learn">
                <a
                  className={
                    isOpen === false
                      ? navStyles.navlink
                      : navStyles.navlink + ' ' + navStyles.active
                  }
                  onClick={openMenu}
                >
                  learn
                </a>
              </Link>
            </li>

            <li className={navStyles.navitem}>
              <Link href="/getinvolved">
                <a
                  className={
                    isOpen === false
                      ? navStyles.navlink
                      : navStyles.navlink + ' ' + navStyles.active
                  }
                  onClick={openMenu}
                >
                  get involved
                </a>
              </Link>
            </li>

            <li className={navStyles.navitem}>
              <Link href="/https://live.orcasound.net/">
                <a
                  className={
                    isOpen === false
                      ? navStyles.navlink
                      : navStyles.navlink + ' ' + navStyles.active
                  }
                  onClick={openMenu}
                >
                  Listen
                </a>
              </Link>
            </li>
            <li className={navStyles.navitem}>
              <Link href="/">
                <Button
                  className={
                    isOpen === false
                      ? navStyles.navlink
                      : navStyles.navlink + ' ' + navStyles.active
                  }
                  onClick={openMenu}
                >
                  {' '}
                  Notify me{' '}
                </Button>
              </Link>
            </li>
          </ul>
          <button
            className={
              isOpen === false
                ? navStyles.hamburger
                : navStyles.hamburger + ' ' + navStyles.active
            }
            onClick={openMenu}
          >
            <span className={navStyles.bar}></span>
            <span className={navStyles.bar}></span>
            <span className={navStyles.bar}></span>
          </button>
        </nav>
      </header>
    </>
  )
}

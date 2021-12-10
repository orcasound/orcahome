import classNames from 'classnames'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import footerStyles from '../styles/Footer.module.css'

;<style></style>
export const NavLink = (props) => {
  const className = classNames({
    'nav-link': true,
    'is-active': props.pathname,
  })
  return (
    <Link href={props.path}>
      <a className={className}>{props.label}</a>
    </Link>
  )
}

const Header = ({ router: { pathname } }) => (
  <div className={footerStyles.footer}>
    <header className={footerStyles.foot}>
      <Nav
        className="justify-content-end"
        defaultActiveKey="/home"
        as="ul"
        bg="dark"
        expand="lg"
      >
        <Nav.Item as="li">
          <Nav.Link href="/donate">Donate</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
            <a href="#" className="fa fa-facebook">
              {' '}
            </a>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
            {' '}
            <a href="#" className="fa fa-instagram">
              {' '}
            </a>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
            <a href="#" className="fa fa-linkedin"></a>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
            {' '}
            <a href="#" className="fa fa-youtube"></a>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
            <a href="#" className="fa fa-reddit"></a>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
            {' '}
            <a href="#" className="fa fa-twitter"></a>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">
            {' '}
            <a href="#" className="fa-solid fa-bell"></a>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  </div>
)

export default withRouter(Header)

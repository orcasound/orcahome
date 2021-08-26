
import Button from 'react-bootstrap/Button'
import Image from 'next/image'
import orcasoundlogo from '../images/orcasoundlogo.png'
import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import { withRouter } from 'next/router'
import classNames from 'classnames'

import { Container, Navbar, Nav , NavDropdown} from 'react-bootstrap'

<style>

</style>
export const NavLink = (props) => {

  let className = classNames({
    "nav-link": true,
    "is-active": props.pathname
  })
  return <Link href={props.path}><a className={className}>{props.label}</a></Link>


}

const Header = ({ router: { pathname } }) => (
  <div >
  <header className={navStyles.navigation}>
  
 <div>
 

  <Navbar  variant="dark"   bg="dark"  expand="lg"  fixed="top">
  
  <Navbar.Brand href="/" > <Image passhref src={orcasoundlogo} width={90} height={50} path="/"  /> </Navbar.Brand>
    <Navbar.Toggle  className="justify-content-end" aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
      <NavLink className="justify-content-end" path="/about" label="About Us" pathname/>
              <NavLink  className="justify-content-end"  path="/learn" label="Learn" pathname/>
              <NavLink  className="justify-content-end" path="/getinvolved" label="Get Involved" pathname/>
           <NavLink className="justify-content-end" path='/http://live.orcasound.net/' label="Listen" pathname/> 
              
      </Nav>
      <Button className="justify-content-end">Notify Me</Button>
    </Navbar.Collapse>
 
</Navbar>
</div>

   
  </header>
  </div>
)

export default withRouter(Header)

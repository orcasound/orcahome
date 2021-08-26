
import footerStyles from '../styles/Footer.module.css'
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

const Footer = ({ router: { pathname } }) => (
  <div className={footerStyles.footer}>
  <footer className={footerStyles.foot}>
  
 
  <Nav className="justify-content-end" defaultActiveKey="/home" as="ul"  bg="dark" expand="lg">
  <Nav.Item as="li">
    <Nav.Link href="/donate">Donate</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link eventKey="link-1"><a href="#" class='fa fa-facebook'> </a></Nav.Link>
  </Nav.Item>

  <Nav.Item as="li">
    <Nav.Link eventKey="link-1">  <a href="#" class="fa fa-instagram"> </a></Nav.Link>
  </Nav.Item>

  <Nav.Item as="li">
    <Nav.Link eventKey="link-1"> 
  <a href="#" class="fa fa-linkedin"></a></Nav.Link>
  </Nav.Item>


  <Nav.Item as="li">
    <Nav.Link eventKey="link-1">  <a href="#" class="fa fa-youtube"></a></Nav.Link>
  </Nav.Item>


  <Nav.Item as="li">
    <Nav.Link eventKey="link-1">  
  <a href="#" class="fa fa-reddit"></a></Nav.Link>
  </Nav.Item>

  <Nav.Item as="li">
    <Nav.Link eventKey="link-1">   <a href="#" class="fa fa-twitter"></a>
 </Nav.Link>
  </Nav.Item>


  <Nav.Item as="li">
    <Nav.Link eventKey="link-1">   <a href="#" class="fa-solid fa-bell"></a>
 </Nav.Link>
  </Nav.Item>





</Nav>

       
   
  </footer>
  </div>
)

export default withRouter(Footer)

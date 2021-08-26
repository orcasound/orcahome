import Navbar from 'react-bootstrap/Navbar'

import styles from '../styles/Layout.module.css'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
     <Nav />
  
      <main>{children}</main>
     <Footer />
    </>
  )
}

export default Layout

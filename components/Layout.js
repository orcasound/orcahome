import {Navbar, Container }from 'react-bootstrap/Navbar'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
  
      <main>{children}</main>
     <Footer />
    </>
  )
}

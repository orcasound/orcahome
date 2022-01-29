import Navbar from 'react-bootstrap/Navbar'

import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Nav />

      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout

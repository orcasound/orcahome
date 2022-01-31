import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Nav from './Nav'

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

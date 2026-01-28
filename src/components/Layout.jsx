import { Box } from '@mui/material'

import Footer from './Footer'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  )
}

export default Layout

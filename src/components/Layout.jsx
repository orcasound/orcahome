import { Box } from '@mui/material'

import Footer from './Footer'
import Nav from './Nav'

const Layout = ({ children, siteChrome }) => {
  return (
    <>
      <Nav nav={siteChrome?.nav} />
      <Box component="main">{children}</Box>
      <Footer footer={siteChrome?.footer} />
    </>
  )
}

export default Layout

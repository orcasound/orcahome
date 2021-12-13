import '../styles/globals.css'

import Layout from '../components/Layout'
const elements = ['Learn More', 'Get Involved']

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export { elements }
export default MyApp

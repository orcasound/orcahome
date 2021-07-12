import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import orcas from '../images/srkw2-10.jpg'
import getinvolvedStyles from  '../styles/getinvolved.module.css'

export const getinvolved = () => {
    return (
        <div classname={getinvolvedStyles.getinvolved}>
        <Head>
<title>Orcasound</title>
        </Head>
    <body>
    <Image 
       className={getinvolvedStyles.landingImage}
       src={orcas}
       width={1400}
       height={600}/>
    <h1 className={getinvolvedStyles.p1}>Get involved</h1>
      <p className={getinvolvedStyles.p2}>There is many ways you can help in the recovery of marine life <br></br>
      , especially for the Souther Resident Killer Whales that call the Salish Sea Home. 
      <br></br>Check out the ways you can help below!</p>
      </body>
        </div>
    )
}

export default getinvolved

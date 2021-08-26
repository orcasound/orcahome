import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import orcas from '../images/srkw2-10.jpg'
import indexStyles from '../styles/Index.module.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardColumns from 'react-bootstrap/CardColumns';


export const index =() =>{
  return (
    <>
    <Head>
      <title>Orcasound liste live for orcas</title>
      <meta name ='keywords' content='orcasound allows your to listen to live southern killer resident whales live through our hydrophones'/>
      <link rel="icon" href="/favicon.ico" />
      <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"></link>
  


    </Head>
  
    <div className={indexStyles.home}>
     <Head>
     <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
     </Head>
     <body>
       <Image 
       className={indexStyles.landingImage}
       src={orcas}
       width={1400}
       height={600}/>
  
  <h2 className={indexStyles.landingText}> Listen to Orcas Live</h2>
  <br></br>
  <h2 className={indexStyles.landingIntro}> What is Orcasound</h2>
  <br></br>
  
  <p className={indexStyles.paragraph}> Orcasound Connets your Headphones to live  hydrophones (underwater microphones),
  your ears to the ocean sound. <br></br> 
  Orcasound helps us explore and conserve marine life around the globe.Starting with studying and saving
  the Southern Resident of the Pacific Northwest. <br></br>
  At Orcasound you can listen for whales or learn more about marine bioacustics.
  </p>
  
  <div className={indexStyles.card}>
  
  
 <CardColumns>
  <Card>
    <Card.Img variant="top" src="https://i2.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2020/10/Screen-Shot-2020-10-20-at-1.40.28-PM.png?resize=660%2C725&ssl=1" />
    <Card.Body>
      

  
    </Card.Body>
  </Card>
  <Card>
 
  
  
    <Card.Body>
      <Card.Title> Hydrophone Location</Card.Title>
      <br></br>
      <Card.Text>Orcasound is a cooperative hydrophne network and an open-source software & hardware project. 
          <br></br>
          <br></br>
          We Welcome your participation. If you'd like to host a hydrophone,
  do research or incorporate Orcasound into the educational or research efforts of your organization , 
        you can join us as a member of the network.
        <br></br>
      </Card.Text>
      <div className={indexStyles.button}>
      <br></br>
 
<Button variant="outline-primary"> LEARN</Button>{' '}

  <Button variant="outline-primary"> GET INVOLVED!</Button>{' '} 
  
</div>
    </Card.Body>
  </Card>
  
  
  
</CardColumns>

</div>
  
  
  </body>
  


    </div>
    


  </>
  
  );


  
}

export default index


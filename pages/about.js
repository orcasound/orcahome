import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import orca from '../images/orca2.png'
import aboutStyles from '../styles/About.module.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardColumns from 'react-bootstrap/CardColumns'


export const About = () => {
    return (
        <div className={aboutStyles.about}>
        <Head>
<title>Orcasound</title>
        </Head>
    <body>

    <Image 
     className={aboutStyles.landingImage}
      src={orca} 
      width={1400}
      height={500}
    />
      <h2 className={aboutStyles.landingText}> What is Orcasound</h2>

      <p className={aboutStyles.landingPa}>Orcasound is a software & hardware Web app to <br></br>
      listen to whales, save orcas and advance <br></br>
      bioacustics(AI Technology)</p>

<p className={aboutStyles.introduction}> Orcasound is a coperative effort of many dedicated individuals and great organizations.Here are our recent
projects-- created by volunteers,stewards,citizens,scientist,hackers and generous funders-- all working together for the orcas </p>

<h2 className={aboutStyles.projects}>Our Projects</h2>
<div className={aboutStyles.card}>

<CardColumns>
  <Card>
    <Card.Img variant="top" src="data:image/jpeg;base64,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" />
    <Card.Body>
      <Card.Title>Orcasound App</Card.Title>
  
    </Card.Body>
  </Card>
  <Card>
 
    <Card.Img variant="top"  src="https://i0.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2018/09/Screenshot-2018-09-17-11.30.49.png?resize=651%2C397"/>
  
    <Card.Body>
      <Card.Title>Port Townsend Hydrophone</Card.Title>
     
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i0.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2018/09/Screenshot-2018-09-17-11.30.49.png?resize=651%2C397" />
    <Card.Body>
      <Card.Title >Bush Point Hydrophone</Card.Title>
      
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://www.orcasound.net/wp2017/wp-content/uploads/2018/05/Listening-Booth-background1-EDITED-1920x1080.jpg" />
    <Card.Body>
      <Card.Title>Ocean Listening Exhibit</Card.Title>
     
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i0.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2021/06/Screen-Shot-2021-06-07-at-2.35.52-PM.png?fit=1200%2C1053&ssl=1&resize=350%2C200" />
    <Card.Body>
      <Card.Title>Google Summer of Code</Card.Title>
    
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i2.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2020/05/onc-audacity-7July-labels.png?fit=1200%2C710&ssl=1&resize=350%2C200" />
    <Card.Body>
      <Card.Title>AI for Orcas:Open Bioacoustics Data Science </Card.Title>
     
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i0.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2018/11/J1-ship.jpg?resize=780%2C520" />
    <Card.Body>
      <Card.Title> 2017 Orca Behavior Study</Card.Title>
     
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i2.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2018/10/image-hires.jpg?fit=1200%2C898&ssl=1&resize=350%2C200" />
    <Card.Body>
      <Card.Title>Orcasound Lab Hydrophone</Card.Title>
  
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://i1.wp.com/www.orcasound.net/wp2017/wp-content/uploads/2017/08/orca-ships-1.jpg?fit=1200%2C800&ssl=1&resize=350%2C200" />
    <Card.Body>
      <Card.Title>Salish Sea Vessel Research</Card.Title>
     
    </Card.Body>
  </Card>
</CardColumns>



</div>
<h2 className={aboutStyles.particiation}><strong>We Welcome Your Participation</strong></h2>
<p className={aboutStyles.join}>You can join us anytime as a volunteer to our open-source
software & hardware projects.
<br></br>
<br></br>
If you'd like to host a hydrophone, do research, or incorporate Orcasound into the educational or outreach efforts of your organization,please reach out!
</p>
<div className={aboutStyles.button}>
<Button variant="outline-primary"> GET INVOLVED!</Button>{' '}
</div>
</body>
</div>

     
    )
}

export default About

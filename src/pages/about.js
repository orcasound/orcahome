import 'bootstrap/dist/css/bootstrap.min.css'

import Head from 'next/head'
import Image from 'next/image'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

import orca from '../../public/images/orca2.png'
import aboutStyles from '../styles/About.module.css'

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

        <p className={aboutStyles.landingPa}>
          Orcasound is a software & hardware Web app to <br></br>
          listen to whales, save orcas and advance <br></br>
          bioacustics(AI Technology)
        </p>

        <p className={aboutStyles.introduction}>
          Orcasound is a coperative effort of many dedicated individuals and
          great organizations.Here are our recent projects-- created by
          volunteers,stewards,citizens,scientist,hackers and generous funders--
          all working together for the orcas
        </p>

        <h2 className={aboutStyles.projects}>Our Projects</h2>
        <div className={aboutStyles.card}>
          <CardColumns>
            <Card>
              <Card.Img
                variant="top"
                src=" https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />
              <Card.Body>
                <Card.Title>Orcasound App</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />

              <Card.Body>
                <Card.Title>Port Townsend Hydrophone</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />
              <Card.Body>
                <Card.Title>Bush Point Hydrophone</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />
              <Card.Body>
                <Card.Title>Ocean Listening Exhibit</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />
              <Card.Body>
                <Card.Title>Google summer of code</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />
              <Card.Body>
                <Card.Title>Blog</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />
              <Card.Body>
                <Card.Title> 2017 Orca Behavior Study</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />
              <Card.Body>
                <Card.Title>Sailish Sea Vessel Research</Card.Title>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/01/shutterstock_554899423-1-1280x720.jpg"
              />
              <Card.Body>
                <Card.Title>Salish Sea Vessel Research</Card.Title>
              </Card.Body>
            </Card>
          </CardColumns>
        </div>
        <h2 className={aboutStyles.particiation}>
          <strong>We Welcome Your Participation</strong>
        </h2>
        <p className={aboutStyles.join}>
          You can join us anytime as a volunteer to our open-source software &
          hardware projects.
          <br></br>
          <br></br>
          If you'd like to host a hydrophone, do research, or incorporate
          Orcasound into the educational or outreach efforts of your
          organization,please reach out!
        </p>
        <div className={aboutStyles.button}>
          <Button variant="outline-primary"> GET INVOLVED!</Button>
        </div>
      </body>
    </div>
  )
}

export default About

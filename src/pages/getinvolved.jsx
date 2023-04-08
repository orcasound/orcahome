import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Link as ScrollElement } from 'react-scroll'

import logo9 from '../../public/images/getinvolved/Beam-Reach.svg'
import logo3 from '../../public/images/getinvolved/CC.svg'
import logo7 from '../../public/images/getinvolved/cetacean-research-technology.svg'
import logo12 from '../../public/images/getinvolved/CWR.svg'
import logo11 from '../../public/images/getinvolved/deep-green-wilderness.svg'
import logo10 from '../../public/images/getinvolved/folks.png'
import hackathon from '../../public/images/getinvolved/hackathon.png'
import hydrophonestand from '../../public/images/getinvolved/hydrophone-stand.png'
import livediy from '../../public/images/getinvolved/live-diy.png'
import lonhydrophone from '../../public/images/getinvolved/lon-hydrophone.png'
import logo13 from '../../public/images/getinvolved/MSC.svg'
import logo1 from '../../public/images/getinvolved/oceans-initiative.svg'
import logo5 from '../../public/images/getinvolved/orca-behavior-institute.svg'
import logo6 from '../../public/images/getinvolved/Orca-Network.svg'
import logo8 from '../../public/images/getinvolved/Pacmam.svg'
import roadmap from '../../public/images/getinvolved/roadmap.png'
import topbanner from '../../public/images/getinvolved/srkw2-25.jpg'
import logo4 from '../../public/images/getinvolved/twt.png'
import valhacking from '../../public/images/getinvolved/val-hacking.png'
import logo2 from '../../public/images/getinvolved/whale-scout.svg'
import TechStackList from '../components/GetInvolved/TechStackList'
import TopBanner from '../components/TopBanner'
import getinvolvedStyles from '../styles/getinvolved.module.css'
import ActionButton from './../components/ActionButton'

export const GetInvolved = () => {
  const ScrollLink = styled(ScrollElement)({
    fontSize: '20px',
    color: '#1b2b7b',
    cursor: 'pointer',
    '&:hover': {
      color: '#080d26',
    },
  })

  const InviteLinks = [
    { name: 'Volunteer', id: 'volunteer' },
    { name: 'For Developers', id: 'for_developers' },
    { name: 'Donate', id: 'donate' },
  ]

  return (
    <div>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={topbanner}
        scrollToId={`scroll-link`}
        pageTitle={`Get Involved`}
        pageDesc={`There are many ways to help in the recovering of marine life,
          especially for the Souther Resident Killer Whales that call the
          Salish Sea home. Check out the ways you can help below!`}
      />

      <Box
        id="scroll-link"
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        {InviteLinks.map((link, i) => (
          <ScrollLink key={i} to={link.id} smooth={true} spy={true}>
            {link.name}
          </ScrollLink>
        ))}
      </Box>

      <Box
        id="volunteer"
        sx={{
          margin: '15px 25px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '500' }}>
          Volunteer
        </Typography>
        <Box
          sx={(theme) => ({
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
            },
            marginTop: '30px',
          })}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                marginBottom: '20px',
              },
            })}
          >
            <Typography variant="h5" sx={{ marginBottom: '10px' }}>
              Citizen Scientist
            </Typography>
            <Typography variant="body1">
              {`First and foremost, you can volunteer as a citizen scientist. 
              Not only can you listen for whales to marvel at the symphony of sounds they make, 
              but also you can listen *for* whales — helping to monitor their habitat 
              and notifying the network when you hear them or a noise that could endanger them.`}
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up('sm')]: {
                paddingLeft: '2vw',
              },
            })}
          >
            <Typography variant="h5" sx={{ marginBottom: '10px' }}>
              In Person
            </Typography>
            <Typography variant="body1">
              {`You can also volunteer in-person with any of the current Orcasound network members, 
              or with a new organization in your neighborhood that you convince to become a new member. 
              Volunteer opportunities can include helping deploy or fix hydrophones, teaching groups how to “listen for whales,” 
              or helping create a new educational or outreach project.`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gridGap: '20px',
            [theme.breakpoints.down('sm')]: {
              gridTemplateColumns: '100%',
            },
            margin: '50px 0 30px',
          })}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '100%',
              gridGap: '20px',
            }}
          >
            <Image alt="Val hacking node code." src={valhacking} />
            <Image alt="Binaural hydrophone stand." src={hydrophonestand} />
          </Box>
          <Image alt="Lon does hydrophone wizardly!" src={lonhydrophone} />
          <Image alt="The live-streaming DIY solution." src={livediy} />
        </Box>
        <Typography variant="body1">
          {`Volunteers are currently helping Orcasound take huge strides forward. 
          Orca Network volunteers recently deployed a new hydrophone node at Bush Point 
          and built an amazing ocean listening exhibit in Langley out of an antique telephone booth. 
          At the Port Townsend Marine Science Center, volunteers are refurbishing hydrophones 
          and installing new computer equipment to bring their node back online. 
          At educational nodes, volunteers teach the public about acoustic ecology 
          and ocean noise pollution using Orcasound recordings, live audio, and other data products.`}
        </Typography>
      </Box>

      <Box
        id="for_developers"
        sx={{
          margin: '50px 25px 20px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '500' }}>
          For Developers
        </Typography>
        <Typography variant="body1" sx={{ margin: '30px 0 50px' }}>
          {`A growing team of volunteer developers and talented consultants are building and improving Orcasound. 
          Some are developing the open-source software that captures and conveys ocean sounds. 
          Others are pioneering the DIY, low-cost hydrophone and computer hardware 
          that allows humans to listen to marine soundscapes in more and more places.`}
        </Typography>
        <Box>
          <Typography
            variant="h6"
            sx={{
              margin: '20px 0',
              textAlign: 'center',
            }}
          >
            OrcaSound Web App
          </Typography>
          <Box sx={{ maxWidth: '600px', margin: 'auto' }}>
            <Image
              alt="Democracy Lab Hackathon"
              src={hackathon}
              layout="responsive"
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              margin: '20px 0',
              textAlign: 'center',
            }}
          >
            Democracy Lab Hackathon
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ margin: '50px 0 0px' }}>
          {`Our crowning jewel is the Orcasound web app — a suite of new cloud- and browser-based ways 
          for citizen scientists and artificial intelligence to listen for whales in real-time. 
          As of April, 2020, this is the Orcasound tech stack:`}
        </Typography>
        <TechStackList />
      </Box>

      <div className={getinvolvedStyles.wrapper}>
        <Image
          className={getinvolvedStyles.hackathon}
          src={roadmap}
          alt="Current Roadmap"
        />
        <br></br>
      </div>
      <p className={getinvolvedStyles.textroadmap}>
        {`If you're based in the Pacific Northwest you can work with Orcasound
        in-person at a hackathon (see the Orcasound projects at democracy lab)
        No matter where you are, you can join Orcasound Slack, check out our
        Github repository and Trello boards, subscribe to the Orcasound dev
        email distribution list, and finish a place to contribute your
        talents. We hope you will share your expertise and innovations with
        us, and maybe even earn your way into the Orcasound HacHacker hall of
        Fame`}
      </p>
      <Link href="/learn">
        <div className={getinvolvedStyles.button}>
          <ActionButton link="" text="LEARN MORE ABOUT VOLUNTEERING!" />
        </div>
      </Link>
      <h2 className={getinvolvedStyles.memorandum}>Memorandum Of Agreements</h2>
      <p className={getinvolvedStyles.textmemorandum}>
        {`The real time audio streams, citizen science projects, educational
        material and outreach projects of Orcasound are brought to you by the
        current network member, listed below who have e-signed the 2016-2020
        Memorandum of Agreements(MOA)Any organization or individual is welcome
        to join the network(for free!)either as the host of an hydrophone
        node, a researcher or citizen scientist an educator/activist or
        general volunteer.`}
        <br></br>
        {`If you are an individual wanting to volunteer , collaborate or donate,
        check out the many ways you can support Orcasound.Everyone can listen
        for whales, and learn the diverse sounds of Salish Sea.`}
        <br></br>
        {`If you are an organization wanting to join the network as the host of
        a new hydrophone node, an educational/outreacg node, or both -- just
        read the history, mission and vision of the netowrk e-sign the MOA and
        then email info@orcasound.net to begin collaborating.There are no
        membership fees-- just benefits roles and responsibilities.`}
      </p>
      <h2 className={getinvolvedStyles.donate} id="donate">
        {' '}
        Donate
      </h2>
      <p className={getinvolvedStyles.donatetext}>
        {`Help us and our Orcasound network members by making charitable
        contribution to our partners, many of whom are 501(c)3 organizations
        Check out the link below to help strengthen and grow our network,
        while supporting our on-going conservation, research, and educational
        efforts.`}
        <br></br>
        {`You can also directly support the many dedicated volunteers who help
        Orcasound keep running and improve over time. Take a look at our
        'Hacker hall of fame ' and our Github repositories and consider
        sponsoring the work of our most-dedicated contributors.`}
      </p>
      <div className={getinvolvedStyles.button}>
        <ActionButton link="/donate" text="DONATE NOW" />
      </div>
      <div className={getinvolvedStyles.logos}>
        <div className={getinvolvedStyles.logone}>
          <Link href="https://oceansinitiative.app.neoncrm.com/np/clients/oceansinitiative/donation.jsp">
            <Image src={logo1} alt="oceans-initiative" />
          </Link>
          <Link href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=7P57R2WS8MM8Q&source=url&ssrt=1680554908537">
            <Image src={logo2} alt="whale-scout" />
          </Link>
          <Image src={logo3} alt="Colorado College" />
          <Image src={logo4} alt="Whale Trail" />
          <Image src={logo5} alt="orca-behavior-institute" />
        </div>
        <div className={getinvolvedStyles.logtwo}>
          <Image src={logo6} alt="Orca Network" />
          <Image src={logo7} alt="CRT" />
          <Image src={logo8} alt="pacmam" />
          <Image src={logo9} alt="Beam Reach" />
          <Image src={logo10} alt="folks" />
        </div>
        <div className={getinvolvedStyles.logthree}>
          <Image src={logo11} alt="deep-green-wilderness" />
          <Image src={logo12} alt="CWR" />
          <Image src={logo13} alt="MSC" />
        </div>
      </div>

      <div className={getinvolvedStyles.logostab}>
        <Link href="https://oceansinitiative.app.neoncrm.com/np/clients/oceansinitiative/donation.jsp">
          <Image src={logo1} alt="oceans-initiative" />
        </Link>
        <Link href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=7P57R2WS8MM8Q&source=url&ssrt=1680554908537">
          <Image src={logo2} alt="whale-scout" />
        </Link>
        <Image src={logo3} alt="Colorado College" />
        <Image src={logo6} alt="Orca Network" />
        <Image src={logo7} alt="CRT" />
        <Image src={logo8} alt="pacmam" />
        <Image src={logo13} alt="MSC" />
        <Image src={logo4} alt="Whale Trail" />
        <Image src={logo11} alt="deep-green-wilderness" />
        <Image src={logo12} alt="CWR" />
        <Image src={logo5} alt="orca-behavior-institute" />
        <Image src={logo10} alt="folks" />
        <Image src={logo9} alt="Beam Reach" />
      </div>

      <div className={getinvolvedStyles.logosmobile}>
        <Link href="https://oceansinitiative.app.neoncrm.com/np/clients/oceansinitiative/donation.jsp">
          <Image src={logo1} alt="oceans-initiative" />
        </Link>
        <Image src={logo3} alt="Colorado College" />
        <Link href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=7P57R2WS8MM8Q&source=url&ssrt=1680554908537">
          <Image src={logo2} alt="whale-scout" />
        </Link>
        <Image src={logo7} alt="CRT" />
        <Image src={logo6} alt="Orca Network" />
        <Image src={logo4} alt="Whale Trail" />
        <Image src={logo9} alt="Beam Reach" />
        <Image src={logo11} alt="deep-green-wilderness" />
        <Image src={logo10} alt="folks" />
        <Image src={logo5} alt="orca-behavior-institute" />
        <Image src={logo13} alt="MSC" />
        <Image src={logo12} alt="CWR" />
        <Image src={logo8} alt="pacmam" />
      </div>
    </div>
  )
}

export default GetInvolved

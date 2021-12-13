import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ReactAudioPlayer from 'react-audio-player'

import frequency1 from '../images/frequency2.png'
import orca from '../images/orca2.png'
import organization1 from '../images/partner1.png'
import organization2 from '../images/partner2.png'
import roundorca from '../images/roundorca.png'
import salishsea from '../images/salishsea.png'
import audio from '../public/frequency.mp3'
import orcasound from '../public/frequency.mp3'
import learnStyles from '../styles/Learn.module.css'


export const learn = () => {
  return (
    <div className={learnStyles.learn}>
      <Head>
        <title>Orcasound</title>
      </Head>

      <body>
        <Image
          className={learnStyles.img}
          src={orca}
          width={1400}
          height={500}
        />

        <h2 className={learnStyles.tex}>orcasound</h2>
        <ul className={learnStyles.hello}>
          <li>Sounds of the Salish Sea</li>
          <li>3 common calls</li>
          <li>Souther Resident Killer Whale Call Catalog</li>
          <li>Exhibits</li>
        </ul>
        <h1 className={learnStyles.salish}> Sounds Of The Salish Sea</h1>
        <p className={learnStyles.salishsea}>
          Explore common sounds of the Salish Sea by selecting the animals and
          other objects in this anoramic soundscape of the inlandwaters of
          Washington State(USA) and British Columbia(Canada)
        </p>
        <div className={learnStyles.imageWrapper}>
          <Image
            className={learnStyles.salishseaimg}
            src={salishsea}
            width={800}
            height={450}
            layout="intrinsic"
            quality={65}
          />
        </div>
        <div className={learnStyles.orca}>
          <Image
            src={roundorca}
            width={400}
            height={350}
            layout="intrinsic"
            quality={65}
          />
        </div>
        <h2 className={learnStyles.calls}> 3 Common Calls</h2>
        <div>
          <div className={learnStyles.gallery}>
            <Image src={frequency1} />
            <h6>J pod's Favorite call:501</h6>
            <p>More description goes here</p>
            <div>
              <ReactAudioPlayer
                className={learnStyles.audio}
                src={audio}
                autoPlay={false}
                controls
              />
            </div>
          </div>

          <div className={learnStyles.image}>
            <Image src={frequency1} />
            <h6>K pod's Favorite call:516</h6>
            <p>More description goes here</p>
            <div>
              <ReactAudioPlayer
                className={learnStyles.audio}
                src={audio}
                autoPlay={false}
                controls
              />
            </div>
          </div>

          <div className={learnStyles.gallery2}>
            <Image src={frequency1} />
            <h6>L pod's Favorite call:519</h6>
            <p>More description goes here</p>
            <div>
              <ReactAudioPlayer
                className={learnStyles.audio}
                src={audio}
                autoPlay={false}
                controls
                alt="l pod favorite call"
              />
            </div>
          </div>
        </div>
        <div className={learnStyles.property}>
          <h2 className={learnStyles.exhibits}>Exhibits</h2>
          <p className={learnStyles.exhibit}>
            Learn About the Marine acoustic landscape and the hydrophone network{' '}
            <br></br>by exploring these Orcasound Exhibit screens designed for
            educational organizations in the Pudget Sound regions
          </p>
        </div>
        <div className={learnStyles.org}>
          <Image src={organization1} alt="Seattle aquarium exhibit" />
          <a href="https://killerwhaletales.org/">
            <Image src={organization2} alt="Marine Science Center Logo" />{' '}
          </a>
        </div>
      </body>
    </div>
  )
}

export default learn

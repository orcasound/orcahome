import styles from '../../styles/DonatePartners.module.css'

const partners = [
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'The Center for Whale Research',
    description:
      "The Center for Whale Research helps the U.S. and Canadian governments with conservation and share whales'stories with the public.",
    linkTo: 'https://www.whaleresearch.com/supportcwr',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'Deep Green Wilderness',
    description:
      'Deep Green Wilderness provides public educational experiences to create ambassadors for marine animals and ecosystems.',
    linkTo: 'https://www.deepgreenwilderness.com/donate',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'F.O.L.K.S',
    description:
      "F.O.L.K.S. provides visitors with education on the Salish Sea's diverse marine ecosystem.",
    linkTo: 'https://folkssji.org/donate/',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'Orca Behaviour Institute  ',
    description:
      'Orca Behavior Institute conducts non-invasive research on orcas and helps others learn how to protect these animals.',
    linkTo: 'https://orcabehaviorinstitute.org/',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'Orca Conservancy',
    description:
      'Orca Conservancy aims to preserve and protect Southern Resident killer whales.',
    linkTo: 'https://www.orcaconservancy.org/donate',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'Orca Network',
    description:
      'Orca Network provides education and a sighting report system on whales. You can volunteer and learn more at their Langley Whale Center.',
    linkTo: 'https://www.orcanetwork.org/donate',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'Port Townsend Marine Science Center',
    description:
      'Port Townsend Marine Science Center offers education, science, and volunteer opportunities on the Salish Sea.',
    linkTo: 'https://ptmsc.org/get-involved/donate',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'Project SeaWolf',
    description:
      'Project SeaWolf works to promote and protect the biodiversity of the Pacific Northwest.',
    linkTo: 'https://www.projectseawolf.org/projectseawolforg/How_to_Help.html',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'Sound Action',
    description:
      'Sound Action is a watchdog group that ensures new developments in Washington state that may affect orcas and their habitats adhere to science and state law.',
    linkTo: 'https://soundaction.org/',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'Vashon Nature Center',
    description:
      'Vashon Nature Center helps volunteers conduct research on the plants and animals of the Vashon-Maury Islands and the Salish Sea.',
    linkTo: 'https://vashonnaturecenter.org/donate/',
  },
  {
    icon: '/images/getinvolved/deepgreen.png',
    name: 'The Whale Trail ',
    description:
      'The Whale Trail idenfities orca migration paths along the Salish Sea and Pacific Coast.',
    linkTo: 'https://thewhaletrail.org/connect/donate/',
  },
]

const DonatePartners = () => {
  return (
    <>
      <div className={styles.titleContainer}>
        <div>Donate to our 501(c)3 partners</div>
        <div>
          Contribute to our partners to support on-going conservation, research,
          and education efforts.
        </div>
      </div>
      <div>
        {partners.map((partner, index) => (
          <div key={index} className={styles.container}>
            <img src={partner.icon} alt={partner.name} />
            <div>
              <div className={styles.header}>{partner.name}</div>
              <div>{partner.description}</div>
            </div>
            <div>
              <a
                href={partner.linkTo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DonatePartners

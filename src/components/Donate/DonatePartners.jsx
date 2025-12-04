import Image from 'next/image'

import styles from '../../styles/DonatePartners.module.css'

const partners = [
  {
    icon: '/images/donatePartners/center for whale research 1.svg',
    name: 'The Center for Whale Research',
    description:
      "The Center for Whale Research helps the U.S. and Canadian governments with conservation and share whales'stories with the public.",
    linkTo: 'https://www.whaleresearch.com/supportcwr',
  },
  {
    icon: '/images/donatePartners/DeepGreenWildernes.svg',
    name: 'Deep Green Wilderness',
    description:
      'Deep Green Wilderness provides public educational experiences to create ambassadors for marine animals and ecosystems.',
    linkTo: 'https://www.deepgreenwilderness.com/donate',
  },
  {
    icon: '/images/donatePartners/FOLKS-Orange.svg',
    name: 'F.O.L.K.S',
    description:
      "F.O.L.K.S. provides visitors with education on the Salish Sea's diverse marine ecosystem.",
    linkTo: 'https://folkssji.org/donate/',
  },
  {
    icon: '/images/donatePartners/orca-behavior-institute-logo-white.svg',
    name: 'Orca Behaviour Institute',
    description:
      'Orca Behavior Institute conducts non-invasive research on orcas and helps others learn how to protect these animals.',
    linkTo: 'https://orcabehaviorinstitute.org/',
  },
  {
    icon: '/images/donatePartners/OrcaConservancy.svg',
    name: 'Orca Conservancy',
    description:
      'Orca Conservancy aims to preserve and protect Southern Resident killer whales.',
    linkTo: 'https://www.orcaconservancy.org/donate',
  },
  {
    icon: '/images/donatePartners/Orca-Network-Logo.svg',
    name: 'Orca Network',
    description:
      'Orca Network provides education and a sighting report system on whales. You can volunteer and learn more at their Langley Whale Center.',
    linkTo: 'https://www.orcanetwork.org/donate',
  },
  {
    icon: '/images/donatePartners/port townsend marine research center.svg',
    name: 'Port Townsend Marine Science Center',
    description:
      'Port Townsend Marine Science Center offers education, science, and volunteer opportunities on the Salish Sea.',
    linkTo: 'https://ptmsc.org/get-involved/donate',
  },
  {
    icon: '/images/donatePartners/Rectangle 887.svg',
    name: 'Project SeaWolf',
    description:
      'Project SeaWolf works to promote and protect the biodiversity of the Pacific Northwest.',
    linkTo: 'https://www.projectseawolf.org/projectseawolforg/How_to_Help.html',
  },
  {
    icon: '/images/donatePartners/Sounds Action.svg',
    name: 'Sound Action',
    description:
      'Sound Action is a watchdog group that ensures new developments in Washington state that may affect orcas and their habitats adhere to science and state law.',
    linkTo: 'https://soundaction.org/',
  },
  {
    icon: '/images/donatePartners/vashonNatureCenterLogo.svg',
    name: 'Vashon Nature Center',
    description:
      'Vashon Nature Center helps volunteers conduct research on the plants and animals of the Vashon-Maury Islands and the Salish Sea.',
    linkTo: 'https://vashonnaturecenter.org/donate/',
  },
  {
    icon: '/images/donatePartners/TheWhaleTrail-LogoSpyhop_RGB.svg',
    name: 'The Whale Trail ',
    description:
      'The Whale Trail identifies orca migration paths along the Salish Sea and Pacific Coast.',
    linkTo: 'https://thewhaletrail.org/connect/donate/',
  },
]

const DonatePartners = () => {
  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Donate to our 501(c)3 Partners</div>
        <div className={styles.titleDescription}>
          Contribute to our partners to support on-going conservation, research,
          and education efforts.
        </div>
      </div>
      <div>
        {/* mobile */}
        {partners.map((partner, index) => (
          <div key={index} className={styles.mobileContainer}>
            <div className={styles.mobilePartner}>
              <Image
                width={100}
                height={100}
                src={partner.icon}
                alt={partner.name}
              />
              <div className={styles.mobileHeader}>{partner.name}</div>
            </div>
            <div>
              <div className={styles.mobileDescription}>
                {partner.description}
              </div>
              <div className={styles.mobileLink}>
                <a
                  href={partner.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.underlineText}>Learn more</span>{' '}
                  &gt;&gt;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Tablet & Laptop */}
      <div>
        {partners.map((partner, index) => (
          <div key={index} className={styles.container}>
            <Image
              width={100}
              height={100}
              src={partner.icon}
              alt={partner.name}
            />
            <div className={styles.partnersContainer}>
              <div className={styles.partnersDetails}>
                <div className={styles.header}>{partner.name}</div>
                <div className={styles.description}>{partner.description}</div>
              </div>
              <div className={styles.link}>
                <a
                  href={partner.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.underlineText}>Learn more</span>{' '}
                  &gt;&gt;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DonatePartners

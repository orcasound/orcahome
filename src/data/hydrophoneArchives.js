// Content of the old orcasound.net/lk and /nb hydrophone pages (#466 group 4),
// rebuilt on this site. The text is the original page copy; the live streams
// have ended, so the "Listen live" links are gone.
//
// The recordings still play from the old server. When #461 moves the old
// audio files to S3, change AUDIO_BASE_URL and nothing else.
export const AUDIO_BASE_URL = 'https://www.orcasound.net/mp3s/'

export const HYDROPHONE_ARCHIVES = {
  lk: {
    title: 'Sounds from Lime Kiln State Park',
    description:
      'Archived recordings from the Lime Kiln hydrophone on San Juan Island, 2007 to 2012, including J, K and L pod calls.',
    image: '/images/hydrophone-archive/lk-lighthouse.jpg',
    imageWidth: 458,
    imageHeight: 343,
    imageAlt: 'The Lime Kiln lighthouse on the rocky shore of San Juan Island',
    paragraphs: [
      [
        'The hydrophone node at Lime Kiln State Park is located just southwest of the Lighthouse in about 7 meters of water. There is a long history of hydrophone deployments, repairs (after winter storm damage), and acoustic research at the Lighthouse. We thank Lime Kiln State Park for hosting the long-term research efforts of ',
        { text: 'the Whale Museum', href: 'https://whalemuseum.org/' },
        ' and the Washington State Department of Wildlife for supplemental funding to repair storm damage in winter, 2007.',
      ],
      [
        'As of March, 2016, the stereo streaming system is maintained through a partnership between The Whale Museum and SMRU, led by Dr. Jason Wood.',
      ],
      [
        'From 2007-2016, a dual-hydrophone system provided a live stream and archived time series of mean broadband and spectrum levels. The hydrophones were wired up by Val Veirs and attached to existing moorings during an initial SCUBA dive by David Howitt and Scott Veirs. Custom software written in Visual Basic by Val Veirs assesses average underwater sound levels and automatically detects "unusual" sounds. The stream was distributed by spacialnet.com for $23-30/month, paid for first through a NOAA grant to TWM and Beam Reach, and subsequently (2011-2016) by ',
        { text: 'Beam Reach', href: 'http://beamreach.org/' },
        '.',
      ],
    ],
    archiveHeading: 'Archived sounds from Lime Kiln',
    // The "exceptional recordings" table of the old page.
    highlights: [
      {
        file: 'lk/0705231708-limekiln-jpod.mp3',
        date: '05/23/07',
        time: '17:08',
        description:
          'A 2-minute mono clip of J pod calls and clicks (w/some ship noise). From a longer vocal period (16:40~17:45).',
      },
      {
        file: 'lk/0706011953-lk-j.mp3',
        date: '06/01/07',
        time: '19:53',
        description:
          'A 4.5-minute stereo clip of J pod calls and clicks, including an airplane and the sound of an orca surfacing. From a longer vocal period (19:45-20:23). [Warning -- this recording has low background noise and some sudden much louder sounds and concomitant distortion from the stream encoding].',
      },
      {
        file: 'lk/0706012021-lk-jclicks-shipclicks.mp3',
        date: '06/01/07',
        time: '20:21',
        description:
          'A 2-minute mono clip of J pod clicks and remarkably similar clicks from an approaching ship. The end of a longer vocal period (19:45-20:23). (The ship noise waned by ~20:35. Two faint calls were heard ~21:21. Another ship was approaching at 21:30.)',
      },
      {
        file: 'lk/0708232215-lk-jk-lynn_waller.mp3',
        date: '08/23/07',
        time: '22:15',
        description:
          'A 4-minute 16-second mono clip of southern residents (J+K+L?) recorded by Lynn Waller. She noticed increased vocal activity about 2-min 45-sec into recording. Other listeners reported calls at Lime Kiln at 21:25, 22:50 and 23:10, and at OrcaSound around 23:15 (with a harbor seal), suggesting they were spread out along much of the west side.',
      },
      {
        file: 'lk/080401_1305-1408_010404-lk-J.mp3',
        date: '04/01/08',
        time: '13:05',
        description:
          'A 1-hour 4-minute 4-second mono clip of southern residents J pod members containing calls, echolocation clicks, pebble splash sounds, and boat noise. The J16s were sighted about two hours earlier ~1km south of the hydrophone.',
      },
      {
        // The old page linked to "080625_1512-1514_...", which does not
        // exist on the server; this is the file with that description.
        file: 'lk/080625_1511-1513_000215_lk_loud-whistles-S1-S19_andy-good.mp3',
        date: '06/25/08',
        time: '22:15',
        description:
          'A 2-minute stereo clip of southern residents recorded by Andy Good of the UK. This recording contains a few very loud whistles, as well as S1 and S16 calls, that were made as the orcas traveled north past Lime Kiln.',
      },
    ],
    otherLinks: [
      {
        text: 'Lime Kiln Point State Park',
        href: 'https://parks.wa.gov/find-parks/state-parks/lime-kiln-point-state-park',
      },
    ],
    // Every recording in orcasound.net/mp3s/lk/, the old page's playlist.
    folder: 'lk',
    recordings: [
      { file: '00_best_yet-080625_lk.mp3', size: '792K' },
      { file: '0705231708-limekiln-jpod.mp3', size: '1.8M' },
      { file: '0705231708_lk-jpod.mp3', size: '1.8M' },
      { file: '070523_calls_clicks_at_end_lk.mp3', size: '4.1M' },
      { file: '070523_calls_clicks_lk.mp3', size: '4.8M' },
      { file: '070523_lk.mp3', size: '4.0M' },
      { file: '070523_lk_clicks.mp3', size: '1.3M' },
      { file: '070523_lk_minimal_calls.mp3', size: '2.5M' },
      { file: '070523_lk_super-calls.mp3', size: '5.6M' },
      { file: '0705241449-limekiln-kayaker.mp3', size: '1.0M' },
      { file: '0705241507-limekiln-loudboat.mp3', size: '672K' },
      { file: '0706011942-limekiln-jpod.mp3', size: '8.8M' },
      { file: '0706011953-lk-j+plane+surface.mp3', size: '4.1M' },
      { file: '0706011953-lk-j.mp3', size: '4.1M' },
      { file: '0706012003-lk-j-2calls.mp3', size: '249K' },
      { file: '0706012003-lk-j.mp3', size: '249K' },
      { file: '0706012021-lk-jclicks+shipclicks_orig.mp3', size: '11M' },
      { file: '0706012021-lk-jclicks-shipclicks.mp3', size: '2.8M' },
      { file: '0706012028-lk-shipclicks+lowfnoise.mp3', size: '1.6M' },
      { file: '0708232215-lk-jk-lynn_waller.mp3', size: '9.8M' },
      {
        file: '070830_1204-1243_003546_lk_calls-some-long-squeals.mp3',
        size: '6.1M',
      },
      { file: '0710051322_011018.mp3', size: '32M' },
      { file: '0710061740_015715-3podssouthboundwjami.mp3', size: '54M' },
      { file: '0710080226_010206-JpodS1Clicks.mp3', size: '28M' },
      { file: '0710080328_001527.mp3', size: '7.1M' },
      { file: '0710080347_003643-JKpod+squeakship.mp3', size: '17M' },
      { file: '0710200913-0935_002314-Jpod.mp3', size: '11M' },
      { file: '080401_1305-1408_010404-lk-J.mp3', size: '29M' },
      { file: '080401_1305-1408_010404_lk_J.mp3', size: '29M' },
      { file: '080509_1410-1438_002828_lk_J.mp3', size: '13M' },
      { file: '080509_1447-1517_002958_lk_J.mp3', size: '14M' },
      {
        file: '080523_1703-1715_001211_lk_loud-S1s-S2is-S3s-over-ship-noise.mp3',
        size: '5.6M',
      },
      {
        file: '080528_0834-0842_000742_lk_J-lots-of-clicks-few-calls.mp3',
        size: '3.5M',
      },
      {
        file: '080528_0908-0919_001147_lk_J-faint-whistles-calls.mp3',
        size: '1.0M',
      },
      { file: '080528_0934-1016_004306_lk_J_many-calls.mp3', size: '20M' },
      { file: '080528_1522-1534_001236_lk_J_loud_calls.mp3', size: '5.8M' },
      {
        file: '080528_1534-1603_002550_lk_J_22-orcas-calling.mp3',
        size: '12M',
      },
      {
        file: '080612_0900-0940_004000_lk_clicks+whistles+1s4.mp3',
        size: '14M',
      },
      {
        file: '080612_091930-092330_000400_lk_intense-buzzing+percussives.mp3',
        size: '1.4M',
      },
      {
        file: '080625_1511-1513_000215_lk_loud-whistles-S1-S19_andy-good.mp3',
        size: '792K',
      },
      {
        file: '080628_165300-172400_003132-lk-clicks-calf-calls-at-27min.mp3',
        size: '14M',
      },
      {
        file: '080628_171900-172300_000400-lk-calf-calls-extract.mp3',
        size: '1.1M',
      },
      { file: '080629_042900-043300_000353_lk_kayakers-.mp3', size: '1.8M' },
      {
        file: '080630_os_few-S2s-in-1st5min-clicks-waves-like-blows-quiet-last10min.mp3',
        size: '8.7M',
      },
      {
        file: '080702_153400-154500_001030_lk_many-K-pod-calls-then-ship.mp3',
        size: '4.8M',
      },
      { file: '080716_161200-161700_000500_lk_few-calls.mp3', size: '1.7M' },
      { file: '080716_163900-164500_000633_lk_clicks-calls.mp3', size: '1.1M' },
      { file: '080716_1703-1707_000454_lk_single-call.mp3', size: '864K' },
      { file: '080716_170300-170700_000454_lk_single-call.mp3', size: '864K' },
      {
        file: '080730_1148-1203_001558_lk_few-calls-clicks-at-start.mp3',
        size: '2.7M',
      },
      {
        file: '080731_2146-2203_001710_lk_dusk-S1-dualS2-S3-S10-calls.mp3',
        size: '5.9M',
      },
      {
        file: '080812_1320-1338_001823_lk_squeaks-calls-no-clicks-silence.mp3',
        size: '8.4M',
      },
      {
        file: '080815_1609-1611_000243_lk_harbor-seal-distant.mp3',
        size: '960K',
      },
      { file: '080826_1224-1235_001126_lk_S16-Nbound.mp3', size: '3.9M' },
      { file: '080826_1235-1243_000818_os_S4-S2-clicks.mp3', size: '416K' },
      { file: '080915_1344-1358_001421_lk_Lpod-southbound.mp3', size: '4.9M' },
      { file: '080915_1454-1504_001034_lk_distant-calls.mp3', size: '3.6M' },
      {
        file: '080918_1059-1308_020921_lk_JKL-Sbound-great-calls-clicks.mp3',
        size: '44M',
      },
      { file: '080924_1523-1607_004422_lk_JK-northbound.mp3', size: '15M' },
      {
        file: '080930_0951-0952_000124_lk_periodic-LP-scratch-mystery.mp3',
        size: '496K',
      },
      {
        file: '081001_1821-1913_005247_lk_long-call-sequence-slowly-fading.mp3',
        size: '18M',
      },
      {
        file: '081007_1700-1706_lk_S1-calls-whistles_susan-berta.mp3',
        size: '2.8M',
      },
      { file: '081007_1800-1801_000050_lk_calls-susan.mp3', size: '248K' },
      {
        file: '081008_1030-1032_000231_lk_ship-southbound-orcacam-jpg.mp3',
        size: '880K',
      },
      { file: '081010_1532-1533_000131_lk_vessel_shrieking.mp3', size: '536K' },
      { file: '081022_1714-1726_001226_lk_faint-calls-ship.mp3', size: '4.3M' },
      {
        file: '081023_1348-1424_003650_lk_Kpod-S16s-purse-seiners.mp3',
        size: '13M',
      },
      {
        file: '081024_1426-1456_003015_lk_transient-calls-jason-reefnet-boat.mp3',
        size: '10M',
      },
      { file: '081024_142602_lk_transient-call.mp3', size: '27K' },
      { file: '081024_142802_lk_transient-call.mp3', size: '24K' },
      { file: '081024_142815_lk_transient-call.mp3', size: '24K' },
      { file: '081024_142845_lk_transient-call.mp3', size: '29K' },
      { file: '081024_142930_lk_transient-call.mp3', size: '36K' },
      { file: '081024_143001_lk_transient-call.mp3', size: '32K' },
      {
        file: '081024_143038_lk_transient-call-or-reefnetter-winch.mp3',
        size: '24K',
      },
      { file: '081024_143038_lk_transient-call.mp3', size: '24K' },
      { file: '081024_143635_lk_reefnetter-screech.mp3', size: '245K' },
      { file: '081024_145402_lk_transient-call.mp3', size: '20K' },
      { file: '081024_145451_lk_transient-call.mp3', size: '26K' },
      { file: '081024_145517_lk_transient-call.mp3', size: '18K' },
      {
        file: '081024_1456-1525_002913_lk_transient-calls-and-extra.mp3',
        size: '10M',
      },
      {
        file: '081026_1225-1229_000004_lk_calls-distant-jette-hope.mp3.mp3',
        size: '1.6M',
      },
      {
        file: '081026_1247-1254_000700_lk_calls-distant-jette-hope.mp3.mp3',
        size: '2.6M',
      },
      {
        file: '081030_1133-11xx_000530_lk_S19s-some-gaps-eric-mcrae.mp3',
        size: '2.5M',
      },
      {
        file: '081030_1142-1213_003052_lk_S16-calls-ship-faint-calls.mp3',
        size: '11M',
      },
      {
        file: '081030_1234-1246_001300_lk_a-few-faint-calls.mp3',
        size: '4.5M',
      },
      { file: '081112_0900-0906_000626_lk_calls-eric-mcrae.mp3', size: '3.0M' },
      { file: '081112_0910-0922_001237_lk_calls-eric-mcrae.mp3', size: '5.8M' },
      {
        file: '081112_0926-0942_001610_lk_calls-best-at-0217in-eric-mcrae.mp3',
        size: '7.4M',
      },
      { file: '081112_0930-0949_001950_lk_calls-then-ship.mp3', size: '6.8M' },
      { file: '081112_0954-1047_005324_lk_calls-after-ship.mp3', size: '18M' },
      { file: '081125_0732-0733_0138_lk_one-faint-whistle.mp3', size: '576K' },
      {
        file: '081125_0802-0837_003509_lk_calls-whistles-fading-ship.mp3',
        size: '12M',
      },
      { file: '081125_0839-0915_003710_lk_calls-whistles.mp3', size: '13M' },
      { file: '081210_0021-0031_001036_lk_midnight-calls.mp3', size: '3.6M' },
      { file: '081210_0031-0102_003115_lk_clanging.mp3', size: '11M' },
      {
        file: '090207_0109-0110_000054_lk-whistles-JKL-Victoria-090206-1400.mp3',
        size: '318K',
      },
      {
        file: '090310_1736-1825_004933_lk_Jpod-ship-approaching.mp3',
        size: '17M',
      },
      { file: '090407_1910-1922_001116_lk_voice-sonar.mp3', size: '3.9M' },
      { file: '090407_2102-2107_000542_lk_voice-sonar.mp3', size: '2.0M' },
      { file: '090408_0411_lk_loud-sonar.mp3', size: '89K' },
      {
        file: '090805_0011-0021_000947_lk-many-S1s-great-calls.mp3',
        size: '3.4M',
      },
      { file: '090805_0022-0033_001136_lk-calls-fading.mp3', size: '4.0M' },
      {
        file: '090806_1319-1401_004219_lk-distant-calls-whistles-clicks.mp3',
        size: '15M',
      },
      {
        file: '090811_1300-1303_lk-transient-calls-from-susan.mp3',
        size: '1.7M',
      },
      { file: '090814_2300-2304_000412_lk_clear-calls.mp3', size: '1.4M' },
      { file: '090819_1201-1231_003024_lk_S1-S16-calls.mp3', size: '10M' },
      { file: '090820_1202-1254_005201_lk_S16-calls-clicks.mp3', size: '18M' },
      {
        file: '090913_1841-1905_002354_lk_great-calls-quiet-bkg.mp3',
        size: '8.2M',
      },
      {
        file: '090913_1905-1929_002354_lk_great-calls-quiet-bkg.mp3',
        size: '8.2M',
      },
      {
        file: '090914_1136-1227_005046_lk-faint-whistles-louder-calls.mp3',
        size: '17M',
      },
      { file: '091002_1238-1323_00451_lk_great-S16-calls.mp3', size: '15M' },
      {
        file: '091006_0953-1007_001426_lk_S16s-clicks-whistles.mp3',
        size: '5.0M',
      },
      { file: '091222_2103_lk-J-calls-by-jeanne-hyde.mp3', size: '1.0M' },
      { file: '09242014_0700_lk-humpback-maybe-jeanne-hyde.mp3', size: '159K' },
      { file: '100102_0118-0140_002218_lk_J-pod.mp3', size: '6.4M' },
      {
        file: '100118_1000-1003_000003_lk_transients-from-jeanne-hyde.mp3',
        size: '2.8M',
      },
      {
        file: '100126_1230-1256_002600_lk_repeated-S42s-laura-swan.mp3',
        size: '7.5M',
      },
      {
        file: '100126_1235-1311_003615_lk_repeated-S42-calls.mp3',
        size: '10M',
      },
      {
        file: '100127_1134-1134_000011_lk_6-S42-S40calls-laura-swan.mp3',
        size: '556K',
      },
      { file: '100310_1412-1431_0019_lk-transients.mp3', size: '5.4M' },
      // Left out: 100430_1533-1548_001500_lk-Js-after-8wks-jette-hope.mp3
      // (4.6M) is in the folder listing, but the server answers 403 for it
      // (checked 2026-11-16). Add it back once #461 moves the files.
      {
        file: '100527_0057-0203_010610_lk-J-pod-quiet-then-many-S1-S2.mp3',
        size: '19M',
      },
      {
        file: '100527_0124-4min-excerpt-J-pod-quiet-then-many-S1-S2.mp3',
        size: '1.4M',
      },
      { file: '100601_1707_lk.mp3', size: '14M' },
      { file: '100603_2005_lk.mp3', size: '23M' },
      { file: '100610_1256_lk-SRKW-calls.mp3', size: '21M' },
      { file: '100615_1732_lk.mp3', size: '10M' },
      { file: '100615_2022_lk.mp3', size: '10M' },
      { file: '100618_0756_lk-S1-S4-steady-clicks.mp3', size: '4.6M' },
      { file: '100618_0812-0850_003832_lk.mp3', size: '11M' },
      {
        file: '100618_2354-0025_003118_lk-S1-S2-S16-quiet-bkg.mp3',
        size: '9.0M',
      },
      { file: '100625_1019_lk.mp3', size: '13M' },
      { file: '100713_1212_lk.mp3', size: '1.0M' },
      {
        file: '100717_0001-0100_005824_lk-S2-S7-calls-clicks.mp3',
        size: '20M',
      },
      { file: '100813_2225_lk.mp3', size: '21M' },
      { file: '100813_2338_lk.mp3', size: '11M' },
      { file: '100916_2139_lk.mp3', size: '20M' },
      { file: '100921_1419_lk.mp3', size: '12M' },
      { file: '100923_1508_lk_repeatedS19s.mp3', size: '960K' },
      { file: '101007_1454_lk.mp3', size: '9.0M' },
      { file: '101009_1718_lk.mp3', size: '16M' },
      { file: '101102-1453_lk-lotsacalls.mp3', size: '4.1M' },
      { file: '101102-1453_lk-nearfar.mp3', size: '5.8M' },
      {
        file: '101226_1235-1311_003615_lk_repeated-S37-calls.mp3',
        size: '10M',
      },
      {
        file: '10915_1348-1417_002740_lk-SRKW-calls-clicks-south.mp3',
        size: '9.5M',
      },
      { file: '110306_1206_lk_Jpod.mp3', size: '4.2M' },
      { file: '110425_1248_lk-SRKW-calls.mp3', size: '17M' },
      { file: '110522_000630_lk-Jpod-calls.mp3', size: '31M' },
      { file: '110623_1602_lk-calls.mp3', size: '21M' },
      { file: '110712_1545_lk_S16s-buzzes.mp3', size: '6.4M' },
      { file: '110718_1122_lk-clicks-calls.mp3', size: '20M' },
      { file: '110718_1221_lk-clicks-calls.mp3', size: '8.0M' },
      { file: '110726_1314_lk.mp3', size: '8.4M' },
      { file: '110726_1438_lk.mp3', size: '28M' },
      { file: '110726_1717_lk.mp3', size: '15M' },
      {
        file: '110915_1028-1157_012543_lk_J-pod-clicks-calls.mp3',
        size: '29M',
      },
      { file: '111007_1300_lk_Jpod-north.mp3', size: '11M' },
      { file: '111007_1338_lk_Jpod-north.mp3', size: '12M' },
      { file: '111007_1414_lk_Jpod-north.mp3', size: '3.1M' },
      { file: '111007_1539_lk_Kpod-north.mp3', size: '7.6M' },
      { file: '111007_1601_lk_Kpod-north.mp3', size: '3.6M' },
      { file: '111008_1453_lk_srkw-north.mp3', size: '15M' },
      { file: '111012_1126_lk_srkw-south.mp3', size: '22M' },
      { file: '111013_1223_lk_srkw-S7S4.mp3', size: '16M' },
      { file: '120520_235725_lk-J-pod-faint-S1-S4+ship.mp3', size: '18M' },
      { file: '120521_0338_lk_J-calls-loud-jeanne-hyde.mp3', size: '2.1M' },
      { file: '120522_0640_lk_J-calls-faint-jeanne-hyde.mp3', size: '1.0M' },
      { file: '120610_lk-EchoClicksThenCalls-Jeanne-Hyde.mp3', size: '2.1M' },
      { file: 'PKTdB118_05_12_2009_23_55_00snip_lk.mp3', size: '135K' },
    ],
  },
  nb: {
    title: 'Sounds from Neah Bay',
    description:
      'Archived recordings from the Neah Bay hydrophone, 2008 to 2011: harbor seals, pile driving, boats, and passing killer whales.',
    image: '/images/hydrophone-archive/nb-end-of-dock.jpg',
    imageWidth: 737,
    imageHeight: 491,
    imageAlt: 'The weathered wooden pilings at the end of a dock in Neah Bay',
    paragraphs: [
      [
        'Thanks to the support of the ',
        { text: 'Makah Tribe', href: 'https://makah.com/' },
        ' and Jonathan Scordino, Makah Tribal Marine Mammal Biologist, a hydrophone was deployed in Neah Bay during spring, 2008. The hydrophone is located near the end of the Pellet Plant dock just inside of the Bay in about 6 meters of water. From this protected location we hope to be able to hear killer whales and other underwater sound sources without exposing the equipment to the high-energy wave environment outside the Bay in the Strait of Juan de Fuca.',
      ],
      [
        'The current dual-hydrophone system began streaming live sound on July 7, 2008. The hydrophones were wired up by Val Veirs and deployed under the dock by Scott Veirs and Val Veirs in May, 2008. The stream is distributed by spacialnet.com for a monthly fee and supported with DSL infrastructure installed by the Makah Tribe.',
      ],
    ],
    archiveHeading: 'Archived sounds from Neah Bay',
    highlights: [],
    otherLinks: [
      {
        text: 'Makah Cultural and Research Center',
        href: 'https://makahmuseum.com/',
      },
    ],
    // Every recording in orcasound.net/mp3s/nb/, the old page's playlist.
    folder: 'nb',
    recordings: [
      { file: '080707_1447-1448_nb_powerboat-lf-hum.mp3', size: '188K' },
      {
        file: '080707_1530-1548_001753_nb_hum-background_ship.mp3',
        size: '5.1M',
      },
      {
        file: '080707_1549-1550_000156_nb_hum-background_powerboat.mp3',
        size: '568K',
      },
      { file: '080716_0115-0120_000519_nb_male-harbor-seal.mp3', size: '1.5M' },
      { file: '080727_2243-2253_001014_nb_male-harbor-seal.mp3', size: '2.9M' },
      { file: '080728_0140-0141_000100_nb_ship-prop-noise.mp3', size: '296K' },
      { file: '080916-pile-driving.mp3', size: '1.5M' },
      {
        file: '080917_1453-1502_000954_nb_pile-driving-for-10-minutes.mp3',
        size: '2.8M',
      },
      { file: '080923_1106-1108_000202_nb_seagulls.mp3', size: '600K' },
      {
        file: '080923_1635-1636_000055_nb_pile-driving-echo.mp3',
        size: '272K',
      },
      {
        file: '080928_1103-1105_000217_nb_buoy-then-pile-drive-start.mp3',
        size: '672K',
      },
      {
        file: '081001_0140-0141_000110_nb_mystery-seal-start-maybe.mp3',
        size: '344K',
      },
      { file: '081002_0150-0152_000156_nb_harbor-seal.mp3', size: '568K' },
      {
        file: '081008_1249-1250_000101_nb_quiet-snap-crackles.mp3',
        size: '296K',
      },
      {
        file: '081008_1441-1442_000139_nb_mystery-hammering.mp3',
        size: '156K',
      },
      {
        file: '081008_1441-1442_000140_nb_mystery-hammering.mp3',
        size: '134K',
      },
      {
        file: '081021_1246-1301_001520_nb_industrial-squeaks-honks-mews.mp3',
        size: '4.4M',
      },
      {
        file: '081021_1715-1738_02315_nb_industrial-clangs-squeaks-rattling.mp3',
        size: '6.7M',
      },
      { file: '081103_0943-1012_003026_nb_hammering.mp3', size: '8.7M' },
      { file: '081202_2202-2202_000001_nb_Kpod-like-squeak.mp3', size: '14K' },
      {
        file: '081202_2207-2211_000441_nb_more-Kpod-like-squeaks.mp3',
        size: '1.3M',
      },
      {
        file: '081202_2207_02m19s_nb_more-Kpod-like-squeaks.mp3',
        size: '7.6K',
      },
      { file: '081202_2207_03m15s_nb_more-Kpod-like-squeaks.mp3', size: '46K' },
      {
        file: '081202_2207_03m15s_nb_more-Kpod-like-squeaks_plus10dB.mp3',
        size: '46K',
      },
      {
        file: '081203_0909-0945_003635_nb_tonal-squeak-jack-hammer.mp3',
        size: '10M',
      },
      { file: '081203_0909_19m43s_nb_tonal-squeak.mp3', size: '16K' },
      { file: '081203_0909_19m43s_nb_tonal-squeak_plus10dB.mp3', size: '16K' },
      { file: '081203_0909_31m21s_nb_jack-hammer-pause.mp3', size: '25K' },
      {
        file: '081203_0909_31m21s_nb_jack-hammer-pause_plus10dB.mp3',
        size: '25K',
      },
      { file: '081203_0909_31m36s_nb_jack-hammer_plus10dB.mp3', size: '29K' },
      { file: '081203_0909_31m36s_nb_tonal-squeak.mp3', size: '29K' },
      { file: '081203_0909_31m50s_nb_jack-hammer-2.mp3', size: '33K' },
      { file: '081203_0909_31m50s_nb_jack-hammer-2_plus10dB.mp3', size: '33K' },
      { file: '081203_1001-1101_010047_nb_hammering.mp3', size: '17M' },
      { file: '090205_2146-2149_000237_nb_fluttering-boat.mp3', size: '768K' },
      { file: '110509_1715-mid_nb-kw-sighting.mp3', size: '2.2M' },
      { file: '110509_1715_nb-kw-sighting.mp3', size: '4.6M' },
      { file: '110509_1728_nb-kw-sighting.mp3', size: '3.4M' },
      { file: '110509_173915_nb-kw-sighting.mp3', size: '5.2M' },
      { file: '110509_1755_nb-kw-sighting.mp3', size: '2.1M' },
    ],
  },
}

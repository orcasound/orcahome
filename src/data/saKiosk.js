// Content of the old Seattle Aquarium listening kiosk (orcasound.net/sakiosk),
// rebuilt on this site with the same structure (#466 group 4): a home screen
// with a map of 5 listening sites, one page per site, and one page per
// recording. The copy is the original kiosk text, word for word.
//
// The recordings still play from the old server. When #461 moves the old
// audio files to S3, change AUDIO_BASE_URL and nothing else.
export const AUDIO_BASE_URL = 'https://www.orcasound.net/sakiosk/mp3s/'

export const IMAGE_BASE_PATH = '/sakiosk/img/'

export const KIOSK_HEADLINE =
  'Listen to orcas and the sounds that surround them.'
export const KIOSK_INTRO =
  'Orca whale families call to each other to stay together.'
export const KIOSK_QUERY = 'What are our endangered orcas hearing today?'

// The 5 listening sites, in the order of the buttons under the map.
// `dotLeft` / `dotTop` are the centre of the site's red dot on map_home.jpg,
// in percent of the map's width and height, so the dot can be clicked too.
export const KIOSK_LOCATIONS = [
  {
    id: 'sa',
    dotLeft: 87.2,
    dotTop: 70.3,
    label: 'Seattle',
    name: 'Seattle Aquarium',
    image: 'sa-200.jpg',
    imageAlt:
      'The Seattle Aquarium pier on the waterfront, with port cranes in the distance',
    paragraphs: [
      "You're listening below the Seattle Aquarium.",
      "When orcas hunt salmon around Seattle they get an earful. Compare the sounds of the Seattle Aquarium's research site -- right beneath your feet -- to the other live listening sites.",
    ],
    recordings: ['ferry', 'speedboat', 'mystery'],
    more: 'calls',
  },
  {
    id: 'os',
    dotLeft: 57,
    dotTop: 22.8,
    label: 'Orcasound lab',
    name: 'Orcasound lab',
    image: 'orcasound-200.jpg',
    imageAlt: 'Kayakers on calm water at sunset off San Juan Island',
    paragraphs: [
      "You're listening to the Orcasound laboratory on San Juan Island.",
      'Listen for orcas and do research from home at orcasound.net',
    ],
    recordings: ['sonar', 'orcasounds'],
    more: 'seal',
  },
  {
    id: 'lk',
    dotLeft: 58.8,
    dotTop: 25.4,
    label: 'Whale-watch park',
    name: 'Whale Watch State Park',
    image: 'lk-200.jpg',
    imageAlt:
      'The Lime Kiln lighthouse on the rocky shore of Whale Watch State Park',
    paragraphs: [
      "You're listening underwater at Whale Watch State Park.",
      'Orcas hunt salmon along the steep rocky cliff below this park. View them from shore May through October. Can you hear them calling or using echolocation today?',
    ],
    recordings: ['calls', 'mask', 'clicks'],
    more: 'fishing',
  },
  {
    id: 'pt',
    dotLeft: 73,
    dotTop: 44.1,
    label: 'Shipping channel',
    name: 'Port Townsend',
    image: 'pt-overview.jpg',
    imageAlt: 'The Port Townsend Marine Science Center building on its pier',
    paragraphs: [
      "You're listening underneath the Port Townsend Marine Science Center.",
      'Can you hear shipping noise, a ferry boat, or the calls of passing orcas?',
    ],
    recordings: ['seal', 'ships', 'scuba'],
    more: 'ferry',
  },
  {
    id: 'nb',
    dotLeft: 4.6,
    dotTop: 30.9,
    label: 'Remote harbor',
    name: 'Neah Bay',
    image: 'nb-200.jpg',
    imageAlt: 'The weathered wooden pilings of an old pier in Neah Bay',
    paragraphs: [
      "You're listening to a remote harbor called Neah Bay.",
      'Marine wildlife such as grey whales, sea lions, and sea otters share the waters with passing killer whales.',
    ],
    recordings: ['fishing', 'quiet', 'piledrive'],
    more: 'sonar',
  },
]

// One entry per recording page. `location` is the site whose recordings are
// listed under it (the same three thumbnails as that site's page).
export const KIOSK_SOUNDS = {
  ferry: {
    title: 'Ferry',
    location: 'sa',
    file: 'ship-clattering.mp3',
    image: 'ferry-200-sa.jpg',
    imageAlt: 'A Washington State ferry with snowy mountains behind it',
    paragraphs: [
      "You're hearing a ferry recorded from below the Seattle Aquarium.",
      'Ferry boats can be heard up to six kilometers away underwater!',
    ],
  },
  speedboat: {
    title: 'Power boat',
    location: 'sa',
    file: 'speedboat-sa.mp3',
    image: 'homeland-boat-200.jpg',
    imageAlt: 'A small power boat speeding past a rocky shore',
    paragraphs: [
      'Small boats are often heard along the Seattle waterfront.',
      'When boating, stay at least 200 yards away from marine life.',
    ],
  },
  mystery: {
    title: 'Mystery sound',
    location: 'sa',
    file: 'bang-echo_sa.mp3',
    image: 'mystery-200.jpg',
    imageAlt: 'A black question mark on a blue background',
    paragraphs: [
      "This explosive sound is often recorded by the research computer at the Seattle Aquarium, but we don't know what makes it.",
      'Can you imagine something in Elliott Bay that could make such a sound?',
    ],
  },
  calls: {
    title: 'Calls',
    location: 'lk',
    file: 'callS1.mp3',
    image: 'orca-fin-sq200.jpg',
    imageAlt: 'The tall dorsal fin of an orca above the water',
    paragraphs: [
      'Each family of orcas uses different calls to communicate, similar to human language.',
      "Orcas must be able to hear each other to survive. This is J pod's favorite call.",
    ],
  },
  mask: {
    title: 'Calls in boat noise',
    location: 'lk',
    file: 'orcaMIDshipLO.mp3',
    image: 'whalewatchboat-200.jpg',
    imageAlt: 'Whale-watching boats close to a surfacing orca',
    paragraphs: [
      'Speak up! Orcas have to shout in a noisy environment.',
      'Be Whale Wise: stay at least 200 yards away when boating.',
    ],
  },
  clicks: {
    title: 'Echolocation clicks',
    location: 'lk',
    file: 'clicktrainmono.mp3',
    image: 'chinooksalmon-sabn_200.jpg',
    imageAlt: 'A Chinook salmon swimming underwater',
    paragraphs: [
      'Orcas use echolocation (sonar) "clicks" like these to catch almost 100 kilograms (200 pounds) of salmon per day.',
      'Does noise pollution make it easier or harder for them to hunt?',
    ],
  },
  fishing: {
    title: 'Fishing boat',
    location: 'nb',
    file: 'fishing.mp3',
    image: 'salmon-fishing-boat-200.jpg',
    imageAlt: 'Fishermen pulling salmon from a net on a fishing boat',
    paragraphs: [
      'This is the sound of a commercial fishing boat leaving the remote harbor of Neah Bay.',
      'Fish-eating orcas and people need salmon. Buy sustainable wild salmon instead of farmed salmon.',
    ],
  },
  quiet: {
    title: 'Quiet pier',
    location: 'nb',
    file: 'quiet-snaps.mp3',
    image: 'quiet-200.jpg',
    imageAlt: 'The weathered wooden pilings of an old pier in Neah Bay',
    paragraphs: [
      'This is what you hear when things are "quiet" under an old pier in the remote harbor of Neah Bay.',
      "What do you think makes the snapping and popping noises? Scientists don't yet know.",
    ],
  },
  piledrive: {
    title: 'Pile driving',
    location: 'nb',
    file: '5sec-pile-driving.mp3',
    image: 'piledrive-200.jpg',
    imageAlt: 'A worker beside a pile driver on a construction barge',
    paragraphs: [
      "You're listening to pilings being hammered into the bottom of Neah Bay from about 500 meters away.",
      'Construction noise like pile-driving carries a long way underwater and can disrupt marine animals.',
    ],
  },
  sonar: {
    title: 'Sonar',
    location: 'os',
    file: 'sonar-echoes.mp3',
    image: 'military-200.jpg',
    imageAlt: 'A navy warship on the water',
    paragraphs: [
      'Military sonar can panic marine mammals and damage their hearing.',
      'This sonar sound and its many echoes were recorded at the Orcasound lab in 2003.',
    ],
  },
  orcasounds: {
    title: 'Orca sounds',
    location: 'os',
    file: 'orca_sounds.mp3',
    image: 'orca-breach-sq200.jpg',
    imageAlt: 'An orca leaping out of the water',
    paragraphs: [
      'Orcas are frequently heard at the Orcasound lab from May through October.',
      'Can you hear them now?',
    ],
  },
  seal: {
    title: 'Harbor seal',
    location: 'pt',
    file: 'harbor_seal.mp3',
    image: 'harborseal-alki-sabn_200.jpg',
    imageAlt: 'A harbor seal resting on a rocky beach',
    paragraphs: [
      'Harbor seals are usually quiet underwater, but males make this sound in the summertime to claim territory.',
      'You can learn more about harbor seals up the ramp to your right.',
    ],
  },
  ships: {
    title: 'Ships',
    location: 'pt',
    file: 'ship-clattering.mp3',
    image: 'ship-200-sa.jpg',
    imageAlt: 'A cargo ship with snowy mountains behind it',
    paragraphs: [
      'Most ships sound similar to this as they travel to and from the ports of Seattle, Tacoma, and Vancouver.',
      'Noise reducing strategies may help make the oceans a quieter place in the future.',
    ],
  },
  scuba: {
    title: 'SCUBA diver',
    location: 'pt',
    file: 'scuba.mp3',
    image: 'scuba-200.jpg',
    imageAlt: 'A SCUBA diver underwater',
    paragraphs: [
      'When SCUBA divers repaired the hydrophone, or underwater microphone, at Port Townsend we heard their breathing and bubbles.',
      'Bubbles made by waves and rain can make a lot of noise underwater, too.',
    ],
  },
}

export const getKioskLocation = (id) =>
  KIOSK_LOCATIONS.find((location) => location.id === id)

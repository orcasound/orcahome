/**
 * Blog tag cleanup (issue #410) — capitalization + merges.
 *
 * Applies Brendan's rule uniformly: proper nouns keep their real
 * capitalization, everything else is sentence case (first word only). Covers
 * the tags Brendan explicitly ruled on plus the rest of the long tail that the
 * same rule clearly applies to. Genuine content decisions (the ONC / Ocean
 * Networks Canada merge and a few org-name spellings) are left for Brendan
 * (#410) and are NOT in this map yet.
 *
 * "Uncategorized" is handled in the frontend (hidden, not deleted), not here.
 * Safe to re-run: a post is only patched if one of its tags actually changes.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/cleanup-tags.mjs --with-user-token           # dry run
 *   npx sanity exec scripts/cleanup-tags.mjs --with-user-token -- --commit
 */
import {getCliClient} from 'sanity/cli'

const RENAME = {
  // Brendan's explicit rulings
  'southern resident': 'Southern Resident',
  'Orcasound lab': 'Orcasound Lab',
  'AI for orcas': 'AI For Orcas',
  transient: 'Transient',
  humpbacks: 'Humpbacks',
  'visual analysis': 'Visual analysis',
  'Active Learning': 'Active learning',
  gsoc: 'GSoC',
  gsoc20: 'GSoC20',
  gsoc21: 'GSoC21',
  gsoc22: 'GSoC22',
  hackathon: 'Hackathon',
  Hackathons: 'Hackathon',
  'k pod': 'K pod',
  // Proper nouns — real capitalization (same rule)
  'northern resident': 'Northern Resident',
  'Orcasound app': 'Orcasound App',
  simres: 'SIMRES', // Saturna Island Marine Research and Education Society
  'Pacifc Wild': 'Pacific Wild', // typo — the post body spells it correctly
  // Org names — capital + space form for now; Brendan may correct the exact
  // branding (#410). The ONC / Ocean Networks Canada *merge* is still pending.
  Cetacealab: 'Cetacea Lab',
  Orcalab: 'Orca Lab',
  Orcabooth: 'Orca Booth',
  King5: 'KING 5',
  'marine monitor': 'Marine Monitor',
  'ocean networks canada': 'Ocean Networks Canada',
  // Sentence case (first word capitalized)
  'machine learning': 'Machine learning',
  hydrophones: 'Hydrophones',
  'deep learning': 'Deep learning',
  'data visualization': 'Data visualization',
  'labeled data': 'Labeled data',
  'training data': 'Training data',
  'orca calls': 'Orca calls',
  'ship noise': 'Ship noise',
  'cargo ship': 'Cargo ship',
  'sea lion': 'Sea lion',
  'sperm whale': 'Sperm whale',
  'spotting scope': 'Spotting scope',
  'vessel interactions': 'Vessel interactions',
  'web application': 'Web application',
  'audio database': 'Audio database',
  bark: 'Bark',
  boat: 'Boat',
  cavitation: 'Cavitation',
  diver: 'Diver',
  echolocation: 'Echolocation',
  embeddings: 'Embeddings',
  fluke: 'Fluke',
  methods: 'Methods',
  offshore: 'Offshore',
  pinniped: 'Pinniped',
  scripts: 'Scripts',
  sonar: 'Sonar',
  spectrogram: 'Spectrogram',
  superpod: 'Superpod',
  tail: 'Tail',
  tests: 'Tests',
  theodolite: 'Theodolite',
  whistle: 'Whistle',
  awards: 'Awards',
}

const commit = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2023-01-01'})

async function run() {
  console.log(commit ? '── WRITING (--commit) ──' : '── DRY RUN (no writes) ──')

  const posts = await client.fetch(`*[_type == "blogPost"]{_id, title, tags}`)
  let changed = 0
  const seen = new Set()
  for (const post of posts) {
    const tags = Array.isArray(post.tags) ? post.tags : []
    const mapped = tags.map((t) => RENAME[t] || t)
    const deduped = [...new Set(mapped)]
    const isChanged =
      deduped.length !== tags.length || deduped.some((t, i) => t !== tags[i])
    if (!isChanged) continue

    changed += 1
    tags.filter((t) => RENAME[t] && RENAME[t] !== t).forEach((t) => seen.add(t))
    if (commit) {
      await client.patch(post._id).set({tags: deduped}).commit()
    }
  }
  console.log(`\nDistinct tags renamed (${seen.size}):`)
  ;[...seen]
    .sort()
    .forEach((t) => console.log(`  ${t}  ->  ${RENAME[t]}`))
  console.log(`\n${commit ? 'Updated' : 'Would update'} ${changed} posts.`)
  if (!commit) console.log('Re-run with `-- --commit` to apply.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

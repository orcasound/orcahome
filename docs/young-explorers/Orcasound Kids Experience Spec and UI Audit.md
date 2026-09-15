# Orcasound Kids Experience: Product Specification and Beta UI Audit

Prepared for the 2026 hackathon, Day 1

## 1. Recommendation

Create a dedicated, optional **Young Explorers** experience that turns Orcasound's strongest and most distinctive asset - live and recorded underwater sound - into a short learning adventure:

> **Hear it. Understand it. Protect it.**

The first release should be a five-minute **Orca Sound Detective** activity for upper-elementary and middle-school students. It should use real, curator-approved Orcasound recordings and existing spectrograms, introduce J, K, and L pods, explain the difference between calls, whistles, and echolocation clicks, and end with one realistic "Orca Ally" action.

This is a better fit than making the entire site look childlike. Scientists, volunteers, donors, educators, and casual listeners still need the primary site. A separate `/kids` or `/explore` route can use the same design system and content while providing:

- larger targets and shorter text;
- guided audio missions;
- visual explanations of sound;
- age-appropriate conservation actions;
- classroom and family entry points;
- no account requirement, public leaderboard, or child profiling.

### Volunteer-operated product constraint

Orcasound is volunteer-run, so the normal student and teacher journey must be completed through the UI without requiring a volunteer to schedule a session, review homework, issue a certificate, answer routine questions, or maintain a child account.

Use this rule for every proposed feature:

> **If participation grows by 100 classrooms, routine volunteer workload should not grow by 100 classrooms.**

The UI should therefore:

- provide self-guided instructions, hints, answers, and age-mode selection;
- use a stable library of expert-reviewed clips rather than require a live event;
- generate Pod Passports and Orca Ally certificates entirely in the browser;
- offer printable teacher guides and answer keys;
- preserve optional progress only in the browser;
- label evidence and explain uncertainty automatically;
- use Sanity or a small reviewed data file so non-developer volunteers can update content once for every classroom;
- direct recurring questions to a concise FAQ;
- make live scientist sessions, custom classroom help, and student showcases explicitly optional and capacity-dependent;
- avoid public student submissions unless the team later has sustainable moderation capacity.

## 2. Product facts and science model

### Local context

- Orcasound uses a network of underwater microphones (hydrophones) around the Puget Sound/Salish Sea area. The team reports eight microphones in the current network.
- A hydrophone can hear an orca when it is acoustically close enough. A louder recording can be consistent with a closer whale, but **volume alone is not a reliable distance measurement**. Orientation, depth, vocalization type, water conditions, background noise, and hydrophone sensitivity also affect loudness.
- Sightings and photographs are contributed by authorized researchers and members of the public through reporting workflows. The product must show their source and status rather than presenting every report as a verified Orcasound detection.
- Orcasound's distinctive evidence is sound. The experience should teach children to listen critically rather than becoming another photo gallery.

### Pods and vocalizations

- The local Southern Resident Killer Whales are organized into J, K, and L pods.
- The pods have recognizable repertoires of discrete calls. Some calls are shared, so a call should not be presented as proof of an individual whale.
- Orcas primarily make:
  - **Echolocation clicks:** used to navigate and find prey. Rapid clicks near prey may form a buzz.
  - **Discrete calls:** short, patterned sounds used for communication and group cohesion.
  - **Whistles:** social sounds that are less common than discrete calls in Southern Resident Killer Whales.
  - Orcasound's click catalog also describes click-speed categories and a "sweep."
- Southern Resident Killer Whales specialize in fish, especially Chinook salmon. Vessel noise can interfere with both communication and echolocation.

### Pod identification versus individual identification

- **Acoustic identification:** Orcasound can often help identify which pod is present because J, K, and L pods have recognizable call repertoires. This does not usually identify the individual whale making a sound.
- **Photo-identification:** Researchers can identify an individual from high-quality photographs of the dorsal fin and the saddle patch behind it. Fin shape, nicks, scars, and saddle-patch pigmentation form a recognizable combination, similar to a fingerprint.
- **Operational limitation:** Individual identification requires a suitable view and an expert comparison with a current catalog. Orcasound does not receive enough live, detailed photographs to offer routine individual live tracking.
- **UX rule:** Show a named individual only when a qualified source has photo-identified that whale. Otherwise show the pod, evidence status, and a plain statement such as "Individual whale not identified."

This distinction can itself become a useful activity: students first match a call to a pod and then try NOAA's fin-matching method on curated photographs, learning that scientists combine different types of evidence.

### Evidence labels required in the UI

Every event card or map marker should show one of these plain-language labels:

| Label | Meaning |
|---|---|
| **Live underwater audio** | Sound currently streaming from a named hydrophone |
| **AI candidate** | OrcaHello detected a possible whale sound; not yet expert-confirmed |
| **Expert confirmed** | A trained moderator reviewed the acoustic evidence |
| **Researcher sighting** | A sighting or photo supplied by an identified research organization |
| **Community report** | A public report that may still need verification |
| **Photo-identified individual** | A qualified source matched the dorsal fin and saddle patch to a cataloged whale |
| **Historical recording** | A dated, curated clip used for learning |

Do not merge these evidence types into a generic "orca detected" status.

## 3. Audience and experience modes

### Grades 3-5: Ocean Explorer

- One idea per screen
- Short sentences and optional read-aloud
- Picture and sound matching
- Immediate, encouraging feedback
- Five-minute missions
- Conservation actions done with a parent, guardian, or class

### Grades 6-8: Junior Bioacoustician

- Spectrogram reading
- Compare J, K, and L pod calls
- Separate observation from inference
- Explain AI candidate versus expert confirmation
- Noise-pollution and salmon-food-web challenges
- Optional data table or classroom worksheet

Let users choose a mode; do not infer age or require a birth date.

## 4. MVP: Orca Sound Detective

### User story

As a student, I want to hear real underwater sounds, make a guess, and learn what experts listen for so I can understand how sound helps protect Southern Resident Killer Whales.

### Five-minute flow

1. **Welcome**
   - "Put on headphones at a comfortable volume."
   - Choose Ocean Explorer or Junior Bioacoustician.
   - Explain that the clips are real and may contain boat, water, fish, and animal sounds.

2. **Meet the listening network**
   - Show the eight hydrophones as friendly "ocean ears."
   - Select a node to hear one short, curated clip.
   - Say "heard near this hydrophone," not "the whale was exactly here."

3. **Sound challenge**
   - Play a 5-10 second clip.
   - Ask: "What do you hear?" with choices such as orca call, clicking, boat, rain/waves, or "not sure."
   - Always include "not sure"; uncertainty is part of science.

4. **Reveal**
   - Animate or highlight the matching region in a spectrogram, with a reduced-motion alternative.
   - Give a one-sentence explanation and a "How do we know?" disclosure.
   - Show whether the clip was expert-confirmed or is an educational example.

5. **Meet a pod**
   - Introduce J, K, or L pod with a call, range map, family-safe story, and one current conservation challenge.
   - Avoid claiming the sound identifies an individual whale.
   - Optionally introduce a cataloged individual from that pod, while clearly saying the individual was identified from verified photographs rather than from this sound.

6. **Become an Orca Ally**
   - Choose one action: learn Be Whale Wise rules with an adult, reduce underwater noise, protect salmon habitat, keep litter out of waterways, or teach someone one new fact.
   - Award a personalized-in-the-browser, local-only **Orca Ally certificate** connected to the selected pod or a verified individual profile.

### MVP content

- Six existing call clips and spectrograms from the Learn page
- At least one click/buzz example from the Orcasound click catalog
- Two non-orca controls such as boat noise and waves
- Three pod cards: J, K, and L
- Three conservation cards: quiet water, salmon habitat, clean water
- One explanation of OrcaHello: "AI suggests; trained people confirm"

### Acceptance criteria

- A student can finish without signing in or entering personal information.
- Every audio control works with keyboard and screen reader.
- Every clip has a transcript/description and a spectrogram or other visual equivalent.
- The user can pause all sound immediately.
- Only one clip plays at a time.
- The activity preserves progress locally, if at all; no cross-device identity or behavioral profile.
- Correctness is reviewed by an Orcasound acoustic subject-matter expert.
- Content meets WCAG 2.2 AA and works at 320 CSS pixels wide.
- Motion respects `prefers-reduced-motion`.
- A teacher can copy a stable link directly to the activity.

## 5. Next features

### A. Orca Ally certificate and Pod Passport

A childhood adoption certificate can create a durable emotional bond with a specific whale. Build on that proven pattern without competing with or misrepresenting The Whale Museum's established Adopt an Orca program:

- Let the child choose J, K, or L pod, then select a verified individual profile from that pod.
- Present a photograph, name/designation, pod, family relationships, a short biography, and one conservation challenge from a qualified catalog.
- Generate a printable **Orca Ally certificate** or digital Pod Passport page stating, "I learned about [whale] and joined the effort to protect Southern Resident Killer Whales."
- Add a clear link to The Whale Museum's official adoption program for families or classrooms that want a formal adoption.
- Do not imply ownership, guaranteed sightings, live individual tracking, or that the child has adopted the whale through Orcasound.
- Keep the certificate local and printable; do not require the child's name to be sent to a server.

Students can collect three local-only Pod Passport stamps by learning one representative call and one conservation fact for each of J, K, and L pods.

### B. Photo-ID detective

Use curated, licensed photographs to teach how researchers identify individuals:

1. Look at dorsal-fin shape.
2. Find nicks, notches, or scars.
3. Compare the saddle patch behind the fin.
4. Choose the closest catalog match.
5. Reveal the expert identification and explain why the match is reliable or uncertain.

This should be an educational simulation using already verified images, not a public face-recognition-style upload tool. A later researcher-reviewed phase could evaluate community photo submissions, consent, licensing, location sensitivity, moderation, and data quality.

### C. Live Listening Mission

Provide a guided layer over the existing live player:

- current hydrophone and stream status;
- "What might I hear?" checklist;
- big report button with child-safe instructions;
- expert-confirmed activity indicator;
- clear reminder that silence is normal and valuable;
- no promise that a whale will be heard.

### D. Sound Lab

Let students compare:

- call versus whistle versus click;
- slow clicks versus fast clicks versus buzz;
- quiet water versus vessel noise;
- audio waveform versus spectrogram.

This can align with existing Orcahome issue #393 for animated/dynamic spectrograms.

### E. Orca Ally Missions

Use short, place-based missions instead of guilt:

- Make a "quiet ocean" poster.
- Map how rainwater reaches Puget Sound.
- Build a salmon food-web chain.
- Take a family Be Whale Wise quiz.
- Pick up litter with an adult.
- Share one sourced orca fact.

Avoid points tied to donations or social posting.

### F. Classroom mode

- 15-, 30-, and 45-minute lesson paths
- teacher answer key
- printable sound-observation sheet
- small-group roles: listener, evidence recorder, and conservation planner
- stable clip set that does not depend on whales being present live
- Next Generation Science Standards mapping as a later educator-reviewed deliverable

### G. Orca Ally Schools program

Schools can become active awareness partners rather than passive content consumers. Offer a free, teacher-led program with five participation levels:

1. **Sound of the Week**
   - A teacher-safe page provides one short, curated recording, a spectrogram, three discussion questions, and one conservation fact.
   - Students vote on what they hear before the expert answer is revealed.
   - Morning announcements or the school science newsletter can share the fact without exposing student information.

2. **Classroom Listening Team**
   - Small groups take rotating roles: Audio Listener, Spectrogram Reader, Evidence Checker, Pod Researcher, and Orca Ally Reporter.
   - Students record observations on a printable or local-only worksheet.
   - No submission is needed to complete the activity. If aggregate feedback is later collected, the teacher submits it without student names or accounts.

3. **Adopt-to-Learn partnership**
   - A class can choose a verified individual profile and learn its pod, family relationships, life history, and conservation challenges.
   - Orcasound supplies the sound-learning activities; The Whale Museum's official adoption program remains the pathway for a formal adoption.
   - The class receives an Orca Ally classroom certificate and can maintain a wall-sized Pod Passport.

4. **Student awareness project**
   - Students create an evidence-based poster, short audio story, school exhibit, science-fair project, podcast segment, or "quiet ocean" campaign.
   - Every artifact includes at least one approved source and distinguishes fact, observation, and inference.
   - The default is a school-local display, which creates awareness without adding Orcasound moderation work. Publishing student names, voices, photos, or precise locations requires the school's normal guardian-consent process.

5. **Optional community showcase**
   - Offer this only when volunteers explicitly have capacity; it is not part of the core product promise.
   - A reusable recorded scientist Q&A and searchable FAQ should be the default.
   - For a live event, questions are submitted by the teacher and published highlights identify the class only at the level approved by the school, such as grade band or region.

#### Four-week lightweight school challenge

| Week | Theme | Student activity | Awareness output |
|---|---|---|---|
| 1 | Hear | Learn hydrophones and classify a mystery sound | "What is an ocean ear?" school announcement |
| 2 | Know | Meet J, K, and L pods; try photo-ID matching | Pod Passport display |
| 3 | Protect | Explore vessel noise, salmon, habitat, and clean water | One class conservation pledge |
| 4 | Share | Build and present a sourced story or exhibit | Family night, science fair, or virtual showcase |

#### School participation safeguards

- No student account is required.
- Do not collect a child's name, email, school ID, age, voice, photo, or precise location.
- Teachers control links, submissions, and any communication with Orcasound.
- The default experience has no public student-submission gallery.
- If a gallery is added later, nothing is displayed before moderation and the feature can be disabled when moderation capacity is unavailable.
- Use curated historical clips when the live stream is quiet or unsuitable.
- Students do not make vessel-safety decisions, verify live detections, or publish real-time whale locations.
- Activities must be usable without paid adoption, donation, or merchandise.
- Provide captions, transcripts, printable alternatives, keyboard access, and low-bandwidth versions.

#### What the UI should do automatically

| Need | UI behavior | Volunteer work |
|---|---|---|
| Choose an activity | Filter by grade band, duration, and topic | None |
| Run a lesson | Step-by-step presentation mode with optional read-aloud | Teacher facilitates |
| Explain an answer | Reveal expert-reviewed explanation and source | One-time content review |
| Track progress | Browser-local checklist or session state | None |
| Create recognition | Generate printable Pod Passport or Orca Ally certificate locally | None |
| Handle a quiet live stream | Offer a curated historical "mystery sound" | Maintain a small clip library |
| Answer common questions | Searchable, age-appropriate FAQ | Occasional content updates |
| Gather feedback | Optional anonymous teacher form with aggregate questions | Periodic review, not per-student support |

#### Sustainable implementation tiers

1. **Tier 1 - static and self-service:** `/kids` route, three to six clips, J/K/L cards, conservation actions, printable certificate, teacher PDF/print view. No backend and no new operational duty.
2. **Tier 2 - editor-maintained:** Move approved activity content into Sanity so a content volunteer can update clips, facts, and sources without deploying code.
3. **Tier 3 - capacity-dependent:** Occasional live classroom event, moderated showcase, or researcher Q&A. Enable only with named volunteer ownership and an off switch.

### H. Safe AI explainer

OrcaHello can support a valuable AI-literacy lesson:

1. AI flags a possible call.
2. A trained human reviews it.
3. The result may trigger a notification or become learning data.

If a conversational assistant is added, it should:

- answer only from a curated, cited Orcasound/NOAA knowledge base;
- show sources and uncertainty;
- avoid unrestricted child free-text collection;
- collect no name, age, school, email, precise location, or photo;
- have an educator/guardian mode for longer questions;
- never fabricate a live whale location;
- never turn unconfirmed AI output into navigation or vessel-safety advice.

## 6. Conservation goals translated into features

| Initiative goal | Student-facing feature | Operational guardrail |
|---|---|---|
| Build awareness | Pod Passport, real call stories, short facts | Use accurate and hopeful language |
| Help vessels avoid whales | Explain how confirmed acoustic alerts can support safer decisions | Safety messaging uses approved, confirmed operational data, not a child's guess or raw loudness |
| Support orca well-being | Orca Ally missions on noise, salmon, habitat, and clean water | Avoid claims that a single action "saves" a whale |

## 7. Benchmarks worth adapting

| Site | Pattern to adapt | Why it fits Orcasound |
|---|---|---|
| [NOAA for Kids](https://oceanservice.noaa.gov/kids/) | Games, puzzles, printable activities, official science | Trusted conservation learning and classroom reuse |
| [NASA Kids Earth](https://science.nasa.gov/kids/earth/) | Mission framing, short explainers, visual topic navigation | Turns complex science into achievable exploration |
| [National Geographic Kids Ocean Portal](https://kids.nationalgeographic.com/pages/topic/ocean-portal) | Strong animal stories, quizzes, visual cards | Emotional connection and curiosity |
| [Monterey Bay Aquarium Learning at Home](https://www.montereybayaquarium.org/for-educators/learning-at-home) | Live animal media plus educator activities | Model for pairing a live experience with reliable fallback activities |
| [Smithsonian Ocean Portal](https://ocean.si.edu/ocean-life) | Layered articles, exhibits, and scientist stories | Supports both elementary and middle-school depth |
| [The Whale Museum Adopt an Orca](https://whalemuseum.org/collections/adopt-an-orca) | Named-whale stories, pod/family relationships, stewardship | Creates a durable personal connection to local whales |

The recommended combination is **NASA-style missions + aquarium-style live presence + Whale Museum-style stories + NOAA-level science trust**, centered on Orcasound's unique real audio.

## 8. Beta UI and code audit

Reviewed:

- production site: `https://www.orcasound.net/`
- beta site: `https://www.orcasound.tech/`
- Orcahome repository: `https://github.com/orcasound/orcahome`
- OrcaHello repository: `https://github.com/orcasound/orcahello`

### Strengths

- The beta has a clear live-listening call to action.
- The Learn page already contains six playable call examples, spectrograms, a Salish Sea soundscape, and links to a larger catalog.
- The call catalog already filters by J, K, and L pods.
- The site uses Next.js, React, MUI, Sanity, and reusable audio/spectrogram components, so a `/kids` MVP can reuse current assets rather than introducing another stack.
- `UX.md` already sets WCAG 2.2 AA and privacy-preserving, non-profiled use as product constraints.
- OrcaHello provides a strong "AI plus human confirmation" educational story.

### Product gaps, not defects

- The beta does not provide a clear student or educator entry point.
- Most Learn copy assumes adult reading ability and prior science vocabulary.
- The current learning journey is a content page rather than a guided challenge.
- Conservation action is separated from sound learning.
- Live listening does not set child-friendly expectations about silence, uncertainty, or non-orca noise.
- Existing open issue #227 already covers unexplained technical jargon; a kids project should coordinate rather than duplicate it.
- Existing open issue #393 already covers dynamic spectrogram exploration; a kids project can contribute a student-focused use case and reduced-motion requirement.

## 9. Ready-to-file beta issue drafts

The drafts below are not duplicates of open issues found during the audit. They were not submitted because this workflow is read-only.

### Issue 1: A11Y: Give the mobile navigation toggle an accurate accessible name

**Problem**

The mobile menu button is labeled `account of current user`, but it opens and closes the site navigation. Screen-reader and voice-control users receive an incorrect purpose.

**Location**

`src/components/Nav.jsx`, the `Mobile` component's `IconButton`.

**Steps**

1. Open any page below the `lg` breakpoint.
2. Inspect or focus the menu icon with a screen reader.
3. Observe the accessible name "account of current user."

**Expected**

The accessible name describes the current action, for example "Open main navigation" and "Close main navigation." The button exposes `aria-expanded` and references the drawer with `aria-controls`.

**Acceptance criteria**

- Closed state name is "Open main navigation."
- Open state name is "Close main navigation."
- `aria-expanded` reflects state.
- Keyboard and screen-reader behavior is verified at mobile and tablet breakpoints.

### Issue 2: A11Y: Add accessible names to Learn call play/pause buttons

**Problem**

The six icon-only controls in the Learn page call catalog do not have accessible names. Their spectrogram alt text is also generated from a zero-based array index (`Orca Call 0`) rather than the visible call identifier (`Orca call S01`).

**Location**

`src/components/Learn/CallCatalogGrid.jsx`

**Steps**

1. Open `/learn`.
2. Navigate to the call catalog using a screen reader or browser accessibility tree.
3. Focus each play/pause button.

**Expected**

Each control is announced with its action and call, such as "Play Orca call S01" or "Pause Orca call S01." Spectrogram alt text uses the same visible call identifier.

**Acceptance criteria**

- Every play/pause control has a state-aware accessible name.
- Alt text uses `orcaCallTags[index]`, not the numeric index.
- Starting one clip stops any clip already playing.
- Focus remains on the activated control.

### Issue 3: A11Y: Add an accessible name to TopBanner's scroll control

**Problem**

The reusable hero scroll button is icon-only and has no accessible name.

**Location**

`src/components/TopBanner.jsx`, `ScrollDownButton`.

**Impact**

This affects Learn, Catalog, and other pages using `TopBanner`.

**Expected**

The button is named from its destination, for example "Scroll to Learn content." Decorative chevrons are hidden from assistive technology.

**Acceptance criteria**

- `ScrollDownButton` has a meaningful `aria-label`.
- The label can be derived from a human-readable prop rather than an element ID.
- Both chevron icons are `aria-hidden`.
- Keyboard activation moves to the intended section and does not strand focus.

### Issue 4: UX/MOBILE: Prevent Learn hero description clipping at 390px width

**Problem**

At a 390 x 844 viewport, the Learn hero's dark description panel clips the last part of text at the right edge. The panel also occupies substantial hero space and competes with the page title and scroll cue.

**Location**

`src/components/TopBanner.jsx`, `PageDesc` mobile styles.

**Steps**

1. Open `https://www.orcasound.tech/learn`.
2. Set the viewport to 390 x 844.
3. Observe the right edge of the description panel.

**Expected**

All text wraps within the viewport with at least 16 CSS pixels of horizontal padding and no horizontal clipping or overflow.

**Acceptance criteria**

- No text or panel clipping at 320, 360, 390, and 412 CSS pixels.
- No horizontal page scroll.
- Title, description, and scroll affordance remain visually distinct.
- 200% text zoom remains usable.

## 10. Proposed feature issue

### UX/DEV: Build a privacy-preserving Orca Sound Detective MVP for students

**Goal**

Create a five-minute guided activity that helps grades 3-8 identify common underwater sounds, meet J/K/L pods, understand acoustic evidence, and choose one conservation action.

**Implementation fit**

- New route: `/kids` or `/explore`
- Reuse audio and spectrogram assets from `src/pages/learn.jsx` and `src/components/Learn/CallCatalogGrid.jsx`
- Reuse MUI and Orcasound design tokens
- Content can begin as reviewed static data and move to Sanity after validation
- Do not require an OrcaHello API integration for the hackathon MVP

**Acceptance criteria**

- Two self-selected reading-depth modes
- Six or more curated audio challenges
- J, K, and L pod learning cards
- Evidence/source label on each clip
- One conservation action at completion
- No login, child profile, public leaderboard, or personal-data collection
- WCAG 2.2 AA, keyboard support, transcript/visual alternative, and reduced-motion mode
- Works independently of live whale activity
- Science and wording approved by an Orcasound subject-matter expert

## 11. One-day hackathon scope

### Must finish today

1. Clickable `/kids` prototype or Figma flow with Welcome, Sound Challenge, Reveal, Meet a Pod, and Orca Ally screens.
2. Three reviewed clips: one call, one click/buzz, and one non-orca sound.
3. One J/K/L pod selector.
4. Evidence labels and a plain-language "AI suggests; people confirm" explanation.
5. Mobile and keyboard usability.

### Do not attempt today

- child accounts or profiles;
- live vessel-routing integration;
- unrestricted chatbot;
- public uploads;
- precise real-time whale location;
- a full curriculum;
- a new audio-processing pipeline.

### Suggested team demo

Start with a mystery clip, let the audience vote, reveal its spectrogram and evidence status, introduce the pod or sound type, then end with a concrete conservation action. This demonstrates the product idea in under three minutes.

## 12. Success measures

For a first moderated test with 5-8 students and 2-3 educators:

- 80% can explain what a hydrophone is after the activity.
- 80% can name at least two sound types.
- 70% can explain that AI candidates need human review.
- 80% can name one realistic orca-conservation action.
- At least 4 of 5 students choose to play a second sound.
- No participant mistakes loudness for an exact distance or an unconfirmed report for a verified location after the explanation.

Do not use third-party child analytics to collect these measures. Use facilitator observation, an anonymous exit card, or aggregate classroom feedback.

## 13. Sources

- Orcahome repository and UX context: https://github.com/orcasound/orcahome
- OrcaHello system overview: https://github.com/orcasound/orcahello
- Orcasound production site: https://www.orcasound.net/
- Orcasound beta: https://www.orcasound.tech/
- Orcasound SRKW click catalog: https://www.orcasound.net/portfolio/srkw-click-catalog/
- Orca Behavior Institute acoustics overview: https://www.orcabehaviorinstitute.org/orca-acoustics
- NOAA, "Sound Strategy: Hunting with the Southern Residents, Part 2": https://www.fisheries.noaa.gov/feature-story/sound-strategy-hunting-southern-residents-part-2
- NOAA, Southern Resident Killer Whale Fin Matching Activity: https://www.fisheries.noaa.gov/resource/educational-materials/southern-resident-killer-whale-fin-matching-activity
- Center for Whale Research, orca identification: https://www.whaleresearch.com/copy-of-about-orcas
- Cetacean Research Technology, Dyes Inlet recordings: https://cetaceanresearch.com/sounds/dyes-inlet-orcas.html
- The Whale Museum, Adopt an Orca: https://whalemuseum.org/collections/adopt-an-orca
- NOAA for Kids: https://oceanservice.noaa.gov/kids/
- NASA Kids Earth: https://science.nasa.gov/kids/earth/

All external sources used here were accessed over HTTPS from established government, nonprofit, scientific, project, or educational organizations. No executable files or untrusted downloads were used.

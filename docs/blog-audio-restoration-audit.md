# WordPress blog audio restoration audit (#428)

Audit date: 2026-09-25. Dataset: `tncpl9l7/production`.

All 97 published Sanity blog slugs were checked against their WordPress originals. 22 posts were missing 45 recordings from their article bodies. No source-page fetches failed.

## Result

Restored all 45 recordings to production on 2026-09-25 in one transaction. A read-only re-audit of all 97 posts against the downloaded WordPress source snapshots found **0 missing recordings and 0 errors**. All 22 saved bodies structurally match the planned bodies; rerunning apply in dry-run mode reports **0 pending posts**.

Chrome verification of the Bigg’s article confirmed four players (one existing plus three restored), successful MP3 playback, and an OGG clip playing to completion without a media error.

## Method

- Read only `.entry-content`: exclude sidebar widgets, comments, and navigation. In particular, the shared `15clicks` sperm-whale widget is not part of the Bigg’s article.
- Compare audio players and direct audio links with Portable Text `markDefs` by filename stem (ignoring extension and URL query). Alternate sources in the same player are one recording even when WordPress has renamed an upload or mistyped a filename.
- Prefer an available MP3; fall back to an original OGG source when necessary. Verify each selected URL returns HTTP 200/206 with an audio content type, using HTTPS and removing only WordPress’s `_` cache-buster.
- Insert one linked paragraph per missing recording after an unambiguous matching source paragraph/heading. Existing body blocks are preserved exactly and in order; authors, tags, titles, and other document fields are untouched.
- Refuse writes if any page audit failed, any insertion/media is unresolved, a draft exists, or a document revision changed. Commit all affected documents in one revision-guarded transaction.

## Missing recordings

| Post                                                                                                                                                                             | WP recordings | Sanity before | To restore |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------: | ------------: | ---------: |
| [911: superpod northbound at Orcasound Lab on a smokey night](https://www.orcasound.net/blog/911-superpod-northbound-at-orcasound-lab-on-a-smokey-night/)                        |             3 |             0 |          3 |
| [A Bush Point 1st: J pod & L87 heard live!](https://www.orcasound.net/blog/a-bush-point-1st-j-pod-l87-heard-live/)                                                               |             1 |             0 |          1 |
| [Acoustic inference as J pod departs Puget Sound & heads to Canada](https://www.orcasound.net/blog/acoustic-inference-as-j-pod-departs-puget-sound-heads-to-canada/)             |             2 |             0 |          2 |
| [Bigg’s bangs: the sound of marine mammal death heard live?](https://www.orcasound.net/blog/biggs-bangs-the-sound-of-marine-mammal-death-heard-live/)                            |             4 |             1 |          3 |
| [Bigg’s calls, including T08, & whistles?](https://www.orcasound.net/blog/biggs-calls-including-t08-whistles/)                                                                   |             4 |             3 |          1 |
| [Exciting (S10) L pod calls as the sun sets over Orcasound Lab](https://www.orcasound.net/blog/exciting-s10-l-pod-calls-as-the-sun-sets-over-orcasound-lab/)                     |             2 |             1 |          1 |
| [First Orcasound recording of humpback song in Haro during January!](https://www.orcasound.net/blog/first-orcasound-recording-of-humpback-song-in-haro-during-january/)          |             2 |             0 |          2 |
| [Happy 4th! Bigg’s killer whales heard at Bush Point](https://www.orcasound.net/blog/happy-4th-biggs-killer-whales-heard-at-bush-point/)                                         |             2 |             0 |          2 |
| [A Haro humpback howls as Halloween harkens](https://www.orcasound.net/blog/haro-humpback-howls-as-halloween-harkens/)                                                           |             2 |             0 |          2 |
| [Humpback and Bigg’s killer whales serenading in the darkness](https://www.orcasound.net/blog/humpback-and-biggs-killer-whales-serenading-in-the-darkness/)                      |             3 |             1 |          2 |
| [J Pod Returns to the Orcasound Lab Hydrophone](https://www.orcasound.net/blog/j-pod-returns-to-the-orcasound-lab-hydrophone/)                                                   |             1 |             0 |          1 |
| [K & L pods call in boat noise at Orcasound Lab](https://www.orcasound.net/blog/k-l-pods-call-in-boat-noise-at-orcasound-lab/)                                                   |             2 |             0 |          2 |
| [L90 and her new calf vocalize & echolocate alone](https://www.orcasound.net/blog/l90-and-her-new-calf-vocalize-echolocate-alone/)                                               |             1 |             0 |          1 |
| [Listeners detect J pod’s fourth fall visit to Puget Sound](https://www.orcasound.net/blog/listeners-detect-j-pods-third-fall-visit-to-puget-sound/)                             |             2 |             0 |          2 |
| [Lon first to hear J+K pods entering Puget Sound at Bush Point](https://www.orcasound.net/blog/lon-first-to-hear-jk-pods-entering-puget-sound-at-bush-point/)                    |             2 |             0 |          2 |
| [Orcas head north & south for Salish Sea salmon](https://www.orcasound.net/blog/orcas-head-north-south-for-salish-sea-salmon/)                                                   |             4 |             0 |          4 |
| [Orcasound’s Greatest Hits of 2021](https://www.orcasound.net/blog/orcasounds-greatest-hits-of-2021/)                                                                            |             3 |             0 |          3 |
| [Election night humpback calls at Orcasound Lab](https://www.orcasound.net/blog/scottveirs/)                                                                                     |             2 |             0 |          2 |
| [(Almost) Superpod porpoises past Orcasound Lab – 8/17/2023](https://www.orcasound.net/blog/superpod-passing-orcasound-8-17-2023/)                                               |             3 |             0 |          3 |
| [Underwater baby shower? Listen to J pod with new calf J59](https://www.orcasound.net/blog/underwater-baby-shower-listen-to-j-pod-with-new-calf-j59/)                            |             1 |             0 |          1 |
| [Unusual SRKW calls at 2 a.m. in Haro Strait, and then ship noise (again)](https://www.orcasound.net/blog/unusual-srkw-calls-at-2-a-m-in-haro-strait-and-then-ship-noise-again/) |             1 |             0 |          1 |
| [When ships go bang in the night (in orca habitat)](https://www.orcasound.net/blog/when-ships-go-bang-in-the-night-in-orca-habitat/)                                             |             4 |             0 |          4 |

### 911: superpod northbound at Orcasound Lab on a smokey night

- [20200911_30s_OS_JKL_N.mp3](https://orcasound.net/data/raw/os/20200911_2130-OS-J+Nbound/20200911_30s_OS_JKL_N.mp3)
- [20200911_2149-2156_OS_JKL_N.mp3](https://orcasound.net/data/raw/os/20200911_2130-OS-J+Nbound/20200911_2149-2156_OS_JKL_N.mp3)
- [20200911_2145-2210_OS_JKL_N.mp3](https://orcasound.net/data/raw/os/20200911_2130-OS-J+Nbound/20200911_2145-2210_OS_JKL_N.mp3)

### A Bush Point 1st: J pod & L87 heard live!

- [20181207_171105_clip-1.25min-Jpod-bush-point.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2018/12/20181207_171105_clip-1.25min-Jpod-bush-point.mp3)

### Acoustic inference as J pod departs Puget Sound & heads to Canada

- [200930-0322_35min_OS-SRKW-NB.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/10/200930-0322_35min_OS-SRKW-NB.mp3)
- [200930-0335_SRKW-click-sequence.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/10/200930-0335_SRKW-click-sequence.mp3)

### Bigg’s bangs: the sound of marine mammal death heard live?

- [20181207_175315-45sec-clip-Biggs-kill-Orcasound-lab.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2018/12/20181207_175315-45sec-clip-Biggs-kill-Orcasound-lab.mp3)
- [20181207_175315-5sec-4-Biggs-bangs-Orcasound-lab.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2018/12/20181207_175315-5sec-4-Biggs-bangs-Orcasound-lab.ogg)
- [20080601-SRKW-percussives-LK.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2018/12/20080601-SRKW-percussives-LK.ogg)

### Bigg’s calls, including T08, & whistles?

- [230226-130350_1m25s-clip_OS-Biggs.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2023/02/230226-130350_1m25s-clip_OS-Biggs.ogg)

### Exciting (S10) L pod calls as the sun sets over Orcasound Lab

- [210825-1925_L-highlight.mp3](https://orcasound.net/data/product/biophony/SRKW/greatest-hits/210825-1925_L-highlight.mp3)

### First Orcasound recording of humpback song in Haro during January!

- [hb_2020_01_07_1800-1m40s.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2020/01/hb_2020_01_07_1800-1m40s.ogg)
- [hb_2020_01_07_1800-19min.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/01/hb_2020_01_07_1800-19min.mp3)

### Happy 4th! Bigg’s killer whales heard at Bush Point

- [200704-BP-Biggs_083430-084330.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/07/200704-BP-Biggs_083430-084330.mp3)
- [200704-BP-Biggs_0830-0930.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2020/07/200704-BP-Biggs_0830-0930.ogg)

### A Haro humpback howls as Halloween harkens

- [211026-1330-OS-humpback-highlight.mp3](https://orcasound.net/data/product/biophony/humpbacks-inland-WA-BC/2021-10-26/211026-1330-OS-humpback-highlight.mp3)
- [211026-133018-OS-humpback-47min-clip.mp3](https://orcasound.net/data/product/biophony/humpbacks-inland-WA-BC/2021-10-26/211026-133018-OS-humpback-47min-clip.mp3)

### Humpback and Bigg’s killer whales serenading in the darkness

- [20181202_25sec.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2018/12/20181202_25sec.mp3)
- [20181202_2.5min.mp3](https://orcasound.net/data/product/humpbacks-inland-WA-BC/2018-12-02/20181202_2.5min.mp3)

### J Pod Returns to the Orcasound Lab Hydrophone

- [rpi-orcasound-lab_2023_03_25_08_30_00.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2023/03/rpi-orcasound-lab_2023_03_25_08_30_00.mp3)

### K & L pods call in boat noise at Orcasound Lab

- [20190921_185526-30s-OrcasoundLab-KL-Nbound_LPNF.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2019/09/20190921_185526-30s-OrcasoundLab-KL-Nbound_LPNF.mp3)
- [20190921_185526-OrcasoundLab-KL-Nbound_LPNF.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2019/09/20190921_185526-OrcasoundLab-KL-Nbound_LPNF.mp3)

### L90 and her new calf vocalize & echolocate alone

- [240917-1700-OS-L90calf-highlight-2min.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2024/09/240917-1700-OS-L90calf-highlight-2min.mp3)

### Listeners detect J pod’s fourth fall visit to Puget Sound

- [201102-1455-Jpod-SB-bush_point_1min.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/11/201102-1455-Jpod-SB-bush_point_1min.mp3)
- [201102-1455-Jpod-SB-bush_point.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/11/201102-1455-Jpod-SB-bush_point.mp3)

### Lon first to hear J+K pods entering Puget Sound at Bush Point

- [201111-816-832-BP-JK-SB.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2020/11/201111-816-832-BP-JK-SB.ogg)
- [201111-816-832-BP-JK-SB-1.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2020/11/201111-816-832-BP-JK-SB-1.ogg)

### Orcas head north & south for Salish Sea salmon

- [200927_2105_BP-SRKW-superfaint.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/09/200927_2105_BP-SRKW-superfaint.mp3)
- [200927_223627_38min-BP-SRKW.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/09/200927_223627_38min-BP-SRKW.mp3)
- [200927_223727_BP-2min-ship-noiseSRKW.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/09/200927_223727_BP-2min-ship-noiseSRKW.mp3)
- [200927_224657-224757_1min-BP-SRKW.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/09/200927_224657-224757_1min-BP-SRKW.mp3)

### Orcasound’s Greatest Hits of 2021

- [210825-1925_L-highlight.mp3](https://orcasound.net/data/product/biophony/SRKW/greatest-hits/210825-1925_L-highlight.mp3)
- [biggs-calls-210811_2225.\_BP.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2022/02/biggs-calls-210811_2225._BP.mp3)
- [humpback-sequence_211028_OS.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2022/02/humpback-sequence_211028_OS.mp3)

### Election night humpback calls at Orcasound Lab

- [201103-2030-OS-humpback.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/11/201103-2030-OS-humpback.mp3)
- [201103-2002-2017-OS-humpback.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2020/11/201103-2002-2017-OS-humpback.mp3)

### (Almost) Superpod porpoises past Orcasound Lab – 8/17/2023

- [superpodSnippet.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2023/08/superpodSnippet.mp3)
- [callsInShipnoise.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2023/08/callsInShipnoise.mp3)
- [rpi-orcasound-lab_2023_08_17_16_55_00.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2023/08/rpi-orcasound-lab_2023_08_17_16_55_00.mp3)

### Underwater baby shower? Listen to J pod with new calf J59

- [220301-164715+6min-OS-SRKW-J.mp3](https://orcasound.net/data/product/biophony/SRKW/bouts/220301-1530-OS-SRKW_J/6-min-highlight/220301-164715+6min-OS-SRKW-J.mp3)

### Unusual SRKW calls at 2 a.m. in Haro Strait, and then ship noise (again)

- [20190323_0155_orcasound-lab-S42-S22.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2019/03/20190323_0155_orcasound-lab-S42-S22.mp3)

### When ships go bang in the night (in orca habitat)

- [10min-clip-w-bangs-haro.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2018/09/10min-clip-w-bangs-haro.ogg)
- [bang337.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2018/09/bang337.mp3)
- [concatenated.mp3](https://www.orcasound.net/wp2017/wp-content/uploads/2018/09/concatenated.mp3)
- [PWRAveDb102_02_06_2012_04_32_37.mp3](https://www.orcasound.net/wholistener/lk/detections/raw/2012/02/06/PWRAveDb102_02_06_2012_04_32_37.mp3)

## Upstream broken MP3 sources

These were already broken on WordPress; restoration uses the working OGG in the same original player:

- **Bigg’s bangs: the sound of marine mammal death heard live?** — `220181207_175315-5sec-4-Biggs-bangs-Orcasound-lab.mp3` returned 404; use [20181207_175315-5sec-4-Biggs-bangs-Orcasound-lab.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2018/12/20181207_175315-5sec-4-Biggs-bangs-Orcasound-lab.ogg).
- **Bigg’s bangs: the sound of marine mammal death heard live?** — `20080601-SRKW-percussives-LK.mp3` returned 404; use [20080601-SRKW-percussives-LK.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2018/12/20080601-SRKW-percussives-LK.ogg).
- **First Orcasound recording of humpback song in Haro during January!** — `hb_2020_01_07_1800-1m40s.mp3` returned 404; use [hb_2020_01_07_1800-1m40s.ogg](https://www.orcasound.net/wp2017/wp-content/uploads/2020/01/hb_2020_01_07_1800-1m40s.ogg).

## Run and verify

Use Node 24. From `studio/`:

```bash
npx sanity exec scripts/restore-blog-audio.mjs --with-user-token -- --report /tmp/blog-audio.json
npx sanity exec scripts/restore-blog-audio.mjs --with-user-token -- --apply /tmp/blog-audio.json
npx sanity exec scripts/restore-blog-audio.mjs --with-user-token -- --apply /tmp/blog-audio.json --commit
node --test scripts/blog-audio-utils.test.mjs
```

The report contains original bodies and revisions plus the proposed bodies. Keep it outside git as a rollback record. Reapplying an already applied report is a no-op. A fresh audit after restoration should report zero missing recordings.

For a same-session verification against the downloaded WordPress snapshots, add `--reuse-sources` to the audit command; a normal audit always downloads fresh pages.

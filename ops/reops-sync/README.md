# ReOps Resend → Sheet sync

A Google Apps Script that keeps the **"Orcasound Research Participants (ReOps)"**
Google Sheet in sync with the research panel in **Resend** (the
"Orcasound Product" segment). Part of #269 (Phase 3).

This is not website code: nothing here is built or deployed by Vercel. The
script runs inside Google, bound to the sheet.

**This folder is the source of truth for the code.** The running copy lives in
the sheet's Apps Script project ("ReOps Resend Sync"). If you change the code,
change it here first (with tests), then paste it into the Apps Script editor.

## What it does

Every day at about 6 AM it reads the segment from Resend and updates the
**Active** tab. One direction only: Resend → Sheet. It never writes to Resend
and never deletes rows. Each run appends one line of counts (no names or
emails) to the **Sync Log** tab.

| Who                     | What is synced                                                                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Everyone in the segment | `unsubscribed` mirrors Resend. `do_not_contact` is set to TRUE on unsubscribe and never cleared automatically.                                              |
| Subscribed people       | If Resend has a value that differs from the sheet, the sheet is updated. If Resend is empty (or `-`), the sheet keeps its value. See the field table below. |
| New sign-ups            | Added as rows with `consent_status = confirmed` (both sign-up forms require consent).                                                                       |

Rows are matched by `participant_id` (the Resend contact ID), then by email,
case-insensitive.

### Fields

| Resend                                                                                                                                                                                 | Sheet column                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| email                                                                                                                                                                                  | `email`                                                                                                          |
| first + last name                                                                                                                                                                      | `full_name`                                                                                                      |
| `role` + `conservation`                                                                                                                                                                | `interest_areas` (`ROLE \| CONSERVATION`)                                                                        |
| `source`                                                                                                                                                                               | `recruitment_source`, **only when empty** (keeps where the person originally came from, e.g. `mailchimp_import`) |
| `source`                                                                                                                                                                               | `resend_source` (the latest source)                                                                              |
| `optin_time`                                                                                                                                                                           | `opt_in_date` (never from the record's creation time)                                                            |
| `timezone`                                                                                                                                                                             | `location_timezone`                                                                                              |
| `what_is_your_occupation`                                                                                                                                                              | `occupation_or_background`                                                                                       |
| `subscriber` (website form "Email preference")                                                                                                                                         | `communication_preferences`                                                                                      |
| `region`, `cc`, `locality`, `what_generation_do_you_belong_to`, `prior_exposure` (website form "How did you first hear about Orcasound?"), and three legacy Mailchimp survey questions | `resend_*` columns, created on the right of the existing columns                                                 |

The list is an allowlist (`FIELD_MAP` in the script). Anything else is never
copied, in particular Mailchimp PII and internals (`optin_ip`, `confirm_ip`,
`address`, `euid`, `leid`, `send_batch`, `member_rating`, `tags`, …) and
researcher-only columns (`notes`, `persona`, `consent_version`,
`general_location`, `age_range`, study history, …).

Timestamps are written as UTC text `yyyy-MM-dd HH:mm:ss`, the same form as the
legacy Mailchimp rows.

### Safety

- If rows are inserted, deleted, or sorted while a run is in progress, it
  writes nothing and retries the next day.
- If one person has two Resend records that disagree (one subscribed, one
  unsubscribed), their row is left unchanged and the sheet row number is
  logged for a person to check. Fix such duplicates in Resend by removing one
  record from the segment (Contacts → ⋯ → Remove from segment). Don't delete
  contacts.
- Apps Script stops after 6 minutes. If fetching contact details runs long,
  the run applies what it has and the next run continues where it stopped.

## Setup (once, per owner)

1. Open the sheet → **Extensions → Apps Script** → project "ReOps Resend Sync".
2. Paste `reops_resend_sync.gs` into a file of that project and save.
3. Reload the sheet, then **ReOps sync → Set Resend API key** and paste a
   Resend API key. It must be a `full_access` key (Resend has no read-only
   keys). It's stored in the user's own properties, so other sheet editors
   can't see it. Don't put it in Script Properties: every editor can read those.
4. Run `previewSync` and check the log. It changes nothing.
5. Run `runSync`, then `installDailyTrigger`.

The trigger runs as the person who installed it and uses that person's key. If
ownership changes, the new owner repeats steps 3 and 5.

## Changing the code

```bash
node ops/reops-sync/reops_resend_sync.test.mjs   # also part of `npm test`
```

The tests run the script against a fake Sheet and a fake Resend API. Add a case
for any behavior you change. Then paste the new version into Apps Script and
run `previewSync` before `runSync`.

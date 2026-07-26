# Editing the Donate / Support page (Sanity CMS guide)

This guide walks you through editing the Support page copy on orcasound.tech
using Sanity Studio — the hero and the two support cards — all without touching
any code.

> **What is NOT edited here:** the partner logos further down the page live in a
> separate data file, and the "Ways to Support" pop-up (Open Collective / GitHub
> links) stays in code. Only the hero and the two support cards are editable in
> Sanity.

---

## 1. Open the Studio and sign in

1. Go to **https://orcahome.sanity.studio**
2. Sign in with the Google account that was given access (ask an admin if you
   can't get in — ping @Vicky on Zulip).

## 2. Open the Donate / Support Page

1. In the left sidebar, click **Donate / Support Page**.
2. The document opens with all the editable fields.

![The Studio sidebar with "Donate / Support Page" selected](images/donate-guide/01-sidebar.png)

---

## 3. The fields you can edit

| Field                                            | What it controls                                 |
| ------------------------------------------------ | ------------------------------------------------ |
| **Hero title**                                   | The big title on the top banner (e.g. "Support") |
| **Hero description**                             | The sentence under the banner title              |
| **Hero image**                                   | The top banner image                             |
| **Support Orcasound · title / message / image**  | The left support card                            |
| **Support Volunteers · title / message / image** | The right support card                           |

### Editing text

Click any text field and type. That's it.

![Editing a text field](images/donate-guide/02-text-field.png)

---

## 4. Changing an image

This works the same for the **Hero image** and the two card images.

1. Click the image field.
2. Click **remove** on the current image, then drag a new image in (or click to
   upload).
3. Optional: drag the crop/hotspot to control how it's framed.

![An image field with the upload/select menu open](images/donate-guide/03-image-field.png)

> **If you leave an image blank**, the site falls back to the original built-in
> photo — nothing breaks.

---

## 5. Publish your changes

Nothing goes live until you **publish**.

1. Click the green **Publish** button (bottom of the document).
2. If you see **"Unpublished changes"**, it means you have edits that are NOT
   live yet — click **Publish** to push them.

![The Publish button](images/donate-guide/04-publish.png)

> ⚠️ **Don't leave edits as an unpublished draft.** If a draft sits there
> unpublished, the live site keeps showing the old content. Always click
> **Publish** when you're done.

## 6. When will it show on the site?

After you publish, the live site (orcasound.tech) updates **within about a
minute**. Refresh the page (a hard refresh — Cmd/Ctrl + Shift + R) to see it.
You do **not** need a developer to deploy anything.

---

## Troubleshooting

| Problem                                                | What's going on                                                                                                                                                   |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "I edited it but the site still shows the old version" | Either you didn't **Publish**, or the ~1 minute refresh window hasn't passed. Check for an "Unpublished changes" indicator, publish, wait a minute, hard-refresh. |
| "A field looks empty in the Studio"                    | If a field is left blank, the site falls back to its built-in default text/image. Fill the field in the Studio to override it.                                    |
| "I want to change a partner logo"                      | Partner logos aren't in Sanity yet — those still live in the code's data file. Ask a developer.                                                                   |
| "I can't sign in"                                      | Ask an admin to grant your Google account access to the Sanity project.                                                                                           |

---

_Questions or something looks broken? ping @Vicky on Zulip._

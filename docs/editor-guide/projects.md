# Projects guide

Project pages describe what Orcasound does: a hydrophone, a research project,
a call catalog, an exhibit. They're listed on **orcasound.tech/projects**, and
each has its own page, like orcasound.tech/projects/bush-point-hydrophone.

![The Projects page on the website](/editor-guide/images/projects/06-site-projects.png)

Projects work a lot like blog posts. The difference is that a project isn't
news: its date isn't shown, and it has **categories** instead of tags.

To start, open **https://orcahome.sanity.studio** and click **Projects** in the
list on the left.

![The Studio, with Projects in the list on the left](/editor-guide/images/projects/01-studio-sidebar.png)

---

## Add a new project

1. Click **Projects** on the left, then the **＋** button at the top of the
   list of projects.
2. Fill in the boxes:

   | Box                   | What to put in it                                                                                                                                                     |
   | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **Title**             | The project's name.                                                                                                                                                   |
   | **Slug**              | The page's web address. Just click **Generate** and it's made from the title.                                                                                         |
   | **Published date**    | Only used to put the newest projects first on the Projects page. Visitors don't see it. Today's date is fine.                                                         |
   | **Categories**        | Reuse the existing ones: **Hydrophone locations**, **Research**, **Education & outreach**. Type one and press Enter.                                                  |
   | **Authors**           | Who wrote or leads the project, shown as "By …" under the title in this order. Drag to reorder. To add someone new, see [Add a new author](blog.md#add-a-new-author). |
   | **Short description** | Two or three sentences for the project's card on the Projects page. Longer text gets cut off.                                                                         |
   | **Featured image**    | The picture on the project's card. It is **not** shown on the project page itself; put pictures for the page in the **Body**.                                         |
   | **Body**              | The page itself. See [What goes on the page](#what-goes-on-the-page).                                                                                                 |

   ![A project open in the Studio](/editor-guide/images/projects/03-project-fields.png)

3. Click **Publish**. About a minute later the project appears on the Projects
   page.

A new project does **not** appear on the About page by itself. See
[Show a project on the About page](#show-a-project-on-the-about-page).

## Fix or update a project

Click the project in the list, change what you need, and click **Publish**.

Don't change the **Slug** of a project that's already published. It's the
page's web address: the About page cards, blog posts, and old links from
orcasound.net all point to it.

---

## What goes on the page

The **Body** box is the same as in a blog post, with the same toolbar:
headings, links, pictures (with a caption, and placed left, right, or
centered), photo galleries, tables, sections readers open with a click, and
audio or video players.

![The Body box of a project](/editor-guide/images/projects/04-project-body.png)

How to use each one is in the Blog guide:
[What you can put in a post](blog.md#what-you-can-put-in-a-post).

The audio in the projects brought over from the old website still plays from
orcasound.net. That's expected for now; don't remove those links.

---

## Show a project on the About page

The "Our Projects" cards on the About page are picked by hand, so the About
page can feature a few projects instead of all of them.

1. On the left, click **About Page** and scroll down to **Projects**.
2. To add a card, click **Add item** and fill in:
   - **Title**: the name on the card.
   - **Image**: the picture on the card.
   - **Link URL**: `/projects/` followed by the project's **Slug**, for
     example `/projects/orcasound-lab-hydrophone`.
3. To change where a card goes, click it and change its **Link URL**.
4. Drag the ⋮⋮ handle to change the order.
5. Click **Publish**.

![The Projects list on the About page](/editor-guide/images/projects/05-about-cards.png)

The menu at the top of every page already has a **Projects** link, so you
don't need to add anything there for a new project.

---

## Hide a project

Open the project, click the **⋮** next to **Publish**, and choose
**Unpublish**. It disappears from the website but stays in the Studio.

If an About page card links to it, remove or change that card too, or the card
will lead to a "page not found" error.

---

## Something's not right?

| What you see                                | What to do                                                                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| My project isn't on the Projects page       | Wait a minute and refresh. In the Studio, check the project says **Published**, not "Unpublished changes".                  |
| My new project isn't on the About page      | That's expected: About cards are picked by hand. See [Show a project on the About page](#show-a-project-on-the-about-page). |
| An About card leads to "page not found"     | Its **Link URL** doesn't match the project's **Slug**. Copy the slug from the project and fix the link.                     |
| The card has no picture                     | Add a **Featured image**.                                                                                                   |
| My featured image isn't on the project page | That's expected: it's only the card picture. Add the picture to the **Body** too.                                           |
| I can't sign in                             | Ask Vicky on Zulip to add your Google account.                                                                              |

Still stuck? Ask Vicky on Zulip.

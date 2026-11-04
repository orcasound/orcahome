# Blog guide

Blog posts are the news on **orcasound.tech/blog**. You can write new posts,
fix old ones, and add pictures, galleries, tables, audio, and video.

To start, open **https://orcahome.sanity.studio** and click **Blog Post** in
the list on the left. You'll see every post, newest first.

![The list of blog posts](/editor-guide/images/blog/02-blogpost-list.png)

---

## Write a new post

1. Click **Blog Post** on the left, then the **＋** button at the top of the
   list of posts.

2. Fill in the boxes:

   | Box                | What to put in it                                                                                                                         |
   | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
   | **Title**          | The headline.                                                                                                                             |
   | **Slug**           | The post's web address. Just click **Generate** and it's made from the title.                                                             |
   | **Published date** | The date shown on the post. Posts are listed newest first.                                                                                |
   | **Authors**        | Who wrote it. Pick from the list. If the person isn't there, see [Add a new author](#add-a-new-author).                                   |
   | **Excerpt**        | One or two sentences that sum up the post, for its card on the blog list. It isn't shown on the post itself; the post shows the **Body**. |
   | **Featured image** | The big picture at the top of the post, also used on its card in the blog list.                                                           |
   | **Tags**           | A few topic labels, like "Acoustic analysis" or "Orcasound Lab". Type one and press Enter. Reuse existing ones.                           |
   | **Body**           | The post itself. See [What you can put in a post](#what-you-can-put-in-a-post).                                                           |

   ![The boxes at the top of a post](/editor-guide/images/blog/03-blogpost-fields.png)

3. Click **Publish**. See [Publish and check](#publish-and-check).

## Fix or update a post

Click the post in the list, change what you need, and click **Publish**.

Don't change the **Slug** of a post that's already published. It's the post's
web address, so changing it breaks every link to it, including links from
other posts and from search engines.

---

## What you can put in a post

The **Body** box works like a simple word processor. Type, and use the
toolbar at the top of the box for everything else. Some buttons may be hidden
under **⋯** at the right end of the toolbar.

![The Body box and its toolbar](/editor-guide/images/blog/04-body-portabletext.png)

The same box, with the same buttons, is used on project pages.

### Text, headings, lists, and links

- **Bold**, _italic_, headings, and bulleted or numbered lists are in the
  toolbar.
- **A link:** select some words, click the link button, and paste the address.
  To link to another page on this site, you can paste just the part after
  `orcasound.tech`, like `/blog/my-post` or `/projects/bush-point-hydrophone`.
- Press Enter to start a new paragraph.

### A picture

1. Click **Image** in the toolbar and drag a picture in, or click to upload.
2. Click the picture to open its settings:
   - **Alt text**: a short description for people who can't see the picture.
   - **Caption** (optional): a line shown right under the picture, like what it
     shows and who took it.
   - **Position**:
     - **Default**: the picture sits on its own line.
     - **Left, text on the right** or **Right, text on the left**: the
       paragraphs after the picture flow beside it. Put the picture just
       before the paragraph you want next to it.
     - **Center**: the picture is centered on its own line.
   - **Size**: **Small**, **Medium**, **Large**, or **Full width**. Text only
     flows beside **Small** and **Medium** pictures; a **Large** picture is
     centered.

![A picture's settings: Alt text, Caption, Position, and Size](/editor-guide/images/blog/07-image-settings.png)

The editor doesn't show text flowing beside a picture. Under each picture it
shows a short label, like "⬅ Left · medium", and you see the real layout on
the website. On phones, pictures are always on their own line.

The **Featured image** at the top of the post is separate from pictures in the
Body.

### Several photos side by side (a gallery)

1. Choose **Gallery** in the toolbar.
2. Add two or more pictures. Each can have a **Caption**.
3. Pick **2** or **3** pictures per row.

![A gallery's settings: its pictures and how many per row](/editor-guide/images/blog/09-gallery.png)

On phones, galleries show two per row. If the last row has just one photo, it
fills the whole row.

### A table

1. Choose **Table** in the toolbar.
2. Under **Rows**, click **Add item** for each row of the table.
3. In each row, add one **Cell** for each column, left to right. Give every row
   the same number of cells.
4. Leave **First row is a header** on if the first row has the column titles.

![A table's settings: the header switch and its rows](/editor-guide/images/blog/08-table.png)

A cell that's just a web address (starting with `https://`) becomes a link.

### Something readers open with a click

Good for long lists, like references.

1. Choose **Collapsible section** in the toolbar.
2. Type a **Title**. Readers see only this, with a small arrow.
3. Put everything else in **Content**. It shows when readers click the title.

### Audio or a video

The website turns a link to an audio file or a video into a player:

1. On its own line, paste the address, for example
   `https://example.org/clips/humpback-whup.mp3` or
   `https://www.youtube.com/watch?v=K0vmU_Jf3f4`.
2. Select the whole address, click the link button, and paste the **same**
   address.

If the line is only the link, readers see just the player. If the link is
inside a sentence, they see the sentence with the player under it.

Audio files must end in `.mp3`, `.wav`, `.ogg`, or `.m4a`. Videos can be on
YouTube or Vimeo, or an `.mp4` file.

---

## Publish and check

1. Click the green **Publish** button at the bottom.

   ![The Publish button at the bottom of a post](/editor-guide/images/blog/06-publish.png)

2. Wait about a minute, then open **orcasound.tech/blog** and refresh with
   Cmd + Shift + R (Mac) or Ctrl + Shift + R (Windows). New posts are at the
   top.

If you see **"Unpublished changes"** at the bottom, your latest edits aren't
on the website yet. Click **Publish** again.

## Hide a post

Open the post, click the **⋮** next to **Publish**, and choose **Unpublish**.
It disappears from the website but stays in the Studio, so you can publish it
again later.

## Add a new author

Authors are shared by blog posts and project pages.

1. On the left, click **Author**, then **＋**.
2. Type their **Name** as it should appear on posts, for example "Cora Reese".
3. Click **Publish**, then go back to your post and pick them under
   **Authors**.

---

## Something's not right?

| What you see                            | What to do                                                                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| My post isn't on the blog               | Wait a minute and refresh. In the Studio, check the post says **Published**, not "Unpublished changes".                           |
| The post's card has no picture          | Add a **Featured image**.                                                                                                         |
| Text isn't flowing beside my picture    | Set **Position** to Left or Right and **Size** to Small or Medium, and put the picture just before that paragraph.                |
| My audio or video shows as a plain link | The link must point to the file itself (ending in `.mp3` etc.) or to YouTube or Vimeo. See [Audio or a video](#audio-or-a-video). |
| A link to my post stopped working       | The post's **Slug** was probably changed. Change it back.                                                                         |
| I can't sign in                         | Ask Vicky on Zulip to add your Google account.                                                                                    |

Still stuck? Ask Vicky on Zulip.

import Image from 'next/image'
import Link from 'next/link'

import blogStyles from '../styles/blog.module.css'

interface blogProps {
  image?: string
  title?: string
  summary?: string
  datePublished?: string
  author?: string
}

const blogItem = ({
  image,
  title,
  summary,
  datePublished,
  author,
}: blogProps) => {
  return (
    <>
      <div className={blogStyles.blogItem}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className={blogStyles.blogImage} />
        <div className={blogStyles.blogItemBody}>
          <h3 className={blogStyles.blogItemTitle}>{title}</h3>
          <p className={blogStyles.blogItemMetadata}>
            Posted on {datePublished} By {author}
          </p>
          <p className={blogStyles.blogItemSummary}>{summary}</p>
          <Link href="/blog">Read More...</Link>
        </div>
      </div>
    </>
  )
}

export default blogItem

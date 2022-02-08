import Image from 'next/image'
import Link from 'next/link'

import blogStyles from '../styles/blog.module.css'

interface blogItemProps {
  image: string
  title?: string
  summary?: string
  datePublished?: string
  author?: string
}

const BlogItem = ({
  image,
  title,
  summary,
  datePublished,
  author,
}: blogItemProps) => {
  return (
    <>
      <div className={blogStyles.blogItem}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image src={image} alt={title} width={300} height={260} />
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

export default BlogItem

import { Typography } from '@mui/material'
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
        <Image src={image} alt={title} width={300} height={250} />
        <div className={blogStyles.blogItemBody}>
          <Typography variant="h3" sx={{ fontSize: 22, fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography
            paragraph={true}
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: '#999999',
              textTransform: 'uppercase',
            }}
          >
            Posted on {datePublished} By {author}
          </Typography>
          <Typography paragraph={true} sx={{ fontSize: 16, fontWeight: 450 }}>
            {summary}
          </Typography>
          <Link href="/blog">Read More...</Link>
        </div>
      </div>
    </>
  )
}

export default BlogItem

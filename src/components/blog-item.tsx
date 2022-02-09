import { styled, Typography } from '@mui/material'
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

const BlogItemContainer = styled('div')({
  width: '48%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '20px 0',
})

const BlogItemBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 20px',
})

const BlogItem = ({
  image,
  title,
  summary,
  datePublished,
  author,
}: blogItemProps) => {
  return (
    <BlogItemContainer>
      <Image src={image} alt={title} width={300} height={250} />
      <BlogItemBody>
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
      </BlogItemBody>
    </BlogItemContainer>
  )
}

export default BlogItem

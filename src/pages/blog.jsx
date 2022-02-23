import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded'
import { Typography } from '@mui/material'
import { styled } from '@mui/system'

import frequency1 from '../../public/images/frequency.png'
import BlogItem from '../components/BlogItem'
import blogStyles from '../styles/blog.module.css'

// TODO: replace CSS module with MUI styled()
// should use next/image instead of backgroundImage
// eslint-disable-next-line no-unused-vars
const Banner = styled('div')({
  // backgroundImage: "url('../../public/images/frequency.png')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 55%',
})

const Overlay = styled('div')({
  height: '88vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(5, 28, 90, 0.3)',
})

const BlogItemList = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Blog = () => {
  const data = [
    {
      image: frequency1,
      title: 'Lone first to hear j+K pods entering Puget Sound at Bush Point',
      summary:
        'This morning at around 8:30, Lon Brocklehurst texted that he was hearing orcas on the Bush Point. Though it ...',
      date: '2020-11-11',
      author: 'Scott Veirs',
    },
    {
      image: frequency1,
      title: 'Election Night humpback calls at Orcasound',
      summary:
        'For about a half hour 20:00 this evening (Tues, 3 Nov 2020), Humpback calls were recorded at Orcasound',
      date: '2020-11-04',
      author: 'Scott Veirs',
    },
  ]

  return (
    <>
      <div className={blogStyles.banner}>
        <Overlay>
          <Typography
            variant="h1"
            sx={{ fontSize: 160, color: '#fff', fontWeight: 450 }}
          >
            Blog
          </Typography>
          <KeyboardDoubleArrowDownRoundedIcon
            sx={{
              fontSize: 100,
              color: '#fff',
              position: 'absolute',
              bottom: 1,
            }}
          />
        </Overlay>
      </div>
      <BlogItemList>
        {data.map((item, id) => (
          <BlogItem
            key={id}
            image={item.image}
            title={item.title}
            summary={item.summary}
            author={item.author}
            datePublished={item.date}
          />
        ))}
      </BlogItemList>
    </>
  )
}

export default Blog

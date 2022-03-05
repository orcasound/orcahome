import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded'
import { Typography } from '@mui/material'
import { styled } from '@mui/system'

import frequency1 from '../../public/images/frequency.png'
import topbanner from '../../public/images/srkw2-36.jpg'
import BlogItem from '../components/BlogItem'
import TopBanner from '../components/TopBanner'
import blogStyles from '../styles/blog.module.css'

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
      <TopBanner bannerImg={topbanner} bannerAlt={`Blog`} pageTitle={`Blog`} />
      <BlogItemList id="scroll-link">
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

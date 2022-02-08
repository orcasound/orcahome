import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded'

import frequency1 from '../../public/images/frequency.png'
import BlogItem from '../components/blog-item'
import blogStyles from '../styles/blog.module.css'

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
        <div className={blogStyles.overlay}>
          <h1 className={blogStyles.bannerText}>Blog</h1>
          <KeyboardDoubleArrowDownRoundedIcon
            sx={{
              fontSize: 100,
              color: '#fff',
              position: 'absolute',
              bottom: 1,
            }}
          />
        </div>
      </div>
      <section className={blogStyles.blogList}>
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
      </section>
    </>
  )
}

export default Blog

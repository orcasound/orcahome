import Image from 'next/image'

import chevronDown from '../../public/icons/chevron-down.svg'
import blogStyles from '../styles/blog.module.css'

const blog = () => {
  return (
    <>
      <div className={blogStyles.banner}>
        <div className={blogStyles.overlay}>
          <h1 className={blogStyles.bannerText}>Blog</h1>
          <Image src={chevronDown} alt="chevron-down" />
        </div>
      </div>
      <section className={blogStyles.blogList}></section>
    </>
  )
}

export default blog

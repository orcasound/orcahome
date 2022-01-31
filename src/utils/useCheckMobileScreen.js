import { useEffect, useState } from 'react'

const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(0)
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return width <= 700
}

export default useCheckMobileScreen

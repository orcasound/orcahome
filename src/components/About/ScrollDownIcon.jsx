import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { Link as ReactScroller } from 'react-scroll'

const ScrollDownIcon = () => {
  return (
    <ReactScroller to="page" smooth="true" duration={1000}>
      <KeyboardDoubleArrowDownIcon
        sx={{
          color: 'white',
          fontSize: '5vw',
        }}
      />
    </ReactScroller>
  )
}

export default ScrollDownIcon

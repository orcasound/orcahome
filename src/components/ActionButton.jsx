import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

//ActionButton receives 'buttonLink and buttonText' as props.
//'buttonText' recieves the text you want to place inside of the button.
//buttonLink determines the href that the user is directed to after clicking the button.
const ActionButton = ({ link, text }) => {
  //theme utilized from theme.ts
  return (
    <div>
      <Button
        href={buttonLink}
        variant="contained"
        sx={ (theme) => ({
          margin: '1rem',
          color: `${theme.palette.text.primary}`,
          bgcolor: `${theme.palette.primary.main}`,
          width: '12rem',
          borderRadius: 40,
          ':hover': {
            color: `${theme.palette.text.primary}`,
          },
        }}
        size="small"
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default ActionButton
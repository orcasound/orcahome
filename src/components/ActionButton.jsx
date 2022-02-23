import Button from '@mui/material/Button'

// ActionButton receives `link` and `text` as props.
// `text` receives the text you want to place inside of the button.
// `link` determines the href that the user is directed to after clicking the button.
const ActionButton = ({ link, text }) => {
  return (
    <div>
      <Button
        href={link}
        variant="contained"
        sx={(theme) => ({
          margin: '1rem',
          color: theme.palette.text.primary,
          bgcolor: theme.palette.primary.main,
          width: '12rem',
          borderRadius: 40,
          ':hover': {
            color: theme.palette.text.primary,
          },
        })}
        size="small"
      >
        {text}
      </Button>
    </div>
  )
}

export default ActionButton

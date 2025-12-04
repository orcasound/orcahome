import Button from '@mui/material/Button'

interface dateProps {
  date: string | Date
}

export const LastDetection = (props: dateProps): JSX.Element => {
  const MS_PER_HOUR = 1000 * 60 * 60
  const currentDate: Date = new Date()
  const lastDate: Date = new Date(props.date)
  const dateDiff = Math.abs(+lastDate - +currentDate)
  const dayDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24))
  const hoursDiff = Math.abs(+lastDate - +currentDate) / MS_PER_HOUR
  return (
    <>
      <Button variant="contained">
        {dateDiff < 8.64e7
          ? hoursDiff > 1
            ? `${hoursDiff.toFixed(1)} Hours`
            : `< 1 Hour `
          : dayDiff === 1
          ? `${dayDiff} Day`
          : `${dayDiff} days`}
        since activity
      </Button>
    </>
  )
}

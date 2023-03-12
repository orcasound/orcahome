import Button from '@mui/material/Button'

interface dateProps {
  date: Date
}

export const LastDetection = (props: dateProps): JSX.Element => {
  const currentDate: Date = new Date()
  console.log(currentDate)
  const lastDate: Date = new Date('Sun Mar 12 2023 13:08:08 GMT-0500')
  lastDate.toUTCString()
  currentDate.toUTCString()
  const dateDiff = Math.abs(+lastDate - +currentDate)
  const dayDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24))
  const hoursDiff = Math.abs(+lastDate - +currentDate) / 36e5
  const minutesDiff = Math.floor(dateDiff / 1000 / 60)
  return (
    <>
      <Button variant="contained">
        {dateDiff < 8.64e7
          ? hoursDiff > 1
            ? hoursDiff + ' ' + 'Hours'
            : '< 1' + ' ' + 'Hour'
          : dayDiff === 1
          ? dayDiff + ' ' + 'Day'
          : dayDiff + ' ' + 'Days'}{' '}
        since activity
      </Button>
    </>
  )
}

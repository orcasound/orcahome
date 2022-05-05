import CircleIcon from '@mui/icons-material/Circle'
import { styled } from '@mui/material'
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

const TechListIcon = styled(CircleIcon)({
  color: '#000',
  width: '8px',
  transform: 'translateY(3px)',
})

const TechListItem = ({ text, subItem, children }) => {
  return (
    <Box>
      <ListItem
        sx={{
          width: '90%',
          margin: '0',
          marginLeft: subItem ? '30px' : '0',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <ListItemIcon>
            <TechListIcon />
          </ListItemIcon>
          <ListItemText
            sx={{
              transform: 'translateX(-35px)',
            }}
            primary={text}
          />
        </Box>
      </ListItem>
      {children}
    </Box>
  )
}

const TechStackList = () => {
  return (
    <List aria-labelledby="nested-list-subheader">
      <TechListItem text="Orcanode: Linux-based ADC with live-streaming">
        <List>
          <TechListItem
            subItem
            text="Bush Point & Port Townsend: ffmpeg+s3fs in a bash script"
          />
          <TechListItem
            subItem
            text="Orcasound Lab: testing new Python script using ffmpeg+boto+/-redis"
          />
        </List>
      </TechListItem>

      <TechListItem text="Orcasite: front- and back-end of the Orcasound app">
        <List>
          <TechListItem
            subItem
            text="backend is an Elixir app using the Phoenix framework."
          />
          <TechListItem subItem text="the Phoenix app serves a React app" />
          <TechListItem subItem text="Public site — live.orcasound.net" />
        </List>
      </TechListItem>
    </List>
  )
}

export default TechStackList

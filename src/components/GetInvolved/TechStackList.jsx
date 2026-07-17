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

// Built-in list, used verbatim whenever Sanity supplies no `items`.
const DEFAULT_TECH_STACK = [
  {
    text: 'Orcanode: Linux-based ADC with live-streaming',
    subItems: [
      'Bush Point & Port Townsend: ffmpeg+s3fs in a bash script',
      'Orcasound Lab: testing new Python script using ffmpeg+boto+/-redis',
    ],
  },
  {
    text: 'Orcasite: front- and back-end of the Orcasound app',
    subItems: [
      'backend is an Elixir app using the Phoenix framework.',
      'the Phoenix app serves a React app',
      'Public site — live.orcasound.net',
    ],
  },
]

const TechStackList = ({ items }) => {
  const stack = items?.length ? items : DEFAULT_TECH_STACK
  return (
    <List aria-labelledby="nested-list-subheader">
      {stack.map((item, index) => (
        <TechListItem key={index} text={item.text}>
          {item.subItems?.length ? (
            <List>
              {item.subItems.map((subItem, subIndex) => (
                <TechListItem key={subIndex} subItem text={subItem} />
              ))}
            </List>
          ) : null}
        </TechListItem>
      ))}
    </List>
  )
}

export default TechStackList

import styled from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { createTheme } from '@material-ui/core/styles';


//custom theme for coloring
const theme = createTheme({
  palette: {
    primary: {
      light: 'purple',
      main: 'purple',
      dark: 'purple',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: 'purple',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

//receives 'buttonElements' from index.js -- Custom text can be passed using the elements array. //
const MainButton = ({elements}) => {
  return (
    <div>
      <Button variant='contained' sx={{margin: '1rem', bgcolor:'#101738 !important', width: '12rem', borderRadius:'40px'}} size='small'
      >
      {elements}
      </Button>
    </div>
    );
}

export default MainButton;


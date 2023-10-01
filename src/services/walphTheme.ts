import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import '@fontsource/zen-kaku-gothic-new'

export const walphTheme = createTheme({
  palette: {
    background: {
      default: 'rgb(142, 12, 196, 0.9)',
    }
  },
  typography: {
    allVariants: {
      color: '#000000',
      fontFamily: ['Zen Kaku Gothic New', 'sans-serif'].join(','),
      fontWeight: 'bold'
    },

    h2: {
      color: '#ffffff',
      fontFamily: ['Zen Kaku Gothic New', 'sans-serif'].join(','),
      fontWeight: 'bold'
    },
    h4: {
      color: '#ffffff',
      fontFamily: ['Zen Kaku Gothic New', 'sans-serif'].join(','),
      fontWeight: 'bold'
    },
    h5: {
      color: '#000000',
      fontWeight: 'bold'
    },
    h6: {
      color: '#ffffff',
      fontWeight: 'bold'
    }
  }
})

export const WalphButton = styled(Button)({
  display: 'inline-block',
  marginRight: '1em',
  marginLeft: '1em',
  backgroundColor: '#FEC26C',
  borderRadius: '10px',
  fontSize: 16,
  color: '#000000',
  fontWeight: 'bold',
  fontFamily: ['Zen Kaku Gothic New', 'sans-serif'].join(','),
  '&:hover': {
    backgroundColor: '#ffb03f',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#ffb03f',
    borderColor: '#0062cc',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#00000',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '10px'
}))

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ThemeProvider} from '@mui/material/styles'
import { theme } from './theme'
import {CssBaseline} from '@mui/material'
import { Provider } from 'react-redux/es/exports'
import store from '../src/store/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
)

import * as React from 'react'
import Head from 'next/head'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Meta from '../components/meta'
import ColorSwitcher from '../components/color-switcher'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import '../public/inter.css'

const App = ({ Component, pageProps }) => {
  return (
    <GeistProvider>
      <ThemeProvider theme={theme}>
        <Meta />
        <Component {...pageProps} />
      </ThemeProvider>
    </GeistProvider>
  )
}

export default App

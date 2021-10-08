import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'

const theme = {
  colors: {
    purple: '#603F8D',
    green: '#09BC8A',
    blue: '#1282A2',
    yellow: '#DEC402',
    red: '#DB5461',
    white: '#DCEDFF',
    orange: '#F26419',
  },
}

function Wrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options })

export * from '@testing-library/react'
export { customRender as render }

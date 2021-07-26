import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import App from './App'
import store from './redux'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // The code below prevents contenteditable elements from changing their height while they are empty
  *[contenteditable]:empty:before {
    content: "\feff"; /* ZERO WIDTH NO-BREAK SPACE */
  }
`

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

theme.answersColors = [
  theme.colors.blue,
  theme.colors.yellow,
  theme.colors.red,
  theme.colors.orange,
]

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
        <GlobalStyle />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js', { scope: '/' })
      .then(reg => {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope)
      })
      .catch(error => {
        // registration failed
        console.log('Registration failed with ' + error)
      })
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import App from './App'
import * as serviceWorker from './serviceWorker'
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

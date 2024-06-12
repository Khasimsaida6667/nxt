import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {UsernameProvider} from './UsernameContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UsernameProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UsernameProvider>,
)

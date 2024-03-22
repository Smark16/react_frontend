import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { userContext } from './Authenticate.jsx/Auth.jsx'

const token = localStorage.getItem('authtokens')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <userContext.Provider value={token}>
    <App />
    </userContext.Provider>
  </React.StrictMode>,
)

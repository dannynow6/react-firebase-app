import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// use Context Provider for single source of truth
import Provider from './context/FirestoreContext'
import AuthProvider from './context/AuthContext'

function Stocks () {
  return <h1>My Stock Images</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider>
        <Router>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/stocks' element={<Stocks />} />
          </Routes>
        </Router>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
)
// Note: each Route takes path (specifying path) and element 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

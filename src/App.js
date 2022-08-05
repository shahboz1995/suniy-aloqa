import React from 'react'
import Card from './Card'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Card />
    </div>
  )
}

export default App

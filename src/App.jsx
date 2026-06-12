import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './components/runFiles'
import AddFiles from './components/addFiles' 


function App() {

  return (
    <>
      <div>
        <Router>
          <nav>
            <Link to='/'>Run Scripts</Link>
            <Link to='/add'>Add Scripts</Link>
          </nav>
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/add' element={<AddFiles />} /> 
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App

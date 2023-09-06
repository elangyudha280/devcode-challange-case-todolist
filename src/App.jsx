import { useState } from 'react'


// import router
import { Routes,Route } from 'react-router-dom'

// import page componet
import HomePage from './pages/homepage'

function App() {

  return (
    <>
      <Routes>
        {/* router home */}
        <Route path='/' element={<HomePage/>} />
      </Routes>
    </>
  )
}

export default App

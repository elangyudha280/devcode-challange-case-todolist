import { useState } from 'react'


// import router
import { Routes,Route } from 'react-router-dom'

// import page component
import HomePage from './pages/homepage'
import DetailPage from './pages/detailPage'



function App() {

  return (
    <>
      <Routes>
        {/* router home */}
        <Route path='/' element={<HomePage/>} />
        {/* Router Detail activity */}
        <Route path='/detail/:id' element={<DetailPage/>} />
      </Routes>
    </>
  )
}

export default App

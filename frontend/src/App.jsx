import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'


const App = () => {
  
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={<ChatPage  />} />

      </Routes>
    </div>
  )
}

export default App

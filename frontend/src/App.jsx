import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import ProtectedRoutes from './routes/ProtectedRoutes'


const App = () => {
  
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={
          <ProtectedRoutes>
            <ChatPage  />
          </ProtectedRoutes>
        } />

      </Routes>
    </div>
  )
}

export default App

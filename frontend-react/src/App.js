import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import Calculator from './pages/Calculator'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<><Dashboard /><Calculator /></>} />
        <Route path='*' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

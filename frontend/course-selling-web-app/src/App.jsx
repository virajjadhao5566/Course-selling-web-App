import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Signin from './Components/Signin'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
function App() {
  return (
    <div style={{
      width:'100vw',
      height:'100vh',
      backgroundColor:'#eeeeee'
    }}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signin" element={<Signin />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

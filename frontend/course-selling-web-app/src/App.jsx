import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Signin from './Components/Signin'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import AddCourse from './Components/AddCourse';
import Courses from './Components/Courses';
import Course from './Components/Course';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import { BASE_URL } from './config';
import { Landing } from './Components/Landing';

function App() {
  return (
    <RecoilRoot>
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#eeeeee'
      }}>
        <Router>
          <Navbar />
          <InitUser />
          <Routes>
            <Route path='/courses' element={<Courses />} />
            <Route path='/course/:courseId' element={<Course />}></Route>
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element= {<Landing/>} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  )
}

let InitUser = () => {
  const setUser = useSetRecoilState(userState)
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username
        })
      } else {
        setUser({
          isLoading: false,
          userEmail: null
        })
      }
    } catch (e) {

      setUser({
        isLoading: false,
        userEmail: null
      })
    }
  };
  useEffect(() => {
    init();
  }, []);

  return <></>
}



export default App

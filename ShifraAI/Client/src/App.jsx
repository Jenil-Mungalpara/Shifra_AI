import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom' 
import Login from './pages/Login'
import Home from './pages/Home'
import axios from 'axios'
export const ServerUrl = "http://localhost:8000"


function App() {

  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{

    const fetchMe = async ()=>{
      try {
        const res = await axios.get
        (ServerUrl+"/api/user/current-user",
        {withCredentials:true}
        )
        console.log(res.data)
        setUser(res.data)
        setLoading(false)
      } 
      catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMe()

  },[])

  return (
    <>
        <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route  path='/login' element={<Login/>}/>
        </Routes>
    </>
      
  )
}

export default App

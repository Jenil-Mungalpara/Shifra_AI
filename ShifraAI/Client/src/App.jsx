import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom' 
import Login from './pages/Login'
import Home from './pages/Home'
import axios from 'axios'
import Builder from './pages/Builder'
import Billing from './pages/Billing'
import Navbar from './components/Navbar'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
export const ServerUrl = "http://localhost:8000"
import {Toaster} from "react-hot-toast"


function App() {

  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

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
        <Toaster position='top-right'/>

        <Routes>
          <Route  path='/login' element={<Login setUser={setUser}/>}/>
  
          <Route path='/*' element={<ProtectedRoute user = {user} loading={loading}>
             <Navbar setUser={setUser} user={user}/>
             <Routes>
               <Route  path='/' element={<Home user={user}/>}/>
               <Route path='/builder' element={<Builder user={user} setuser={setUser}/>} />
                <Route path='/billing' element={<Billing user={user}/>} />
                <Route path='/' element={<Navigate to="/" replace/>} />
             </Routes>
          </ProtectedRoute>} />
        </Routes>
    </>
      
  )
}

export default App

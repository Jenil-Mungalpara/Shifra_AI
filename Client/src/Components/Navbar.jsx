import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.svg"
import { FiLogOut, FiMenu } from "react-icons/fi";
import { ServerUrl } from '../App';
import { linkWithCredential } from 'firebase/auth';
import toast from "react-hot-toast"
import axios from 'axios';
import { FiX } from "react-icons/fi";
const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate()

  const [menuOpen,setMenuOpen] = useState(false)


  const handleLogout = async(req,res)=>{
     try {
       await axios.get(ServerUrl+"/api/auth/logout",
        {withCredentials:true}
       )
       setUser(null)
       toast.success("Logout successfully")
       navigate("/login")
     } catch (error) {
       toast.error("Logout failed")
       console.log(error);
     }
  }

  return (
    <div className='sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between'>

        <div onClick={() => navigate("/")} className='flex items-center gap-2.5 cursor-pointer'>
           <img src={logo} alt="logo" className='h-9 w-auto object-contain' />
           
           <h1 className='font-bold text-xl text-gray-700 leading-none'>
             Shifra <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500'>AI</span>
           </h1>
        </div>

        {/* right div */}
        
        {user && (
         
          <div className='flex items-center gap-3'>
            
             <button 
               onClick={() => navigate("/builder")} 
               className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium shadow-md hover:scale-[1.02] transition-all cursor-pointer'
             >
              Builder
             </button>

             <button 
               onClick={() => navigate("/billing")} 
               className='px-4 py-2 rounded-xl border border-orange-100 bg-white text-gray-700 text-sm font-medium hover:border-purple-300 transition-all cursor-pointer'
             >Billing</button>

             <div className='flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-orange-100 shadow-sm'>

                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0'>
                  <span className='text-white text-sm font-bold'>
                     {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>

                <div className='max-w-[140px]'>
                   {/* FIX: Added optional chaining just in case name or email are missing */}
                   <p className='text-sm font-semibold text-gray-800 truncate'>
                     {user?.name || "User"}
                   </p>
                   <p className='text-xs text-gray-400 truncate'>
                     {user?.email || ""}
                   </p>
                </div>

                <button onClick={handleLogout} className='ml-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer'>
                     <FiLogOut size={18}/>
                </button>

              </div>





          </div>
        )}

        {user &&(
          <button onClick={()=>setMenuOpen(!menuOpen)} className='md:hidden text-gray-600 hover:text-purple-500 transition-colors'> 

            {menuOpen ? <FiX size={22}/> : <FiMenu size={22}/>}

          </button>
        )}

      </div>
      {menuOpen && (
        <div className='md:hidden px-4 pb-4'>
           <div className='bg-white rounded-2xl border border-orange-100 shadow-lg p-4'>
             <div className='flex items-center gap-3 pb-4 border-b border-orange-100 '>
                 <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0'>
                  <span className='text-white text-sm font-bold'>
                     {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>

                <div className='flex-1 overflow-hidden'>
                  
                   <p className='text-sm font-semibold text-gray-800 truncate'>
                     {user?.name || "User"}
                   </p>
                   <p className='text-xs text-gray-400 truncate'>
                     {user?.email || ""}
                   </p>
                </div>
                
             </div>
              <div className='flex flex-col gap-3 mt-4'>
                  <button className='w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium' onClick={()=>{navigate('/builder');setMenuOpen(false)}}>Builder</button>

                  <button className='w-full py-2.5 rounded-xl border border-orange-100 bg-white text-gray-700 text-sm font-medium' onClick={()=>{navigate('/billing');setMenuOpen(false)}}>Billing</button>
              </div>
              <button onClick={()=>{setMenuOpen(false);handleLogout()}} className='mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors test-sm font-medium'><FiLogOut size={16}/>Logout
              </button>
           </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
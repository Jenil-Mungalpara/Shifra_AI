import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({user,loading,children}) => {
    
    if(loading){
        return (
            <div className='min-h-screen flex items-center justify-center bg-slate-100'>
                <div className='w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin'/>
            </div>
        )
    }
    if(!user) return <Navigate to = "/login" replace/>

    return children;
}

export default ProtectedRoute
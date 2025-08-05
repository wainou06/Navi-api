import { useState } from 'react'
import './App.css'
import { Register } from './components/register'
import { Login } from './components/login'
import { useSelector } from 'react-redux'
function App() {
   const slice = useSelector((state) => state.slice)
   console.log(slice)
   return (
      <div>
         {!slice.isAuthenticated ? (
            <div>
               <Register></Register>
               <Login></Login>
            </div>
         ) : (
            <></>
         )}
      </div>
   )
}

export default App

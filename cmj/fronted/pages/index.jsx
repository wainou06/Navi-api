import { useState } from 'react'
import { Register } from '../src/components/register'
import { Login } from '../src/components/login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from '../redux/slice'
import { Logout } from '../src/components/logout'
import { Keyword } from '../src/components/keyword'
import { Item } from '../src/components/item'

const Index = () => {
   const slice = useSelector((state) => state.slice)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   return (
      <>
         {!slice.isAuthenticated ? (
            <div>
               <Register></Register>
               <Login></Login>
            </div>
         ) : (
            <div>
               <Logout></Logout>
               <Keyword></Keyword>
               <Item></Item>
            </div>
         )}
      </>
   )
}

export default Index

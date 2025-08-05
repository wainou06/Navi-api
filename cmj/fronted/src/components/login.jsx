import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserThunk } from '../../redux/slice'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
   const [email, setEmail] = useState('a')
   const [password, setPassword] = useState('a')
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onClick = () => {
      if (!email.trim() || !password.trim()) {
         alert('모두 입력해 주세요')
         return
      }
      dispatch(loginUserThunk({ email, password }))
         .unwrap()
         .then(() => {})
         .catch((error) => {
            console.error('로그인 실패: ', error)
         })
      setEmail('')
      setPassword('')
   }
   return (
      <div>
         Login
         <br></br>
         <input
            type="text"
            placeholder="id"
            value={email}
            onChange={(e) => {
               setEmail(e.target.value)
            }}
         ></input>
         <br></br>
         <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
         {/* <br></br> */}
         <input onClick={onClick} type="button" value={'sub'} style={{ cursor: 'pointer' }}></input>
      </div>
   )
}

import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../redux/slice'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onClick = () => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then()
         .catch((error) => {
            alert(`로그아웃 실패: ${error}`)
            console.log(error)
         })
   }
   return <button onClick={onClick}>로그아웃</button>
}

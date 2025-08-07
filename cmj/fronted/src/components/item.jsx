import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postItemThunk } from '../../redux/slice'

export const Item = () => {
   const dispatch = useDispatch()
   const [name, setName] = useState('')

   const onclickAdd = () => {
      if (!name.trim()) {
         alert('상품이 비어있어요')
         return
      }
      dispatch(postItemThunk(name))
         .unwrap()
         .then()
         .catch((error) => {
            alert('상품 등록 실패: ', error)
         })

      setName('')
   }

   return (
      <>
         Add item
         <br></br>
         <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="상품 추가"></input>
         <button onClick={onclickAdd}>add</button>
      </>
   )
}

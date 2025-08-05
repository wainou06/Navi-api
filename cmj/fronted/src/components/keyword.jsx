import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postKeywordThunk } from '../../redux/slice'

export const Keyword = () => {
   const [keyword, setKeyword] = useState('')
   const dispatch = useDispatch()

   const onClick = () => {
      alert(keyword)
      dispatch(postKeywordThunk(keyword))
         .unwrap()
         .then()
         .catch((error) => {
            alert('키워드 등록 실패: ', error)
         })
      setKeyword('')
   }
   return (
      <div>
         <input value={keyword} type="text" placeholder="키워드" onChange={(e) => setKeyword(e.target.value)}></input>
         <button onClick={onClick}>sub</button>
      </div>
   )
}

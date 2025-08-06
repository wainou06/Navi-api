import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKeywordThunk, postKeywordThunk } from '../../redux/slice'
import { useEffect } from 'react'

export const Keyword = () => {
   const [keyword, setKeyword] = useState('')
   const [selected, setSelected] = useState(false)
   const dispatch = useDispatch()
   const { keywords, loading } = useSelector((state) => state.slice)

   useEffect(() => {
      dispatch(getKeywordThunk())
   }, [dispatch])

   const onClickAdd = () => {
      if (!keyword.trim()) {
         alert('키워드가 비어있어요')
         return
      }
      dispatch(postKeywordThunk(keyword))
         .unwrap()
         .then()
         .catch((error) => {
            alert('키워드 등록 실패: ', error)
         })
      setKeyword('')
   }

   const list = () => {
      if (keywords.keywords) {
         let out = []
         for (let i = 0; i < keywords.keywords.length; i++) {
            out.push(
               <option key={keywords.keywords[i].id} value={keywords.keywords[i].name}>
                  {keywords.keywords[i].name}
               </option>
            )
         }
         return out
      }
   }

   const onChangeSelect = (value) => {
      if (value == '') {
         setSelected(false)
         setKeyword('')
         return
      }
      setSelected(true)
      setKeyword(value)
   }

   const onClickEdit = () => {
      if (!keyword.trim()) {
         alert('비어있어요')
         return
      }
   }

   const onclickDelete = () => {}

   return (
      <div>
         {!loading ? (
            <>
               Keywords
               <br></br>
               <select onChange={(e) => onChangeSelect(e.target.value)}>
                  <option value={''}>키워드 추가하기</option>
                  {list()}
               </select>
               <br></br>
               {selected ? (
                  <>
                     Edit keyword
                     <br></br>
                     <input value={keyword} type="text" placeholder="키워드 수정" onChange={(e) => setKeyword(e.target.value)}></input>
                     <button onClick={onClickEdit}>edit</button>
                     <button onClick={onclickDelete}>delete</button>
                  </>
               ) : (
                  <>
                     Add keyword
                     <br></br>
                     <input value={keyword} type="text" placeholder="키워드 추가" onChange={(e) => setKeyword(e.target.value)}></input>
                     <button onClick={onClickAdd}>add</button>
                  </>
               )}
            </>
         ) : (
            <>로딩중</>
         )}
      </div>
   )
}

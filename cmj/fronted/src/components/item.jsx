import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKeywordThunk, postItemThunk } from '../../redux/slice'
import { useEffect } from 'react'

export const Item = () => {
   const dispatch = useDispatch()
   const [name, setName] = useState('')
   const [addKeywords, setAddKeywords] = useState([])
   const { keywords, loading } = useSelector((state) => state.slice)
   const [selectedKeyword, setSelectedKeyword] = useState('')

   useEffect(() => {
      dispatch(getKeywordThunk())
   }, [dispatch])

   const onclickAdd = () => {
      if (!name.trim()) {
         alert('상품이 비어있어요')
         return
      }
      dispatch(postItemThunk({ name, addKeywords }))
         .unwrap()
         .then(() => {
            setAddKeywords([])
            dispatch(getKeywordThunk())
         })
         .catch((error) => {
            alert('상품 등록 실패: ', error)
         })

      setName('')
   }

   const onclickKeyword = () => {
      if (!selectedKeyword.trim()) {
         alert('키워드를 선택해 주세요')
         return
      }
      if (addKeywords?.find((item) => item.name === selectedKeyword)) {
         alert('같은 키워드가 있어요')
         return
      }

      const keyword = keywords?.keywords?.find((item) => item.name === selectedKeyword)

      setAddKeywords([...addKeywords, keyword])
   }

   const onClickremoveKeyword = () => {}

   return (
      <>
         Add item keyword
         <br></br>
         {addKeywords.map((addKeyword) => (
            <span onClick={(e) => onClickremoveKeyword(e.target.value)} key={addKeyword.id}>
               {`${addKeyword.name} `}
            </span>
         ))}
         <select onChange={(e) => setSelectedKeyword(e.target.value)}>
            <option value={''}>키워드 추가하기</option>
            {keywords?.keywords?.map((keyword) => (
               <option key={keyword.id} value={keyword.name}>
                  {keyword.name}
               </option>
            ))}
         </select>
         <button onClick={onclickKeyword}>add</button>
         <br></br>
         Add item
         <br></br>
         <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="상품 추가"></input>
         <button onClick={onclickAdd}>add</button>
      </>
   )
}

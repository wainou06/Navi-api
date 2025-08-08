import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getKeywordThunk, getMatchingThunk } from '../../redux/slice'

export const Matching = () => {
   const [selected, setSelected] = useState('')
   const dispatch = useDispatch()
   const { keywords, loading, matchingItems } = useSelector((state) => state.slice)

   console.log(matchingItems)

   useEffect(() => {
      dispatch(getKeywordThunk())
      dispatch(getMatchingThunk())
   }, [dispatch])

   const onclickMatching = () => {
      dispatch(getMatchingThunk(selected))
         .unwrap()
         .then(() => {
            dispatch(getKeywordThunk())
         })
         .catch((error) => {
            alert('키워드 상품 찾기 실패: ', error)
         })
      setSelected('')
   }

   return (
      <>
         <br></br>
         Select keyword
         <br></br>
         <select onChange={(e) => setSelected(e.target.value)}>
            <option value={''}>키워드 선택하기</option>
            {keywords?.keywords?.map((keyword) => (
               <option key={keyword.id} value={keyword.name}>
                  {keyword.name}
               </option>
            ))}
         </select>
         <button onClick={onclickMatching}>select</button>
         <br></br>
         Item by keyword
         <br></br>
         <ul>
            {matchingItems?.items?.map((item) => (
               <li>{item.itemNm}</li>
            ))}
         </ul>
         <br></br>
      </>
   )
}

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Index from '../pages'
function App() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Index></Index>}></Route>
         </Routes>
      </div>
   )
}

export default App

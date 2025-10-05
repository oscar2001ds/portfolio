import './App.css'
import 'swiper/css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PrincipalPageClassic } from './containers/pages/PrincipalPageClassic'
import { StrictMode } from 'react'
import { globalVariables } from './store/globalStore'



function App() {
  const { pageMode } = globalVariables()
  return (
    <>

      {/* {pageMode === 'red' ?
        <div className='absolute inset-0 opacity-100  bg--[#060b10ff]'></div>
        : pageMode === 'blue' ?
          <div className='absolute inset-0 opacity-100  bg-[#091b2aff]'></div>
          : ''
      } */}
      <Router>
        <Routes>
          <Route path='/*' element={<PrincipalPageClassic />} />
          <Route path='/PrincipalPageClassic' element={<PrincipalPageClassic />} />
        </Routes>
      </Router>
    </>
  )
}
export default App

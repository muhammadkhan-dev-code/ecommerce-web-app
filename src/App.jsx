import HomePage from './pages/HomePage.jsx'
import CheckOut from './pages/CheckOut.jsx'
import Orders from './pages/Orders.jsx'
import './App.css'
import { Routes,Route } from 'react-router'
import Tracking from './pages/Tracking.jsx'

function App() {

  return (
    <>
    <Routes>
       <Route index element={<HomePage/>}/> // path='/'
       <Route path="/checkout" element={<CheckOut/>}/>
       <Route path='/orders' element={<Orders/>}/>
       <Route path='/tracking' element={<Tracking/>}/>
    </Routes>
   
    </>

  )
}

export default App

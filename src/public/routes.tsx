import { Routes, Route } from 'react-router-dom'
import SignUp from '../components/SignUp'
import Login  from '../components/Login'
import LandingPage from '../components/LandingPage'
const routes = () => {
  return (
  <>
        <Routes>
            <Route path="/" element={<LandingPage />}/> 
            <Route path="/Login" element={<SignUp />} />
            <Route path="/SignUp" element={<Login />} />
        </Routes>
  </>
  )
}

export default routes

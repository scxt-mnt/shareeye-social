import { Routes, Route } from 'react-router-dom'
import SignUp from '../components/SignUp'
import Login  from '../components/Login'
import LandingPage from '../components/LandingPage'
import DashBoard  from '../components/DashBoard'
import Form from '../components/Form'
const routes = () => {
  return (
  <>
        <Routes>
            <Route path="/" element={<LandingPage />}/> 
            <Route path="/SignIn" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/DashBoard" element={<DashBoard />}></Route>
            <Route path="/Form-about" element={<Form />} ></Route>
        </Routes>
  </>
  )
}

export default routes

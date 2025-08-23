import { Routes, Route } from 'react-router-dom'
import SignUp from '../components/SignUp'
import Login  from '../components/Login'
import LandingPage from '../components/LandingPage'
import DashBoard  from '../DashBoard Files/DashBoard'
import Form from '../components/Form'
import Profile from '../Profiles/Profile'
import ProfilePage from '../Profiles/ProfilePage'
const routes = () => {
  return (
  <>
        <Routes>
            <Route path="/" element={<LandingPage />}/> 
            <Route path="/SignIn" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/DashBoard" element={<DashBoard />}></Route>
            <Route path="/Form-about" element={<Form />} ></Route>
            <Route path="Form-about/Profile-Upload" element={<Profile />}/>
            <Route path="Profile-page" element={ <ProfilePage /> }></Route>
        </Routes>
  </>
  )
}

export default routes

import { Routes, Route } from 'react-router-dom'
import SignUp from '../Forms/SignUp'
import Login from '../Forms/Login'
import LandingPage from '../components/LandingPage'
import DashBoard from '../DashBoard Files/DashBoard'
import Form from '../Forms/Form'
import Profile from '../Profiles/Profile'
import ProfilePage from '../Profiles/ProfilePage'
import ViewProfile from '../Profiles/ViewProfile'
import Posting from '../Forms/Posting'
const routes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignIn" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/DashBoard" element={<DashBoard />}></Route>
        <Route path="/Form-about" element={<Form />} ></Route>
        <Route path="Form-about/Profile-Upload" element={<Profile />} />
        <Route path="Profile-page" element={<ProfilePage />}></Route>
        <Route path="DashBoard/View-Profile/:id" element={<ViewProfile />} />
        <Route path="/Posting-Sheereye" element={<Posting />}/>
      </Routes>
    </>
  )
}

export default routes

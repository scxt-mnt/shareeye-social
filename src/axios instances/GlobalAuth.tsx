import axios from "axios";

const SignUp = axios.create({
    baseURL: 'http://localhost:5000/SignUp',
    headers: {Accept: 'application/json'},
    withCredentials: true  
})

const SignIn = axios.create({
    baseURL:  'http://localhost:5000/SignIn',
    headers: {
        Accept: 'application/json',
    },
        withCredentials:true

})

const FormAbout = axios.create({
    baseURL: 'http://localhost:5000/Form-about',
    headers: {
        Accept: 'application/json'
    },
    withCredentials:true
})


export { SignIn, FormAbout}
export default SignUp

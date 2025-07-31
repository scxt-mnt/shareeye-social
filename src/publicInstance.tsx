import axios from "axios";

const SignUp = axios.create({
    baseURL: 'http://localhost:5000/SignUp',
    headers: {Accept: 'application/json'}   
})

const SignIn = axios.create({
    baseURL:  'http://localhost:5000/SignIn',
    headers: {
        Accept: 'application/json'
    }
})
export { SignIn }
export default SignUp;

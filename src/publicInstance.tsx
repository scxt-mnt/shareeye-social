import axios from "axios";

const global = axios.create({
    baseURL: 'http://localhost:5000/SignUp',
    headers: {Accept: 'application/json'}   
})

export default global;
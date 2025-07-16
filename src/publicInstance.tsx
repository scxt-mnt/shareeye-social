import axios from "axios";

const global = axios.create({
    baseURL: 'http://localhost:5000/create',
    headers: {Accept: 'application/json'}   
})

export default global;
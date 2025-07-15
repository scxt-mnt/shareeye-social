import axios from "axios";


const globalInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Accept: "application/json",
     }
})

export default globalInstance;

import axios from 'axios'

const posting = axios.create({
    baseURL: "http://localhost:5000/Posting-Sheereye",
    headers:{Accept: 'application/json'},
    withCredentials: true
})


export { posting }
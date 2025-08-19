import axios from "axios";

const storePhoto = axios.create({
    baseURL: 'http://localhost:5000/Form-about/Profile-Upload',
    headers: { 'Content-Type': 'application/json' }
})

const uploadsUrl = axios.create({
    baseURL: 'http://localhost:5000/Form-about/Profile-Upload/Url',
    headers: { 'Content-Type': 'application/json' }
})



export { storePhoto, uploadsUrl }
import axios from "axios";

const fetchSearch = axios.create({
    baseURL:"http://localhost:5000/Search",
    headers: {Accept: 'application/json'}
})

export {fetchSearch}
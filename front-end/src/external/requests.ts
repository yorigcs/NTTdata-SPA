import axios from "axios";
const baseURL = 'http://localhost:8000/api'

export const fetchMoviesListPreview = async (name: string,page = 1) => {
    return await axios.post(`${baseURL}/movies`, {name,page})
}
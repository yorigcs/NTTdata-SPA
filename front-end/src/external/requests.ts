import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api'

export const fetchMoviesListPreview = async (name: string,page = 1) => {
    return await axios.post(`${baseURL}/movies`, {name,page})
}
import axios from 'axios'

export const apiInstance = axios.create({
    withCredentials: true,
    baseURL: "/api"
})
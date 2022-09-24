import axios from "axios"

export const tvMazeAPI = axios.create({
   baseURL: "https://api.tvmaze.com"
})
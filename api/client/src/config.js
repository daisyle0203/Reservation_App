import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://stayzen.herokuapp.com/api/"
})

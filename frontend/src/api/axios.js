import axios from 'axios'

const api = axios.create({
  baseURL: 'https://trello-clone-backend-skr4.onrender.com/api'
})

export default api
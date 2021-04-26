import axios from "axios"

const baseUrl = "/api/users"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUserById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export default {
  getAll,
  getUserById
}
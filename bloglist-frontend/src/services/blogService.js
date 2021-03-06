import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  return token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: {Authorization:  token}
  }

  const response = await axios.post(baseUrl,newObject, config)
  return response.data
}

const update = async (id, changedObject) => {
  const config = {
    headers: {Authorization:  token}
  }
  
  const response = await axios.put(`${baseUrl}/${id}`, changedObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {Authorization:  token}
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const find = async (id) => {
  const response = await axios.get(baseUrl + '/' + id)
  return response.data
}

const updateComments = async (id, comment) => {
  const response = await axios.put(baseUrl + '/' + id + '/comments', comment)
  return response.data
}

export default { getAll, setToken, create, remove, update, find, updateComments }
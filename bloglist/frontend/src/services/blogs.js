import axios from 'axios'
const baseUrl = '/api/blogs'
// const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (objId, newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.put(`${baseUrl}/${objId}`, newObject, config)
  return request.then(response => response.data)
}

const deleteEntry = (objId) => {
  const config  = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${objId}`, config)

  console.log('Deleting entry at id', `${objId}`)

  return request.then(() => {
    return getAll()
  })
}

export default { setToken, getAll, create, update, deleteEntry }
import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {  
    return setValue('')     
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

let token = null

export const useResource = (baseUrl) => {
  const [value, setValue ] = useState([])

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

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  const deleteEntry = (id) => {
    const config = {
      headers: { Authorization: token }
    }
    const request = axios.delete(`${baseUrl}/${id}`, config)

    return request.then(() => {
      return getAll()
    })
  }

  return [ value , { getAll, create, update, deleteEntry, setToken, setValue } ]
}
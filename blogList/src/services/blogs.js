import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllBlogs = () => {
  return axios.get(baseUrl)
}

const createBlog = newObject => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.post(baseUrl, newObject, config)
}

const addLikes = (blogId, newLikes) => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.put(`${baseUrl}/${blogId}`, newLikes, config )
}

const deleteBlog = blogId => {
  console.log(blogId)
  return axios.delete(`${baseUrl}/${blogId}`)
}

export default {
  getAllBlogs: getAllBlogs,
  createBlog: createBlog,
  deleteBlog: deleteBlog,
  addLikes: addLikes,
  setToken: setToken
}
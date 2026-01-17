import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [likes, setLikes] = useState('')

    const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: likes
    }
    
    createBlog(blogObject)
      
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setLikes('')
  }

  return (
    <div>
      <h2> Add blog to database </h2>
      <form onSubmit={addBlog}>
        <div>Blog Title: <input value={newTitle} onChange={event => setNewTitle(event.target.value)} placeholder='write title here'/></div>
        <div>Blog Author: <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)} placeholder='write author here'/></div>
        <div>Blog URL: <input value={newUrl} onChange={event => setNewUrl(event.target.value)} placeholder='write url here' /></div>
        <div>Likes: <input value={likes} onChange={event => setLikes(event.target.value)} placeholder='write likes here'/></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

export default BlogForm
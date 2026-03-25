import { addComment } from "../reducers/blogReducer";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import {
  useParams
} from 'react-router-dom'

const Blog = ({ blogs, users, handleAddLike, handleBlogDelete }) => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)
    const user = users.find(u => u.blogs.some(b => b.id === id))
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    console.log(id)
    console.log(blog)
    console.log(user)

// The a href had to be so difficult since url was stored only with www.hippo.com - format
// if the link had already correct format http:// - then only blog url would be enough
  return (
    <div>
        <h2>{blog.title}</h2>
        <a
            href={blog.url.startsWith('http') ? blog.url : `https://${blog.url}`}
            target="_blank" rel="noopener noreferrer"> {blog.url}
        </a>
        <p>
            {blog.likes} likes {" "}
            <button
                onClick={() => handleAddLike(blog.id, blog.likes)}> Add Like
            </button>
        </p>
        <p>Added by {user.name}</p>
        <h3>Comments</h3>
        <input
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Comment free text field"
        />
        <div>
        <button onClick={() => {
            dispatch(addComment({ id: blog.id, comment }))
            setComment('')
        }}>
            add comment
        </button>
        </div>
        <ul>
        {blog.comments && blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
        ))}
        </ul>
        <button
            id="windowButton" onClick={() => handleBlogDelete(blog.id)}
            >
            {" "}
            Delete{" "}
        </button>{" "}
    </div>
  );
};

export default Blog;
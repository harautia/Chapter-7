import { addComment } from "../reducers/blogReducer";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import {
  useParams
} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const Blog = ({ blogs, users, handleAddLike, handleBlogDelete }) => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)
    const user = users.find(u => u.blogs.some(b => b.id === id))
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // This is need when blog is deleted and redirect is done to / - folder
    if (!blog) return null
    console.log(id)
    console.log(blog)
    console.log(user)

// The a href had to be so difficult since url was stored only with www.hippo.com - format
// if the link had already correct format http:// - then only blog url would be enough
  return (
    <div className="container">
        <h2>{blog.title}</h2>
        <a
            href={blog.url.startsWith('http') ? blog.url : `https://${blog.url}`}
            target="_blank" rel="noopener noreferrer"> {blog.url}
        </a>
        <p>
            {blog.likes} likes {" "}
            <Button
                onClick={() => handleAddLike(blog.id, blog.likes)}> Add Like
            </Button>
        </p>
        <p>The blog is added by {user.name}</p>
        <h3>Comments</h3>
        <ul>
            {blog.comments && blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
            ))}
        </ul>
        <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Comment free text field"
        />
        <div>
            <Button onClick={() => {
                dispatch(addComment({ id: blog.id, comment }))
                setComment('')
            }}>
            Add comment to Blog
            </Button>
        </div>
        <div>
            <Button id="windowButton" onClick={() => handleBlogDelete(blog.id, navigate)} >
                Delete Blog
            </Button>
        </div>
    </div>
  );
};

export default Blog;
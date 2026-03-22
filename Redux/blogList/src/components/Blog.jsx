import {
  useParams
} from 'react-router-dom'

const Blog = ({ blogs, users, handleAddLike }) => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)
    const user = users.find(u => u.blogs.some(b => b.id === id))
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
        <p>
            Added by {user.name}
        </p>
    </div>
  );
};

export default Blog;
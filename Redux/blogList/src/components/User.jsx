import {
  useParams
} from 'react-router-dom'

const User = ({ users, blogs }) => {
    const id = useParams().id
    const user = users.find(n => n.id === id) 
    console.log(user)
    console.log(blogs)
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added Blogs</h3>
            {user.blogs.map(userBlog => {
                const blog = blogs.find(b => b.id === userBlog.id)
                return <li key={blog.id}>{blog.title}</li> 
            })}
        </div>
    )
}

export default User;
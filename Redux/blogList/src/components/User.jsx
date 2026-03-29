import {
  useParams
} from 'react-router-dom'

const User = ({ users, blogs }) => {
    const id = useParams().id
    const user = users.find(n => n.id === id) 
    console.log(user)
    console.log(blogs)
    return (
        <div className='container'>
            <h2>Blogs added by {user.name}</h2>
            <div className='container'>
                {user.blogs.map(userBlog => {
                    const blog = blogs.find(b => b.id === userBlog.id)
                    return <li key={blog.id}>{blog.title}</li> 
                })}
            </div>
        </div>
    )
}

export default User;
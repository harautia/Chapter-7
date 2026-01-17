const Blog = ({ blogs }) => {
  return (
    <div>
        <h3> Blog Basic Info</h3>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                </tr>
                </thead>
                <tbody className='basicInfo'>
                    {blogs.map(blog => (
                    <tr key={blog.id}>
                        <td>{blog.title}</td>
                        <td>{blog.author}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
)}

export default Blog

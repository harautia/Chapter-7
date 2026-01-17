const BlogDetails = ({ blogs, handleAddLike, handleBlogDelete }) => {
  return (
     <div>
        <h3> Blog Details</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>URL</th>
              <th>Likes</th>
              <th>Add One Like</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td> <a href={blog.url} target="_blank" rel="noopener noreferrer"> {blog.url} </a></td>
                <td>{blog.likes}</td>
                <td> <button onClick={() => handleAddLike(blog.id, blog.likes)}> Add Like </button> </td>
                <td> <button id="windowButton" onClick={() => handleBlogDelete(blog.id)}> Delete </button> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default BlogDetails
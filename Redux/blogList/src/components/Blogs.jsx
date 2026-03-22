import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h3> Blog Basic Info</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody className="basicInfo">
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;

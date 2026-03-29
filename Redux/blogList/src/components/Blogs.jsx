import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';

const Blogs = ({ blogs }) => {
  return (
    <div>
      <Table striped>
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
      </Table>
    </div>
  );
};

export default Blogs;

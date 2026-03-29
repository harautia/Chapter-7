import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';

const Users = ({users}) => {

  console.log("Users component rendered, users:", users);
  
  if (!users) return <div>Loading...</div>;
  if (users.length === 0) return <div>No users found</div>;
  
  console.log(users)
  return (
    <div className="container">
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
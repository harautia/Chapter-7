import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import notificationReducer from './reducers/notificationReducer';
import BlogDetails from "./components/BlogDetails";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useReducer } from 'react';

const App = () => {

/*
  useReducer gives us both state AND dispatch in one hook
  Redux equivalent would be: useSelector(state => state.notification) + useDispatch()

  The key point to remember: useReducer returns both the state and dispatch function together,
  whereas with Redux you get them separately (state from useSelector, dispatch from useDispatch).

  Removed alse initialState from notificatioReducer since it is set here.
*/
const [notification, dispatch] = useReducer(notificationReducer, { 
  message: '', 
  visible: false 
});

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.createBlog(blogObject).then((response) => {
      showBlogs(blogs.concat(response.data));
        dispatch({
          type: 'SHOW_INFO',
          payload: `Added blog title: '${response.data.title}'`
        });
      setTimeout(() => {
        dispatch({ type: 'HIDE' });
      }, 5000);
    });
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const [, setLog] = useState("");

  const handleBlogDelete = (blogId) => {
    if (window.confirm("Do you want to delete the blog?")) {
      blogService.deleteBlog(blogId).then((response) => {
        console.log(response);
        showBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.id !== blogId),
        );
      });
    } else {
      setLog("Action discarded");
    }
  };

  const handleAddLike = (blogId, likes) => {
    console.log(blogId);
    console.log(likes);
    const content = {
      likes: likes + 1,
    };
    blogService.addLikes(blogId, content).then((response) => {
      console.log(response);
      showBlogs(
        blogs.map((blog) =>
          blog.id === blogId ? { ...blog, likes: likes + 1 } : blog,
        ),
      );
    });
  };

  const [blogs, showBlogs] = useState([]);
  useEffect(() => {
    blogService.getAllBlogs().then((response) => {
      showBlogs(response.data);
    });
  }, []);
  console.log("render", blogs.length, "blogs");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      console.log(user);
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
        dispatch({
          type: 'SHOW_ERROR',
          payload: `wrong credentials`
        });
      setTimeout(() => {
        dispatch({ type: 'HIDE' });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    window.localStorage.clear();
    setUser(null);
  };

  const blogFormRef = useRef();

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  );

  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes);

  const blogDetailsForm = () => (
    <Togglable buttonLabel="show details" ref={blogFormRef}>
      <BlogDetails
        blogs={sortedBlogs}
        handleAddLike={handleAddLike}
        handleBlogDelete={handleBlogDelete}
      >
        {" "}
      </BlogDetails>
    </Togglable>
  );

  return (
    <div>
      <h1>The Blog Listing</h1>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in{" "}
            <button onClick={() => handleLogout(user)}> Logout</button>{" "}
          </p>
          {blogForm()}
        </div>
      )}
      {user && <Blog blogs={blogs}> </Blog>}
      {user && blogDetailsForm()}
      <Footer />
    </div>
  );
};

export default App;
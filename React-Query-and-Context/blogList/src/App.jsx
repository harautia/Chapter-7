import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import notificationReducer from './reducers/notificationReducer';
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer"
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
  const [notification, notificationDispatch] = useReducer(notificationReducer, { 
    message: '', 
    visible: false 
  });

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.createBlog(blogObject).then((response) => {
      blogsDispatch({
        type: "ADD_BLOG",
        payload: response.data
      });
      notificationDispatch({
          type: 'SHOW_INFO',
          payload: `Added blog title: '${response.data.title}'`
        });
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' });
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
        console.log("Blog Delete Data: ", response);
        blogsDispatch({
        type: "DELETE_BLOG",
        payload: blogId
      });
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
      blogsDispatch({
        type: "ADD_LIKE",
        payload: blogId
      });
    });
  };
  
  const [blogs, blogsDispatch] = useReducer(blogReducer, []);
  useEffect(() => {
    blogService.getAllBlogs().then((response) => {
      blogsDispatch({
        type: "SET_BLOGS",
        payload: response.data
      });
    });
  }, []);

  console.log("render", blogs.length, "blogs");

 const [user, userDispatch] =  useReducer(userReducer, null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({
        type: "SET_USER",
        payload: user
      });
      blogService.setToken(user.token);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      console.log(user);
      blogService.setToken(user.token);
      userDispatch({
        type: "SET_USER",
        payload: user
      });
      setUsername("");
      setPassword("");
    } catch {
        notificationDispatch({
          type: 'SHOW_ERROR',
          payload: `wrong credentials`
        });
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    window.localStorage.clear();
      userDispatch({
        type: "SET_USER",
        payload: null
      });
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

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

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
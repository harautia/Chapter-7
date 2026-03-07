import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogDetails from "./components/BlogDetails";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs, appendBlog, deleteBlog, addLike } from "./reducers/blogReducer";
import { setUser, clearUser } from "./reducers/userReducer";

const App = () => {

  // No need to import notificationReducer directly — Redux handles it through the store
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification);

//  When I used addBlog in dispatch I created an loop which made continuesly new blogs!
//  Remember to differentiate addBlog & appendBlog

  const addBlog = (blogObject) => {
    console.log("Add blog Executed")
    blogFormRef.current.toggleVisibility();
    blogService.createBlog(blogObject).then((response) => {
      console.log("Data After Adding Blog: ", response.data)
      dispatch(appendBlog(response.data))
        dispatch(setNotification(`Added blog title: '${response.data.title}'`, 'info', 5));
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
        console.log("Data After Blog Delete: ", response);
        dispatch(deleteBlog(blogId));
      });
    } else {
      setLog("Action discarded");
    }
  };

  const handleAddLike = (blogId, likes) => {
    console.log("Here is blog Id: ", blogId, "New Like amount: ", likes);
    const content = {
      likes: likes + 1,
    };
    blogService.addLikes(blogId, content).then((response) => {
      console.log("Data After Add Like Update: ", response);
    dispatch(addLike(blogId));
    });
  };

/*  Input info from AI (to help me to understand code)

useSelector(state => state.blogs) — subscribes your component to the Redux store. Whenever state.blogs changes,
the component re-renders with the new value. The state here is the entire Redux store, and state.blogs matches
the key you defined in configureStore.

useEffect — runs once when the component mounts (and if dispatch changes, but it never does).
It Calls blogService.getAllBlogs() to fetch blogs from the backend

When the promise resolves, dispatches setBlogs(blogs) which updates state.blogs in the Redux store
useSelector detects the store changed and re-renders the component with the new blogs

Component mounts
  → useEffect fires
  → fetch blogs from API
  → dispatch(setBlogs(blogs)) updates Redux store
  → useSelector detects change
  → component re-renders with blogs

  It replaces the old useState pattern where you stored blogs locally in the component and
  now they live in the global Redux store instead, accessible from any component.
*/

  const blogs = useSelector(state => state.blogs);
  console.log("Data: ", blogs)
  useEffect(() => {
    blogService.getAllBlogs().then(blogs => dispatch(setBlogs(blogs)))
  }, [dispatch]);

  const user = useSelector(state => state.user)
  console.log("User: ", user)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
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
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch {
        dispatch(setNotification(`Incorrect Credentials`, 'error', 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    window.localStorage.clear();
    dispatch(clearUser());
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

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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
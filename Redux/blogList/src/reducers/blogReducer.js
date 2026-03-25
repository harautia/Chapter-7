import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    addLike(state, action) {
      const blog = state.find(blog => blog.id === action.payload);
      if (blog) {
        blog.likes += 1;
      }
    },
    addComment(state, action) {
      const { id, comment } = action.payload
      const blog = state.find(blog => blog.id === id)
      if (blog) {
        blog.comments.push(comment)
      }
    },
  }
});

export const { setBlogs, appendBlog, deleteBlog, addLike, addComment } = blogSlice.actions;
export default blogSlice.reducer;
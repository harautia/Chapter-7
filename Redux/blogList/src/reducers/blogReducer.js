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
    }
  }
});

export const { setBlogs, appendBlog, deleteBlog, addLike } = blogSlice.actions;
export default blogSlice.reducer;
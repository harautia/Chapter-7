const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
        console.log('Blog Reducer SET_BLOGS');
        return action.payload
    case "ADD_BLOG":
        console.log('Blog Reducer ADD_BLOG');
        return [...state, action.payload];
    case "DELETE_BLOG":
        console.log('Blog Reducer DELETE_BLOG');
      return state.filter(blog => blog.id !== action.payload);
    case "ADD_LIKE":
        console.log('Blog Reducer ADD_LIKE');
        return state.map(blog => 
            blog.id === action.payload 
            ? { ...blog, likes: blog.likes + 1 }
            : blog
        );
    default:
      return state;
  }
};

export default blogReducer;
const dummy = (blogs) => {
  // console.log(blogs)
  return 1
}

const sumOfLikes =(blogs) => {

// Basic for loop approach
/*  for (let i = 0; i < blogs.length; i++) {
    let = likeAmount = blogs[i].likes
    console.log(likeAmount)
    }
*/

// Functional way of doing with forEach
/*
let totalLikes = 0
blogs.forEach(function(blog) {
    totalLikes = blog.likes + totalLikes
})
*/

// Functional way of doing with Reduce 

/* var totalLikes = blogs.reduce (function(sum, blogs){
  return sum + blogs.likes
 }, 0)
*/

// The same function as above defined like this:
var totalLikes = blogs.reduce ((sum, blogs) => sum + blogs.likes,0)

return totalLikes
} 

const favouriteBlog =(blogs) => {
  if (blogs.length > 1) {
    var mostLikes = 0
    var favBlog = []
    blogs.reduce (function(find, blogs){
      find = blogs.likes
      if (find > mostLikes) {
        mostLikes = find
        favBlog = blogs.title
    }})
      return favBlog
  }
  if (blogs.length == 1) {
    var favBlog = blogs[0].title
    return favBlog
  }  
  else { return 0 }    
}

module.exports = {
  dummy, sumOfLikes, favouriteBlog
}
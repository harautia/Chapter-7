const assert = require('node:assert')
const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs database _id is unique', async () => {
  const isBlogIdUnique = await helper.uniqueBlogId()
  assert.strictEqual(true, isBlogIdUnique)
})

test('Adding blog to DB', async () => {
  const newBlog = {
    "title": "Asian Cooking", 
    "author": "Leslie Martins",
    "url": "web-page-1234",
    "likes": 124
  }

  const initialBlogs = await helper.blogsInDb()
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const addedBlogs = await helper.blogsInDb()
  assert.strictEqual(initialBlogs.length, addedBlogs.length -1)

  const isNewBlogAdded = await helper.newBlogInDb(newBlog)
  assert.strictEqual(true, isNewBlogAdded)
})

test('Missing Likes Parameter', async () => {
  const newBlog = {
    "title": "Testing1235", 
    "author": "Kieran Landon",
    "url": "web-page-4321"
  }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const lastAddedBlogLikeCheck = await helper.noLikesBlogAddedTonDb(newBlog)
  assert.strictEqual(0, lastAddedBlogLikeCheck)
})

test('Blog without URL is not added', async () => {
  const newBlog = {
    "title": "Testing1235", 
    "author": "Kieran Landon",
    "likes": 123
  }
  const initialBlogs = await helper.blogsInDb()

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const addedBlogs = await helper.blogsInDb()
  assert.strictEqual(initialBlogs.length, addedBlogs.length)
})

test('Blog without title is not added', async () => {
  const newBlog = { 
    "author": "Kieran Landon",
    "url": "web-site-1",
    "likes": 123
  }
  const initialBlogs = await helper.blogsInDb()

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const addedBlogs = await helper.blogsInDb()
  assert.strictEqual(initialBlogs.length, addedBlogs.length)
})

test('Blog likes updated correctly', async () => {
  const updateLikes = {
    "likes": 999
  }

    await api
    .put('/api/blogs/68976c22228bca51c804e332')
    .send(updateLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const likeUpdate = await helper.likesInBlog('68976c22228bca51c804e332')
 
  assert.strictEqual(updateLikes.likes,likeUpdate)
})


after(async () => {
  await mongoose.connection.close()
})

/*
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

    const blogs_empty = []
    const blogs_single = [
    {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]
    const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('dummy', () => {
    test('dummy returns one', async () => {

    //const response = await fetch('http://localhost:3003/api/blogs')
    //const blogs = await response.json()
    
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
    })
})

describe('total likes', () => {
 
    test('empty list is zero', () => {   
    const result = listHelper.sumOfLikes(blogs_empty)
    assert.strictEqual(result, blogs_empty.length)
    })
    test('when list has only blog the likes match to this', () => {   
    const result = listHelper.sumOfLikes(blogs_single)
    assert.strictEqual(result, blogs_single[0].likes)
    })
    test('of bigger list is calculated right', () => {   
    const result = listHelper.sumOfLikes(blogs)
    assert.strictEqual(result, 36)
    })

describe ('Favourite Blog', () => {

    test('empty list is zero', () => {   
    const result = listHelper.favouriteBlog(blogs_empty)
    assert.strictEqual(result, blogs_empty.length)
    })
    test('when list has only entry the favourite blog is the only blog', () => {   
    const result = listHelper.favouriteBlog(blogs_single)
    assert.strictEqual(result, blogs_single[0].title)
    })
    test('Favourite blog is with most likes', () => {   
    const result = listHelper.favouriteBlog(blogs)
    assert.deepStrictEqual(result, "Canonical string reduction" )  
    })
}

)

})
*/
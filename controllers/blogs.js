const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response, next) => {
  const {title, author, url, likes = 0} = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id) 
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title,
    author,
    url,
    likes
  })
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
      response.status(200).json(updatedBlog)
    } else {
      response.status(404).end()
    }
})

module.exports = blogRouter
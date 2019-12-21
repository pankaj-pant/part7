const mongoose = require('mongoose')

const url =
  `mongodb+srv://fullstack:${password}@cluster0-zwdiu.mongodb.net/bloglist-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})


const Blog = mongoose.model('Blog', blogSchema)
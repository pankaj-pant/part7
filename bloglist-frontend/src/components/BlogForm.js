import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit, title, author, url }) => {
  return (
    <form onSubmit={handleSubmit}>
      title:<input {...title} reset={null}/> <br />
      author:<input {...author} reset={null}/> <br />
      url:<input {...url} reset={null}/> <br />
      <button type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm
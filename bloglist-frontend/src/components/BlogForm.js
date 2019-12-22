import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit, title, author, url }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        title:<input {...title} reset={null}/> <br />
      </div>
      <div className="form-group">
        author:<input {...author} reset={null}/> <br />
      </div>
      <div className="form-group">
        url:<input {...url} reset={null}/> <br />
      </div>
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
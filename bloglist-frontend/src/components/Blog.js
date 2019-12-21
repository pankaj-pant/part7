import React from 'react'
import NewComment from './NewComment'
import Notification from './Notification'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, createComment, notification }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const printComments = () => {
    return(
      blog.comments.map(c => <li key={c.id}>{c.content}</li>)
    )
  }

  const details = () => (
    <div className='details'>
      <h2>{blog.title} {blog.author}</h2>
      <Notification notification={notification} />
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h4>comments</h4>
      <NewComment createComment={createComment} blogID={blog.id} blog={blog}/>
      {blog.comments.length === 0 ? <div>No comments so far</div> : <ul>{printComments()}</ul> }
    </div>
  )

  if ( blog === undefined) {
    return null
  }

  return (
    <div style={blogStyle}>
      <div className='name'>
        {details()}
      </div>
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired
}

export default Blog
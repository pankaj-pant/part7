import React from 'react'
import { useField } from '../hooks'

const NewComment = ({ createComment, blogID, blog }) => {
  const [comment, commentReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('blogID', blogID)
    console.log('comment', comment.value)
    createComment(blog, blogID, comment.value)
    commentReset()
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div>
          <input {...comment} />
        </div>
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default NewComment
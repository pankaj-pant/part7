import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        username
        <input {...username} reset={null}/>
      </div>
      <div className="form-group">
        password
        <input {...password} reset={null}/>
      </div>
      <button type="submit" className="btn btn-primary">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm
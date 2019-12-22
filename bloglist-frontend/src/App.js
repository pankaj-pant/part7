import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Route, Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import LoginForm from './components/LoginForm'


const Blogs = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={props.notification} />

      <Togglable buttonLabel='create new' ref={props.newBlogRef}>
        <NewBlog createBlog={props.createBlog} />
      </Togglable>

      {props.blogs.sort(props.byLikes).map(blog =>
        <div key={blog.id} style={blogStyle}>
          <div className='name'>
            <Link to={`blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        </div>

      )}
    </div>
  )
}

const Users = ({ users }) => {

  const printData = users.map( user => {

    return (
      <tr key={user.id}>
        <td><Link to={`users/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {printData}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ user }) => {
  console.log(user)
  if ( user === undefined) {
    return null
  }

  const printBlogs = () => {
    return(
      user.blogs.map(b =>
        <li key={b.id}>{b.title}</li>
      )
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {printBlogs()}
      </ul>
    </div>
  )
}

const App = () => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [notification, setNotification] = useState({
    message: null
  })

  useEffect(() => {
    async function fetchData() {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const initialUsers = await userService.getAll()
      setUsers(initialUsers)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }
    fetchData()
  }, [])



  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    loginRef.current.toggleVisibility()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
    usernameReset()
    passwordReset()
  }

  const createBlog = async (blog) => {
    const createdBlog = await blogService.create(blog)
    newBlogRef.current.toggleVisibility()
    setBlogs(blogs.concat(createdBlog))
    notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    console.log(updatedBlog)
    console.log(blog.comments)
    const finalBlog = { ...updatedBlog, user: blog.user, comments: blog.comments }
    //console.log(finalBlog)
    setBlogs(blogs.map(b => b.id === blog.id ? finalBlog : b))
    notify(`blog ${finalBlog.title} by ${finalBlog.author} liked!`)
  }

  const createComment = async (blog, blogID, content) => {
    console.log('blogID', blogID)
    console.log('comment', content)
    const commentedBlog = await blogService.addComment(blogID, { content })
    console.log(commentedBlog)
    const finalBlog = { ...blog, comments: [...blog.comments, commentedBlog] }
    setBlogs(blogs.map(b => b.id === blogID ? finalBlog : b))
    notify(`New comment for blog ${finalBlog.title} added!`)
  }

  const loginRef = React.createRef()
  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogById = (id) => {
    return (
      blogs.find(blog => blog.id === id)
    )
  }

  const userById = (id) => {
    return (
      users.find(user => user.id === id)
    )
  }

  const padding = {
    paddingRight: 5
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification notification={notification} />

        <Togglable buttonLabel='login' ref={loginRef}>
          <LoginForm handleSubmit={handleLogin} username={username} password={password}/>
        </Togglable>

      </div>
    )
  }

  return (
    <div>
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user
                    ? <><em>{user.name} logged in</em> <button onClick={handleLogout}>Logout</button> </>
                    : <Link to="/login">login</Link>
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/" render={() =>
            <Blogs notification={notification} newBlogRef={newBlogRef} createBlog={createBlog}
              blogs={blogs} byLikes={byLikes} />}
          />

          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} notification={notification}
              like={likeBlog} createComment={createComment}/>}
          />

          <Route exact path="/users" render={() => <Users users={users}/>} />

          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />

        </div>
      </Router>
    </div>
  )
}

export default App
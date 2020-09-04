import React, { useState, useEffect, useRef, forceUpdate } from 'react'
import BlogsToShow from './components/BlogsToShow'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import userService from './services/userService'
import blogService from './services/blogService'

import {useDispatch, useSelector} from 'react-redux'
import {logout, initializeUser} from './reducers/userReducer'
import {initializeProfile} from './reducers/profileReducer'
import {newNoti} from './reducers/notiReducer'
import {likeBlog} from './reducers/blogReducer'


import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import { initializeBlog } from './reducers/blogReducer'

const Menu = ({reduxUser, handleLogout}) => {
  const padding = {
    paddingRight: 5
  }
  const inline = {
      display: 'inline-block'
  }
  return (
    <header>
      <Link to="/" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      <p style={inline}>{reduxUser.username} logged in <button onClick={handleLogout}>logout</button></p>
    </header>
  )
}

const UserView = ({id}) => {
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  useEffect(() => {
    userService.getAll().then(
      response => {
        const findUser = response.find(user => 
          user.id === id)
        setProfile(findUser)
        setLoading(false)
      }
    )
  }, [])

  if (isLoading) {
    return (
      <></>
    )
  }
  return (
    <div>
      <h2>{profile.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {profile.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const BlogView = ({id}) => {
  const dispatch = useDispatch()
  const bloglike = useSelector(state => state.blogs)
  const [isLoading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    blogService
      .find(id)
      .then(response => {
        setBlog(response)
        setLoading(false)
      })
  }, [bloglike])

  const likePost = async () => {
    await dispatch(likeBlog(blog))
    dispatch(newNoti(`${blog.title} liked`))
  }

  if (isLoading) {
    return (
      <></>
    )
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p><button onClick={likePost}>like</button>
      <p>added by {blog.author}</p>
    </div>
  )
}


const UsersApp = ({profiles}) => {
  console.log(profiles)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
        <tr>
          <td>
            <></>
          </td>
          <td>
            blogs created
          </td>
        </tr>
        {profiles.map(user => {
          return(
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

const BlogApp = ({reduxUser, refBlog}) => {
  return (
    <>
      <Togglable buttonLabel={'new blog posts'} >
        <Blogs refBlog={() => refBlog}/>
      </Togglable>
      <div>
        <BlogsToShow 
          username={reduxUser.username}   
        />
      </div>
  </>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const reduxUser = useSelector(state => state.user)
  const profiles = useSelector(state => state.profiles)
  const blogFormRef = useRef()
  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }
  const refBlog = () => {
    blogFormRef.current.toggleVisibility()
  }
  const match = useRouteMatch('/users/:id')
  let userid = match ? match.params.id : 1
  const blogMatch = useRouteMatch('/blogs/:id')
  let blogid = blogMatch ? blogMatch.params.id : 1
  console.log(userid)
  if (reduxUser === null) {
    return( 
      <>
        <Notification/>
        <h1><b>Blogs</b></h1>
        <Togglable buttonLabel="login">
          <Login />
        </Togglable>
      </>
    )
  }

  return (
    <div className="container">
    <Notification/>
    <Menu reduxUser={reduxUser} handleLogout={handleLogout}/>
    <h2>blog app</h2>
    <Switch>
      <Route path="/users/:id">
        <UserView id={userid} />
      </Route>
      <Route path="/blogs/:id">
        <BlogView id={blogid} />
      </Route>
      <Route path="/users">
        <UsersApp
          profiles={profiles}
        />
      </Route>
      <Route path="/">
        <BlogApp
          reduxUser={reduxUser}
          refBlog={refBlog}
        />
      </Route>
    </Switch>
    </div>
  )
}

export default App
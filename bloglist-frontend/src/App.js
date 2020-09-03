import React, { useState, useEffect, useRef } from 'react'
import BlogsToShow from './components/BlogsToShow'
import blogService from './services/blogService'
import loginService from './services/handleLogin'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'

import {useDispatch, useSelector} from 'react-redux'
import {newNoti} from './reducers/notiReducer'
import {initializeBlog, createBlog} from './reducers/blogReducer'
 
const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
 
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  console.log(user)

  const login = async (username, password) => {
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(newNoti('usernam or password is incorrect'))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const refBlog = () => {
    blogFormRef.current.toggleVisibility()
  }

  if (user === null) {
    return( 
    <>
    <Notification/>
    <h1><b>Blogs</b></h1>
    <Togglable buttonLabel="login">
    <Login login={login} />
    </Togglable>
    </>
    )
  }


  return (
    <>
    <Notification/>
    <h2>blogs</h2>

    <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
    <Togglable buttonLabel={'new blog posts'} ref={blogFormRef}>
      <Blogs refBlog={() => refBlog}/>
    </Togglable>
  <div>
  <BlogsToShow 
    username={user.username}   
  />
  </div>
  </>
  )
}

export default App
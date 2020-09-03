import React, { useState, useEffect, useRef } from 'react'
import BlogsToShow from './components/BlogsToShow'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'

import {useDispatch, useSelector} from 'react-redux'
import {logout, initializeUser} from './reducers/userReducer'
 
const App = () => {
  useEffect(() => {
    dispatch(initializeUser())
  }, [])
  const reduxUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()


  console.log(reduxUser)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const refBlog = () => {
    blogFormRef.current.toggleVisibility()
  }

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
    <>
    <Notification/>
    <h2>blogs</h2>

    <p>{reduxUser.username} logged in <button onClick={handleLogout}>logout</button></p>
    <Togglable buttonLabel={'new blog posts'} ref={blogFormRef}>
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

export default App
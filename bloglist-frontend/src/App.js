import React, { useEffect, useRef } from 'react'
import BlogsToShow from './components/BlogsToShow'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'
import userService from './services/userService'

import {useDispatch, useSelector} from 'react-redux'
import {logout, initializeUser} from './reducers/userReducer'
import {initializeProfile} from'./reducers/profileReducer'

import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory
} from 'react-router-dom'

const UsersApp = ({reduxUser, handleLogout, profiles}) => {
  console.log(profiles)
  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      <p>{reduxUser.username} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>Users</h2>
      <table>
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
            <tr>
              <td>
                {user.username}
              </td>
              <td>
                {user.username}
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

const BlogApp = ({handleLogout, reduxUser, refBlog}) => {
  return (
    <>
      <Notification/>
      <h2>blogs</h2>
      <p>{reduxUser.username} logged in <button onClick={handleLogout}>logout</button></p>
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
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])
  
  const reduxUser = useSelector(state => state.user)
  const profiles = useSelector(state => state.profiles)
  console.log(profiles)
  const blogFormRef = useRef()
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
    <div className="container">
    <Switch>
      <Route path="/users">
        <UsersApp
          reduxUser={reduxUser}
          handleLogout={handleLogout}
          profiles={profiles}
        />
      </Route>
      <Route path="/">
        <BlogApp
          reduxUser={reduxUser}
          handleLogout={handleLogout}
          refBlog={refBlog}
        />
      </Route>
    </Switch>
    </div>
  )
}

export default App
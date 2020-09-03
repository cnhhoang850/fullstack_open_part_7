import React , {useState} from 'react'
import {likeBlog} from '../reducers/blogReducer'
import {deleteBlog} from '../reducers/blogReducer'
import {newNoti} from '../reducers/notiReducer'
import {useDispatch} from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likePost = async () => {
    await dispatch(likeBlog(blog))
    dispatch(newNoti(`${blog.title} liked`))
  }

  const deletePost = async () => {
    await dispatch(newNoti(`${blog.title} deleted`))
    dispatch(deleteBlog(blog.id))
  }

  const toggleVisibility = () => {
    return setVisible(!visible)
  }
  if (!visible) {
  return (
  <div style={blogStyle} className='blog'>
    <div>
      <b>{blog.title} {blog.author}</b>
      <button onClick={toggleVisibility} className="view">
      view
      </button>
    </div>
  </div> )
  } else {
    return (
    <div style={blogStyle} className='blog'>
    <div className="title">
    {blog.title} <button onClick={toggleVisibility}>hide</button>
    </div>
    <div className="url">
    {blog.url}
    </div>
    <div className="likes">
    likes {blog.likes} <button onClick={() => likePost(blog.id, blog)}>like</button>
    </div>
    <div className="author"> 
    {blog.author}
    </div>
  <button onClick={deletePost}>delete</button>
  </div>
    )
  }
}

export default Blog

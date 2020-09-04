import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {newNoti} from '../reducers/notiReducer'
import {useField} from '../index'

const BlogForm = ({refBlog}) => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const handleCreate = async (event) => {
        event.preventDefault()
        const post = {
            title: title.value,
            author: author.value,
            url: url.value
        }
        
        if (!post.title || ! post.url) {
            dispatch(newNoti('please set both URL and Title'))
            return null
        } 
      
        let uniqeUrl = blogs.map(blog => blog.url)
        let uniqeTitle = blogs.map(blog => blog.title)
      
        if (uniqeTitle.includes(post.title)) {
            dispatch(newNoti('title used, please use another'))
            title.reset()
            author.reset()
            return null
        } else if (uniqeUrl.includes(post.url)) {
            dispatch(newNoti('URL used, please use another'))
            author.reset()
            url.reset()
            return null
        }
        refBlog()
        await dispatch(createBlog(post))
        dispatch(newNoti(`new blog post ${post.title }is created.`))
        
        title.reset()
        author.reset()
        url.reset()
    }
    return (
    <div >
      <h2>create new</h2>
      <form onSubmit = {handleCreate} className="formDiv">
        <div>
            title: 
            <input
            className="title"
            {...title}
            reset="placeholder"
            />
        </div>
        <div>
            author: 
            <input
            className="author"
            {...author}
            reset="placeholder"
            />
        </div>
        <div>
            url: 
            <input
            className="url"
            {...url}
            reset="placeholder"
            />
        </div>
        <button type = "submit" id="create-button">create</button>
      </form>
      
    </div>
)}

export default BlogForm
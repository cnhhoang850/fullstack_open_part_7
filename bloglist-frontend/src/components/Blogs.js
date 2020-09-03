import React, {useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {newNoti} from '../reducers/notiReducer'

const BlogForm = ({refBlog}) => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()
        const post = {
            title: title,
            author: author,
            url: url
        }
        
        if (!post.title || ! post.url) {
            dispatch(newNoti('please set both URL and Title'))
            return null
        } 
      
        let uniqeUrl = blogs.map(blog => blog.url)
        let uniqeTitle = blogs.map(blog => blog.title)
      
        if (uniqeTitle.includes(post.title)) {
            dispatch(newNoti('title used, please use another'))
            setTitle('')
            setAuthor('')
            return null
        } else if (uniqeUrl.includes(post.url)) {
            dispatch(newNoti('URL used, please use another'))
            setAuthor('')
            setUrl('')
            return null
        }
        refBlog()
        dispatch(createBlog(post))
        dispatch(newNoti(`new blog post ${post.title }is created.`))
        
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
    <div >
      <h2>create new</h2>
      <form onSubmit = {handleCreate} className="formDiv">
        <div>
            title: 
            <input
            className="title"
            type = "text"
            value = {title}
            name = "Title"
            onChange = {({target}) => {setTitle(target.value)}}
            />
        </div>
        <div>
            author: 
            <input
            className="author"
            type = "text"
            value = {author}
            name = "Author"
            onChange = {({target}) => {setAuthor(target.value)}}
            />
        </div>
        <div>
            url: 
            <input
            className="url"
            type = "text"
            value = {url}
            name = "Url"
            onChange = {({target}) => {setUrl(target.value)}}
            />
        </div>
        <button type = "submit" id="create-button">create</button>
      </form>
      
    </div>
)}

export default BlogForm
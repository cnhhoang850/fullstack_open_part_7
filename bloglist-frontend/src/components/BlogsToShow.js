import React from 'react'
import Blog from './Blog'
import {useSelector} from 'react-redux'

const BlogsToShow = ({ username, handleDelete}) => {
    const blogs = useSelector(state => state.blogs)
    let sortedBlogsToShow = blogs.sort(function (a, b) {
        return b.likes - a.likes
      })
    console.log(sortedBlogsToShow)
    if (sortedBlogsToShow.length === 0) {
        return (
            <p>{username} has no blog posts</p>
        )
    } else {
        return (
            <>
            {sortedBlogsToShow.map(blog =>
                <Blog 
                key={blog.id} 
                blog={blog} 
                deletePost={() => handleDelete(blog.id, blog)}
                 />
                )
            }
            </>
        )
    }
}

export default BlogsToShow
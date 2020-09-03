import blogService from '../services/blogService'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOG': 
            return action.data
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'LIKE_BLOG':
            const id = action.data.id 
            const changedBlog = action.data
            console.log(id, changedBlog)
            return state.map(blog => 
                blog.id !== id ? blog : changedBlog)
        case 'DEL_BLOG':
            console.log(action.data)
            return state.filter(blog => 
                blog.id !== action.data)
        default:
            return state
    }
}

export const initializeBlog = (blogs) => {
    return async dispatch => {
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const addedBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: addedBlog
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        let likedBlog = {...blog, likes: blog.likes += 1}
        const id = blog.id
        await blogService.update(id.toString(), likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: likedBlog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id.toString())
        dispatch({
            type: 'DEL_BLOG',
            data: id
        })
    }
}

export default blogReducer
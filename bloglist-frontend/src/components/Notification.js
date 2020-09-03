import React from 'react'
import {useSelector} from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
    if (message === '') {
      return (
        <></>
      )
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

export default Notification
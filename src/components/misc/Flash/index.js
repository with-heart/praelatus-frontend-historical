import React from 'react'

const Flash = ({ message }) => {
  console.log('message', message)

  if(message == null || message.length == 0 ||
     (typeof(message) == 'object' && message.data == null)) {
    return (<div></div>)
  }

  if(typeof(message) == 'object') {
    return (
        <div className="flash-message">
        {message.data.message}
      </div>
    )
  }

  return (
      <div className="flash-message">
      {message}
    </div>
  )
}

export default Flash

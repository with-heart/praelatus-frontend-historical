import React from 'react'
import { Card, CardBlock, CardTitle, CardText } from 'reactstrap'
import { Gravatar, NotFoundCard, ErrorCard } from 'components'
import './userCard.css'

const UserCard = ({ user, loading, error }) => {
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (user) {
    return (
      <div>
        <Card>
          <CardBlock>
            <CardTitle><Gravatar email={user.email} /> {user.username}</CardTitle>
            <CardText>email: {user.email}</CardText>
            <CardText>fullName: {user.fullName}</CardText>
            <CardText>gravatar: {user.gravatar}</CardText>
          </CardBlock>
        </Card>
      </div>
    )
  }

  return error
    ? <ErrorCard error={error} />
    : <NotFoundCard type="User" />
}

export default UserCard
import * as React from 'react'
import { AuthUser } from '../App'

interface Props {
  user: AuthUser
  size?: 'small' | 'default'
  initialsOnly?: boolean
}

const userInitials = (user: AuthUser) => {
  const firstInitial = user.firstName.charAt(0)
  const lastInitial = user.lastName.charAt(0)

  return firstInitial + lastInitial
}

const Avatar: React.SFC<Props> = ({ user, size, initialsOnly }) => {
  if (initialsOnly) {
    return (
      <div className="circle icon container-centered">{userInitials(user)}</div>
    )
  }

  return <img src={user.avatar} alt="avatar" className={`icon`} />
}

export default Avatar

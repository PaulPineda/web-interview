import { Link } from 'react-router-dom'
import * as React from 'react'
import logo from '../logo.png'
import { AuthUser } from '../App'

interface Props {
  user: AuthUser
}

const userInitials = (user: AuthUser) => {
  const firstInitial = user.firstName.charAt(0)
  const lastInitial = user.lastName.charAt(0)

  return firstInitial + lastInitial
}

const SiteNavigation: React.SFC<Props> = ({ user }) => (
  <header className="app-header">
    <Link to="/">
      <img src={logo} className="app-logo" alt="logo" />
    </Link>
    <ul>
      <li>
        <Link to="/book">Book</Link>
      </li>
      <li>
        <Link to="/appointments">Appointments</Link>
      </li>
      <li>Family members</li>
    </ul>

    {user && (
      <div className="icon-avatar container-centered">{userInitials(user)}</div>
    )}
  </header>
)

export default SiteNavigation

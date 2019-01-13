import { Link } from 'react-router-dom'
import * as React from 'react'
import logo from '../logo.png'
import { AuthUser } from '../App'
import Avatar from './Avatar'

interface Props {
  user: AuthUser
  loggedInUserId: number
}

const SiteNavigation: React.SFC<Props> = ({ user, loggedInUserId }) => (
  <header className="site-nav">
    <Link to="/">
      <img src={logo} className="app-logo" alt="logo" />
    </Link>
    <ul>
      <li>
        <Link to={`/book/${loggedInUserId}`}>Book</Link>
      </li>
      <li>
        <Link to="/appointments">Appointments</Link>
      </li>
      <li>
        <Link to="/family-members">Family members</Link>
      </li>
    </ul>

    {user && <Avatar user={user} initialsOnly />}
  </header>
)

export default SiteNavigation

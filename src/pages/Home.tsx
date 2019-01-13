import * as React from 'react'
import { AuthUser } from '../App'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

interface Props {
  user: AuthUser | null
}

const Home: React.SFC<Props> = ({ user }) => {
  if (!user) {
    return <h1>Loading...</h1>
  }

  const { avatar, firstName, lastName } = user

  return (
    <div className="section home">
      <div className="header">
        <Avatar user={user} />
        <h1>{`${firstName} ${lastName}`}</h1>
      </div>
      <div className="account">
        <h4>Account</h4>
        <ul>
          <li>
            <Link className="menu-item" to="/family-members">
              <span className="title">Family</span>
              <span className="accessory">></span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="clinical-records">
        <h4>Clincal records</h4>
        <ul>
          <li className="menu-item">
            <span className="title">
              <Link to="/">Personal Details</Link>
            </span>
            <span className="accessory">></span>
          </li>

          <li />
        </ul>
      </div>
    </div>
  )
}

export default Home

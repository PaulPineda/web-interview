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
    <div className="section-container">
      <div className="home-header">
        <Avatar user={user} />
        <h1>{`${firstName} ${lastName}`}</h1>
      </div>
      <div className="home-account">
        <h3>Account</h3>
        <ul>
          <li>
            <button>Family</button>
          </li>
        </ul>
      </div>
      <div className="home-clinical-records">
        <h3>Clincal records</h3>
        <ul>
          <li>
            <Link to="/appointments">
              <button>Appointments</button>
            </Link>
          </li>
          <li>
            <button>Personal Details</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home

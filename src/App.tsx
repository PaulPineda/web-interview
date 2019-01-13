import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { API_ENDPOINT } from './config'

import './App.scss'

import Home from './pages/Home'
import Appointments from './pages/Appointments'
import BookAppointment from './pages/BookAppointment'
import DataLoader from './components/DataLoader'
import SiteNavigation from './components/SiteNavigation'
import FamilyMembers from './pages/FamilyMembers'

interface LoggedInUserId {
  loggedInUserId: number
}

export interface AuthUser {
  avatar: string
  firstName: string
  lastName: string
}

export interface Props {
  loading: boolean
  error: Error | null
  data: Record<string, any> | null
}

class App extends React.Component<{}, LoggedInUserId> {
  public state = {
    loggedInUserId: 1,
  }

  protected setLoggedInUser = (userId: number) =>
    this.setState({ loggedInUserId: userId })

  public render() {
    // IRL state could be set in this.componentDidMount
    // if not set, redirect to / show login DataView
    // otherwise:

    return <AppWithData loggedInUserId={this.state.loggedInUserId} />
  }
}

const AppWithData: React.SFC<LoggedInUserId> = ({ loggedInUserId }) => (
  <DataLoader path={`/users/${loggedInUserId}`}>
    {renderProps => (
      <AppRoutes {...renderProps} loggedInUserId={loggedInUserId} />
    )}
  </DataLoader>
)

const AppRoutes: React.SFC<Props & LoggedInUserId> = props => {
  const { loading, error, data: userData, loggedInUserId } = props

  if (error) {
    throw new Error('Something went wrong. Could not retrieve user details')
  }

  return (
    <Router>
      <div className="app">
        <SiteNavigation
          user={userData as AuthUser}
          loggedInUserId={loggedInUserId}
        />
        {loading && <div>Loading</div>}
        {!loading && userData && (
          <>
            <Route
              exact
              path="/"
              render={() => <Home user={userData as AuthUser} />}
            />
            <Route
              exact
              path="/appointments"
              render={() => <Appointments {...props} />}
            />
            <Route
              exact
              path="/book/:userId"
              render={props => (
                <BookAppointment {...props} user={userData as AuthUser} />
              )}
            />
            <Route
              exact
              path="/family-members"
              render={() => <FamilyMembers user={userData as AuthUser} />}
            />
          </>
        )}
      </div>
    </Router>
  )
}

export default App

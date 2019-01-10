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

const AppWithData: React.SFC = () => (
  <DataLoader path="/users/1">
    {renderProps => <App {...renderProps} />}
  </DataLoader>
)

const App: React.SFC<Props> = props => {
  const { loading, error, data: userData } = props

  if (error) {
    throw new Error('Something went wrong. Could not retrieve user details')
  }

  return (
    <Router>
      <div className="app">
        <SiteNavigation user={userData as AuthUser} />
        {loading && <div>Loading</div>}
        {!loading && userData && (
          <>
            <Route
              exact
              path="/"
              render={() => <Home user={userData as AuthUser} />}
            />
            <Route exact path="/appointments" component={Appointments} />
            <Route
              exact
              path="/book"
              render={() => <BookAppointment user={userData as AuthUser} />}
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

export default AppWithData

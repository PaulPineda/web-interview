import * as React from 'react'
import SectionHeader from '../components/SectionHeader'
import { AuthUser } from '../App'
import { RouteComponentProps } from 'react-router-dom'
import Avatar from '../components/Avatar'

interface Props {
  user: AuthUser
}

const BookAppointment: React.SFC<Props> = ({
  user,
  user: { firstName, lastName },
}) => (
  <div className="section-container">
    <SectionHeader mainHeading="New Appointment" />
    <div className="section-book-appointment-choose-user">
      <Avatar user={user} /> <span>{`${firstName} ${lastName}`}</span>
    </div>
    <div>
      <span>Date &amp; Time</span>
    </div>
    <div>
      <span>Notes</span>
    </div>
  </div>
)

export default BookAppointment

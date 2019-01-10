import * as React from 'react'
import SectionHeader from '../components/SectionHeader'
import { AuthUser } from '../App'
import Avatar from '../components/Avatar'
import AvailableSlots from '../components/AvailableSlots'

interface Props {
  user: AuthUser
}

const BookAppointment: React.SFC<Props> = ({
  user,
  user: { firstName, lastName },
}) => (
  <div className="section-container">
    <div className="booking-container">
      <SectionHeader mainHeading="New Appointment" />
      <div className="choose-user">
        <Avatar user={user} /> <span>{`${firstName} ${lastName}`}</span>
      </div>
      <div className="date-time">
        <span>Date &amp; Time</span>
        <AvailableSlots />
      </div>
      <div className="notes">
        <span>Notes</span>
      </div>
    </div>
  </div>
)

export default BookAppointment

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
      <form>
        <div className="choose-user">
          <Avatar user={user} /> <span>{`${firstName} ${lastName}`}</span>
        </div>
        <div className="date-time">
          <h4>Date &amp; Time</h4>
          <AvailableSlots />
        </div>
        <h4>Notes</h4>
        <div className="notes">
          <div>
            <textarea placeholder="Describe your symptoms (optional)" />
          </div>
        </div>
        <button
          type="submit"
          onClick={e => {
            e.preventDefault()
          }}
        >
          Book
        </button>
      </form>
    </div>
  </div>
)

export default BookAppointment

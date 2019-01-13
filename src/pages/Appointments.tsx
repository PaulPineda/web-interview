import * as React from 'react'
import DataLoader from '../components/DataLoader'
import { Props } from '../App'
import SectionHeader from '../components/SectionHeader'
import { formatAppointmentTimeSlot } from '../helpers/date'

interface Appointment {
  id: number
  notes: string | null
  userId: number
  type: string
  dateTime: string
}

const AppointmentsWithData: React.SFC = () => (
  <DataLoader path="/appointments">
    {renderProps => <Appointments {...renderProps} />}
  </DataLoader>
)

const Appointments: React.SFC<Props> = ({
  loading,
  error,
  data: appointments,
}) => (
  <div className="section-container">
    <SectionHeader mainHeading="Appointments" subHeading="Upcoming" />

    <ul className="appointments-slot">
      {loading && <div>Loading</div>}

      {error && (
        <div>Something went wrong. Appointments couldn't be retrieved</div>
      )}

      {!loading &&
        appointments &&
        appointments.map((appointment: Appointment) => {
          const { id, userId, type, dateTime } = appointment
          const key = `${id}_${userId}_${dateTime}`
          const timeslot = formatAppointmentTimeSlot(dateTime)

          return (
            <li key={key}>
              <span className="circle icon container-centered">GP</span>
              <span>
                <h4 className="title">{`${type}`}</h4>
                <span className="timeslot">{timeslot}</span>
              </span>
            </li>
          )
        })}
    </ul>
  </div>
)

export default AppointmentsWithData

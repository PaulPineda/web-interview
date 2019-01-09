import * as React from 'react'
import DataLoader from '../components/DataLoader'
import { Props } from '../App'

const AppointmentType = {
  gp: 'GP',
  physio: 'Physio',
}

interface Appointment {
  id: number
  notes: string | null
  userId: number
  type: string
  dateTime: string
}

const prettifyISO8601 = (dateTime: string) => {
  const [year, month, day, hours, minutes] = dateTime
    .split(/\D+/)
    .map(d => parseInt(d, 10))

  debugger
  const date = new Date(Date.UTC(year, month - 1, day))

  // today
  // tomorrow
  // date

  const intlDay = Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    // year: "2-digit",
  }).format(date)

  return `${intlDay} ${hours}:${minutes}`
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
}) => {
  return (
    <>
      <h1>Appointments</h1>
      <h3>Upcoming</h3>
      <ul>
        {loading && <div>Loading</div>}
        {!loading &&
          appointments &&
          appointments.map((appointment: Appointment) => {
            const { id, userId, type, notes, dateTime } = appointment
            const key = `${id}_${userId}_${dateTime}`
            const timeslot = prettifyISO8601(dateTime)
            return (
              <li key={key}>
                <div className="appointments-slot-title">{`${type} appointment`}</div>
                <div className="appointments-slot-timeslot">{timeslot}</div>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default AppointmentsWithData

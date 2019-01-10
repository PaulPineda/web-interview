import * as React from 'react'
import DataLoader from '../components/DataLoader'
import { Props } from '../App'
import SectionHeader from '../components/SectionHeader'

interface Appointment {
  id: number
  notes: string | null
  userId: number
  type: string
  dateTime: string
}

const differenceInDays = (future: Date, today: Date) => {
  if (future < today) {
    return -1
  }

  return future.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)
}

const formatTimeSlot = (dateTime: string) => {
  const [year, month, day, hours, minutes] = dateTime
    .split(/\D+/)
    .map(d => parseInt(d, 10))

  const date = new Date(Date.UTC(year, month - 1, day))

  const diff = differenceInDays(date, new Date())

  let prefix = ''
  if (diff < 0) {
    prefix = `Past appointment: `
  }

  if (diff === 0) {
    prefix = 'Today at '
  }

  if (diff === 1) {
    prefix = 'Tomorrow at '
  }

  const intlDay = Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(date)

  return `${prefix}${intlDay} ${hours}:${minutes}`
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
          const { id, userId, type, notes, dateTime } = appointment
          const key = `${id}_${userId}_${dateTime}`
          const timeslot = formatTimeSlot(dateTime)
          return (
            <li key={key}>
              <span className="circle icon container-centered">GP</span>
              <span>
                <h4 className="title">{`${type}`}</h4>
                <div className="timeslot">{timeslot}</div>
              </span>
            </li>
          )
        })}
    </ul>
  </div>
)

export default AppointmentsWithData

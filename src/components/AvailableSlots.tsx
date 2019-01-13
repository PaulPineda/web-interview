import * as React from 'react'
import DataLoader from './DataLoader'
import { Props as RenderProps } from '../App'
import { formatAvailableTimeSlot, daysFromToday } from '../helpers/date'

interface Props {
  onClick: (e: React.SyntheticEvent<HTMLInputElement>) => void
  hasErrors: Boolean
  renderOnError: () => React.ReactNode
}

const AvailableSlotsWithData: React.SFC<Props> = props => (
  <DataLoader path="/availableSlots">
    {renderProps => {
      return <AvailableSlots {...renderProps} {...props} />
    }}
  </DataLoader>
)

const AvailableSlots: React.SFC<Props & RenderProps> = ({
  loading,
  error,
  data: slots,
  onClick,
  hasErrors,
  renderOnError,
}) => {
  let returnVal = null

  if (loading) {
    returnVal = <div>Loading</div>
  }

  if (error) {
    returnVal = (
      <div>Something went wrong. Appointments couldn't be retrieved</div>
    )
  }

  if (loading) {
    returnVal = <div>Loading</div>
  }

  if (!loading && slots) {
    returnVal = (
      <ul className="available-slots">
        {slots
          .filter((slot: string, i: number) => i < 4 && daysFromToday(slot) > 0)
          .map((iso8601Date: string, i: number) => {
            const val = formatAvailableTimeSlot(iso8601Date, i)

            return (
              <li key={iso8601Date} className="btn-pill">
                <input
                  type="radio"
                  name="timeslot"
                  id={iso8601Date}
                  value={iso8601Date}
                  onClick={onClick}
                />
                <label htmlFor={iso8601Date}>{val}</label>
              </li>
            )
          })}
      </ul>
    )
  }

  return (
    <>
      {hasErrors && renderOnError()}
      {returnVal}
    </>
  )
}

export default AvailableSlotsWithData

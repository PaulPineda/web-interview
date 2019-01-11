import * as React from 'react'
import DataLoader from './DataLoader'
import { Props } from '../App'
import { formatAvailableTimeSlot, daysFromToday } from '../helpers/date'

const AvailableSlotsWithData: React.SFC = () => (
  <DataLoader path="/availableSlots">
    {renderProps => <AvailableSlots {...renderProps} />}
  </DataLoader>
)

const AvailableSlots: React.SFC<Props> = ({ loading, error, data: slots }) => {
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
          .filter((slot: string) => daysFromToday(slot) > 0)
          .map((slot: string, i: number) => {
            const val = formatAvailableTimeSlot(slot, i) as string

            return (
              i < 4 && (
                <li key={slot} className="btn-pill">
                  <input
                    type="radio"
                    name="time-slot"
                    id={val}
                    value={val}
                    {...i === 0 && { checked: true }}
                  />
                  <label htmlFor={val as string}>{val}</label>
                </li>
              )
            )
          })}
      </ul>
    )
  }

  return returnVal
}

export default AvailableSlotsWithData

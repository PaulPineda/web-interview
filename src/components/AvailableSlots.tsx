import * as React from 'react'
import DataLoader from './DataLoader'
import { Props } from '../App'
import { formatTimeSlot } from '../helpers/date'

const AvailableSlotsWithData: React.SFC = () => (
  <DataLoader path="/availableSlots">
    {renderProps => <AvailableSlots {...renderProps} />}
  </DataLoader>
)

const AvailableSlots: React.SFC<Props> = ({ loading, error, data: slots }) => (
  <ul className="available-slots">
    {loading && <div>Loading</div>}

    {error && (
      <div>Something went wrong. Appointments couldn't be retrieved</div>
    )}

    {!loading &&
      slots &&
      slots.map((slot: string) => <li>{formatTimeSlot(slot, true)}</li>)}
  </ul>
)

export default AvailableSlotsWithData
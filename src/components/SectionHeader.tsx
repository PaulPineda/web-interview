import * as React from 'react'

interface Props {
  mainHeading: string
  subHeading: string
}

const SectionHeader: React.SFC<Props> = ({ mainHeading, subHeading }) => (
  <>
    <h1 className="section-appointments-heading">Appointments</h1>
    <h3 className="section-appointments-sub">Upcoming</h3>
  </>
)

export default SectionHeader

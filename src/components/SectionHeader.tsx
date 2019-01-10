import * as React from 'react'

interface Props {
  mainHeading: string
  subHeading?: string
}

const SectionHeader: React.SFC<Props> = ({ mainHeading, subHeading }) => (
  <>
    <h1 className="section-appointments-heading">{mainHeading}</h1>
    {subHeading && <h3 className="section-appointments-sub">{subHeading}</h3>}
  </>
)

export default SectionHeader

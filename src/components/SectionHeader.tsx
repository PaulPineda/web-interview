import * as React from 'react'

interface Props {
  mainHeading: string
  subHeading?: string
}

const SectionHeader: React.SFC<Props> = ({ mainHeading, subHeading }) => (
  <>
    <h1>{mainHeading}</h1>
    {subHeading && <h3>{subHeading}</h3>}
  </>
)

export default SectionHeader

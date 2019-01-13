import * as React from 'react'
import SectionHeader from '../components/SectionHeader'
import { AuthUser } from '../App'

interface Props {
  user: AuthUser
}

const FamilyMembers: React.SFC<Props> = ({ user }) => (
  <div className="section">
    <SectionHeader mainHeading="Family Members" />
  </div>
)

export default FamilyMembers

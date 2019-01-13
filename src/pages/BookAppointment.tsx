import * as React from 'react'
import SectionHeader from '../components/SectionHeader'
import { AuthUser } from '../App'
import Avatar from '../components/Avatar'
import AvailableSlots from '../components/AvailableSlots'
import { API_ENDPOINT } from '../config'
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom'

interface RouteParams {
  userId: string
}

interface Props extends RouteComponentProps<RouteParams> {
  user: AuthUser
}

interface FormState {
  user: AuthUser
  bookedSlot: string
  notes?: string
}

interface State {
  form: FormState
  hasErrors: boolean
  requestStatus: Array<Error | String | null>
}

interface FormData {
  userId: any
  dateTime: string
  notes?: string
  type: string
}

const bookAppointment = async (formData: FormData) => {
  const res = await fetch(`${API_ENDPOINT}/appointments`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(formData),
  })

  if (res.status === 200 || res.status === 201) {
    return 'Success'
  }

  throw Error('Something went wrong.')
}

class BookAppointment extends React.Component<Props, State> {
  public state = {
    form: { user: this.props.user, bookedSlot: '', notes: '' },
    hasErrors: false,
    requestStatus: [null, null],
    delayReirectTimeout: null,
  }

  protected handleTimeSlotClick = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    this.setState({
      form: { ...this.state.form, bookedSlot: e.currentTarget.value },
    })
  }

  protected handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.setState({
      form: { ...this.state.form, notes: e.currentTarget.value },
    })
  }

  protected hasErrors = (form: FormState) => {
    return !form.bookedSlot
  }

  protected cleanFormData = ({ userId, dateTime, notes, type }: FormData) => ({
    userId: parseInt(userId, 10),
    dateTime,
    notes: notes || '',
    type,
  })

  protected handleSubmit = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault()

    if (this.hasErrors(this.state.form)) {
      return this.setState({ hasErrors: true })
    }

    const { bookedSlot, notes } = this.state.form
    const {
      match: {
        params: { userId },
      },
    } = this.props

    const formParams = this.cleanFormData({
      userId,
      dateTime: bookedSlot,
      notes,
      type: 'GP appointment',
    })

    await bookAppointment(formParams)
      .then(res => this.setState({ requestStatus: [null, res] }))
      .catch(err => this.setState({ requestStatus: [err, null] }))
  }

  public render() {
    const {
      user,
      user: { firstName, lastName },
    } = this.props

    const {
      requestStatus: [responseError, responseSuccess],
      hasErrors,
    } = this.state

    return (
      <div className="section booking">
        <SectionHeader mainHeading="New Appointment" />
        <form onSubmit={this.handleSubmit}>
          <div className="choose-user">
            <Avatar user={user} /> <span>{`${firstName} ${lastName}`}</span>
          </div>

          <h4>Date &amp; Time</h4>
          <div className="date-time">
            <AvailableSlots
              onClick={this.handleTimeSlotClick}
              hasErrors={hasErrors}
              renderOnError={() => (
                <span className="response required">
                  Please choose time slot
                </span>
              )}
            />
          </div>

          <h4>Notes</h4>
          <div className="notes">
            <textarea
              onChange={this.handleTextAreaChange}
              placeholder="Describe your symptoms (optional)"
            />
          </div>

          <button type="submit">Book</button>

          {responseError && (
            <span className="response error">
              Something went wrong. Your booking was not successful
            </span>
          )}

          {responseSuccess && <Redirect to="/appointments" />}
        </form>
      </div>
    )
  }
}

export default withRouter(BookAppointment)

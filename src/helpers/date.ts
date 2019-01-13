export interface Dissolved8601 {
  date: Date
  year: number
  month: number
  day: number
  hours: number
  minutes: number
}

const differenceInDays = (future: Date, today: Date) => {
  if (future < today) {
    return -1
  }

  return future.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)
}

export const daysFromToday = (dateTime: string) => {
  const { date } = dissolveISO8601String(dateTime)

  return differenceInDays(date, new Date())
}

export const dissolveISO8601String = (dateTime: string): Dissolved8601 => {
  const [year, month, day, hours, minutes] = dateTime
    .split(/\D+/)
    .map(d => parseInt(d, 10))

  const date = new Date(Date.UTC(year, month, day))

  return {
    date,
    year,
    month: month - 1,
    day,
    hours,
    minutes,
  }
}

export const formatAppointmentTimeSlot = (dateTime: string) => {
  const { date, hours, minutes } = dissolveISO8601String(dateTime)

  const diff = daysFromToday(dateTime)
  const datePassed = diff < 0
  const isToday = diff === 0
  const isTomorrow = diff === 1

  const intlDay = Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(date)

  let prefix = ''

  if (datePassed) return `Past appointment: ${intlDay} ${hours}:${minutes}`

  if (isToday) return `Today at ${hours}:${minutes}`

  if (isTomorrow) return `Tomorrow at ${hours}:${minutes}`

  return `${intlDay} at ${hours}:${minutes}`
}

export const formatAvailableTimeSlot = (dateTime: string, i: number) => {
  const { date, hours, minutes } = dissolveISO8601String(dateTime)

  const diff = daysFromToday(dateTime)

  const prefix = i === 0 ? 'Today ' : ''

  /*
    The following is the correct logic that would be used
    assuming the API returned results 

    const datePassed = diff < 0
    const isToday = diff === 0

    if (datePassed) return null

    if (isToday && i === 0) return `Today ${hours}:${minutes}`

    if (isToday) return `Today ${hours}:${minutes}`

    return 'Another time'
  */

  if (diff < 0) {
    return null
  }

  if (i > 2) {
    return 'Another time'
  }

  if (diff >= 0) {
    return `${prefix}${hours}:${minutes}`
  }
}

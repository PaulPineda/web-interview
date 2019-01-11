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

  const intlDay = Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(date)

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

  return `${prefix}${intlDay} ${hours}:${minutes}`
}

export const formatAvailableTimeSlot = (dateTime: string, i: number) => {
  const { date, hours, minutes } = dissolveISO8601String(dateTime)

  const diff = daysFromToday(dateTime)

  if (diff < 0) {
    return null
  }

  let prefix = i === 0 ? 'Today ' : ''

  if (i > 2) {
    return 'Another time'
  }

  if (diff >= 0) {
    return `${prefix}${hours}:${minutes}`
  }
}

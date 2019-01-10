const differenceInDays = (future: Date, today: Date) => {
  if (future < today) {
    return -1
  }

  return future.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)
}

export const formatTimeSlot = (dateTime: string, hidePrefix?: boolean) => {
  const [year, month, day, hours, minutes] = dateTime
    .split(/\D+/)
    .map(d => parseInt(d, 10))

  const date = new Date(Date.UTC(year, month - 1, day))

  const diff = differenceInDays(date, new Date())

  const intlDay = Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(date)

  if (hidePrefix) {
    return `${intlDay} ${hours}:${minutes}`
  }

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

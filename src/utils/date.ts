import dayjs from 'dayjs'
export const formatDate = (date?: string|null): string => {
  if (!date) return ''
  return dayjs(date).format('YYYY/MM/DD HH時')
}
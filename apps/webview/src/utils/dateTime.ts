const KST_OFFSET_MS = 9 * 60 * 60 * 1000

const pad = (value: number) => String(value).padStart(2, '0')

function toKstParts(iso: string) {
  const kst = new Date(new Date(iso).getTime() + KST_OFFSET_MS)
  return {
    year: kst.getUTCFullYear(),
    month: kst.getUTCMonth() + 1,
    day: kst.getUTCDate(),
    hours: kst.getUTCHours(),
    minutes: kst.getUTCMinutes(),
  }
}

export function toKstDateTime(date: string, time: string): string | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time)
  if (dateMatch === null || timeMatch === null) {
    return null
  }
  const [year, month, day] = dateMatch.slice(1).map(Number)
  const [hours, minutes] = timeMatch.slice(1).map(Number)
  const utc = new Date(Date.UTC(year, month - 1, day, hours, minutes))
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== month - 1 ||
    utc.getUTCDate() !== day ||
    utc.getUTCHours() !== hours ||
    utc.getUTCMinutes() !== minutes
  ) {
    return null
  }
  return `${date}T${time}:00+09:00`
}

export function toKstDateAndTime(iso: string) {
  const { year, month, day, hours, minutes } = toKstParts(iso)
  return { date: `${year}-${pad(month)}-${pad(day)}`, time: `${pad(hours)}:${pad(minutes)}` }
}

export function toKstToday(now: Date) {
  return toKstDateAndTime(now.toISOString()).date
}

export function formatDeadline(iso: string) {
  const { year, month, day } = toKstParts(iso)
  return `${year}년 ${pad(month)}월 ${pad(day)}일 마감`
}

export function formatMeetingAt(iso: string) {
  const { year, month, day, hours, minutes } = toKstParts(iso)
  return `${year}년 ${pad(month)}월 ${pad(day)}일 / ${pad(hours)}:${pad(minutes)}`
}

export function formatCardDate(iso: string) {
  const { month, day } = toKstParts(iso)
  return `${month}월${day}일`
}

export function formatCardTime(iso: string) {
  const { hours, minutes } = toKstParts(iso)
  return `${pad(hours)}:${pad(minutes)}`
}

export function formatAdmissionYear(year: number) {
  return `${pad(year % 100)}학번`
}

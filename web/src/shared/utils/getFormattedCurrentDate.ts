export function getFormattedCurrentDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as const

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("en-US", options)

  return formattedDate
}

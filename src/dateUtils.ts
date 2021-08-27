export function formatDate(str: string) {
  const d = new Date(str);
  const date = d.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric"
  })
  const time = d.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  return `${date} ${time}`
}
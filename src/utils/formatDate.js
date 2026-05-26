export function formatDate(isoDate) {
  const date = new Date(isoDate);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

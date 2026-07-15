export const formatNotificationTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diff = now - date;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return "Just now";
  }

  if (diff < hour) {
    return `${Math.floor(diff / minute)}m Ago`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}h Ago`;
  }

  if (diff < day * 2) {
    return "1 day ago";
  }

  if (diff < day * 7) {
    return `${Math.floor(diff / day)}d ago`;
  }

  const isCurrentYear = date.getFullYear() === now.getFullYear();

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(isCurrentYear ? {} : { year: "numeric" }),
  });
};

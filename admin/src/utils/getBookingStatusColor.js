export const getBookingStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "text-yellow-600";

    case "INTERESTED":
      return "text-blue-600";

    case "NOT_INTERESTED":
      return "text-red-500";

    case "IN_PROGRESS":
      return "text-purple-600";

    case "CANCELLED":
      return "text-red-600";

    case "COMPLETED":
      return "text-green-600";

    default:
      return "text-gray-500";
  }
};

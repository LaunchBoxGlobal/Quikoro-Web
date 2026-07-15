export const getStatusStyles = (status = "") => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return {
        text: "text-yellow-500",
        bg: "bg-yellow-100",
      };

    case "INTERESTED":
      return {
        text: "text-blue-500",
        bg: "bg-blue-100",
      };

    case "NOT_INTERESTED":
      return {
        text: "text-red-500",
        bg: "bg-red-100",
      };

    case "COMPLETED":
      return {
        text: "text-green-500",
        bg: "bg-green-100",
      };

    case "CANCELLED":
      return {
        text: "text-red-700",
        bg: "bg-red-100",
      };

    default:
      return {
        text: "text-gray-600",
        bg: "bg-gray-100",
      };
  }
};

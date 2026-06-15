export const statuses = ["Pending", "Accepted", "In Progress", "Completed"];

export const statusStyles = {
  Pending: "bg-orange-100 text-orange-500",
  Accepted: "bg-blue-100 text-blue-500",
  "In Progress": "bg-purple-100 text-purple-500",
  Completed: "bg-green-100 text-green-500",
};

export const filters = [
  { title: "All", query: "ALL" },
  { title: "Pending", query: "PENDING" },
  { title: "Interested", query: "INTERESTED" },
  { title: "In Progress", query: "IN_PROGRESS" },
  { title: "Completed", query: "COMPLETED" },
  { title: "Cancelled", query: "CANCELLED" },
];

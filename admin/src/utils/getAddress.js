export const getAddress = (user) => {
  return [user?.city, user?.state, user?.country]
    .filter((item) => item && item !== "N/A" && item !== "null")
    .join(", ");
};

export const getFullAddress = (user) => {
  return [
    user?.streetAddress,
    user?.city,
    user?.state,
    user?.zipCode,
    user?.country,
  ]
    .filter((item) => item && item.trim() !== "" && item !== "N/A")
    .join(", ");
};

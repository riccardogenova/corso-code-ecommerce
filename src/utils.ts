export const utilityGetPreviousUsername = () => {
  const username = localStorage.getItem("username");
  return username || "";
};

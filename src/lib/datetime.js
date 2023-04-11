export function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
function formatDate(date) {
  const d = new Date(date);
  const formattedDate = d.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const formattedTime = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return `${formattedDate}, ${formattedTime}`;
}

export default formatDate;
  
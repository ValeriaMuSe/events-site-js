function formatDate(date) {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Date(date).toLocaleString('en-US', options);
  }
  
  export default formatDate;
  
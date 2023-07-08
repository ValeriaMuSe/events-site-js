function saveEvent(eventName, key) {
  const events = getEvents(key);
  events.push(eventName);
  localStorage.setItem(key, JSON.stringify(events));
}

function getEvents(key) {
  const events = localStorage.getItem(key);
  return events ? JSON.parse(events) : [];
}

export { saveEvent, getEvents };
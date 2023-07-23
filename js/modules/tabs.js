import formatDate from './utils/formatDate.js';
import { renderPrice } from './utils/renderPrice.js';
import { EventAPIProxy } from './services/eventAPI.js';
import { saveEvent, getEvents } from './localstorage/LocalStorage.js';
import { singletonState } from './state/state.js';
import { handleHeartImageClick } from './favoriteBtn.js';

const eventApi = EventAPIProxy;

function renderEvents(eventsData) {
  var gridContainer = document.getElementById('grid-container');
  if (!gridContainer) {
    gridContainer = document.createElement('div');
    gridContainer.id = 'grid-container';
    document.body.appendChild(gridContainer);

  }
 
  if (!Array.isArray(eventsData)) {
    
    eventsData = [];
  }

  gridContainer.innerHTML = eventsData
    .map((event) => `
      <div class="event event-card">
        <img class="event_image" src="${event.image}">
        <div class="container-icon">
          <div class="rounded-bg">
            <img class="heart-image" src="${singletonState.getState().favorites.length > 0 ? singletonState.getState().favorites[0].heartImage : ''}">
          </div>
        </div>
        <p class="event_title">${event.title}</p>
        <p>${formatDate(event.date)}</p>
        <p>${renderPrice(event.price)}</p>
        <p>Location: ${event.location.city}, ${event.location.state}, ${event.location.address}</p>
        <div class="button-container">
          <button class="interested-button">Interested</button>
          <button class="going-button">Going!</button>
        </div>
      </div>
    `)
    .join('');

  const interestedButtons = document.getElementsByClassName('interested-button');
  for (let i = 0; i < interestedButtons.length; i++) {
    interestedButtons[i].addEventListener('click', handleInterestedButtonClick);
  }

  const goingButtons = document.getElementsByClassName('going-button');
  for (let i = 0; i < goingButtons.length; i++) {
    goingButtons[i].addEventListener('click', handleGoingButtonClick);
  }

  handleHeartImageClick();
}


function handleInterestedButtonClick(event) {
  const eventCard = event.target.closest('.event-card');


  const eventTitleElement = eventCard.querySelector('.event_title');


  // Verifica si se encontró el elemento .event_title
  if (!eventTitleElement) {
    return;
  }

  const eventTitle = eventTitleElement.textContent;
  let eventkey = document.querySelector('.default-tab-button').textContent;
  eventkey = eventkey.toLowerCase();
  const selectedEvents = getEvents(eventkey);
  const selectedEvent = selectedEvents.find(element => element.title === eventTitle);


  if (!selectedEvent) {
    return;
  }

 
  saveEvent(selectedEvent, 'interested');
}



function handleGoingButtonClick(event) {
  const eventCard = event.target.closest('.event-card');
  const eventTitle = eventCard.querySelector('.event_title').textContent;
  let eventkey = document.querySelector('.default-tab-button').textContent;
  eventkey = eventkey.toLowerCase();
  const selectedEvents = getEvents(eventkey);
  const selectedEvent = selectedEvents.find(element => element.title === eventTitle);
  const events = getEvents('going');
  const eventExists = events.some(storedEvent => storedEvent.title === eventTitle);

  if (!eventExists) {
    saveEvent(selectedEvent, 'going');
  } 
}

function handleClick(category) {
  eventApi.getEventsByCategory(category)
    .then(eventsData => {
      renderEvents(eventsData);
    })
    .catch(error => {
      console.error(error);
    });
}

export { handleClick, handleHeartImageClick, renderEvents };
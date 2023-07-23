import { saveEvent, getEvents } from './localstorage/LocalStorage.js';
import { singletonState } from './state/state.js';

let favorites = []; 


function handleHeartImageClick() {
  const heartImages = document.querySelectorAll('.heart-image');
  heartImages.forEach(heartImage => {
    addHeartImageEventListener(heartImage);
  });
}

function addHeartImageEventListener(heartImage) {
  
  
  const state = new Map(); // Create a Map to store the state for each heart image

  heartImage.addEventListener('click', () => {
    if (localStorage.getItem('favorites') != null )  {
      favorites  = localStorage.getItem('favorites');
      favorites = JSON.parse(favorites);
    }
    const currentState = state.get(heartImage) || { isClicked: false }; // Get the current state for the heart image

    const eventCard = heartImage.closest('.event-card');
    const eventTitle = eventCard.querySelector('.event_title').textContent;

    const eventIndex = favorites.findIndex(event => event.eventTitle === eventTitle);

    if (currentState.isClicked) {
      // If the heart is currently filled (clicked), remove the event from favorites and set the heart to empty
      favorites.splice(eventIndex, 1);
      heartImage.src = './images/heart.svg';
    } else {
      // If the heart is currently empty, add the event to favorites and set the heart to filled
      const selectedEvent = getEventByTitle(eventTitle);
      if (!selectedEvent) {
        return;
      }
      favorites.push({ ...selectedEvent });
      heartImage.src = './images/heart-filled.svg';
    }

    const favoriteEvents = getEvents('favorites');

    if (currentState.isClicked) {
      // If the heart is currently filled (clicked), remove the event from favoriteEvents in localStorage
      const eventIndex = favoriteEvents.indexOf(eventTitle);
      if (eventIndex !== -1) {
        favoriteEvents.splice(eventIndex, 1);
        localStorage.setItem('favorites', JSON.stringify(favoriteEvents));
      }
    } 
    

    const newState = { isClicked: !currentState.isClicked }; // Update the state for the heart image
    state.set(heartImage, newState); // Store the updated state for the heart image

    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
}

function getEventByTitle(title) {
  // Search the event in the 'favorites' list first
  const favoriteEvent = favorites.find(event => event.eventTitle === title);
  if (favoriteEvent) {
    return favoriteEvent;
  }

  // If not found in 'favorites', search in the currently selected events
  const eventKey = document.querySelector('.default-tab-button').textContent.toLowerCase();
  const selectedEvents = getEvents(eventKey);
  return selectedEvents.find(element => element.title === title);
}

document.addEventListener('DOMContentLoaded', handleHeartImageClick);

singletonState.addEvent('favorites', { heartImage: './images/heart.svg' });

export { handleHeartImageClick };
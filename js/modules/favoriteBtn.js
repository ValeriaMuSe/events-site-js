import { singletonState } from './state/state.js';
import { saveEvent, getEvents } from './localstorage/LocalStorage.js';

let favorites = []; // Define and initialize the 'favorites' variable

function handleHeartImageClick() {
  const heartImages = document.querySelectorAll('.heart-image');
  heartImages.forEach(heartImage => {
    addHeartImageEventListener(heartImage);
  });
}

function addHeartImageEventListener(heartImage) {
  const state = new Map(); // Create a Map to store the state for each heart image

  heartImage.addEventListener('click', () => {
    const currentState = state.get(heartImage) || { isClicked: false }; // Get the current state for the heart image

    const newHeartImage = currentState.isClicked ? './images/heart.svg' : './images/heart-filled.svg';

    heartImage.src = newHeartImage;

    const eventCard = heartImage.closest('.event-card');
    const eventTitle = eventCard.querySelector('.event_title').textContent;

    let updatedHeartImage;
    if (favorites.length > 0 && favorites[0].eventTitle === eventTitle) {
      updatedHeartImage = favorites[0].heartImage === './images/heart.svg' ? './images/heart-filled.svg' : './images/heart.svg';
      favorites[0].heartImage = updatedHeartImage;
      if (updatedHeartImage === './images/heart.svg') {
        favorites.shift(); // Remove the event from the state
      }
    } else {
      updatedHeartImage = './images/heart-filled.svg';
      favorites.unshift({ eventTitle, heartImage: updatedHeartImage });
    }

    heartImage.src = updatedHeartImage;

    const favoriteEvents = getEvents('favoriteEvents');

    if (updatedHeartImage === './images/heart-filled.svg') {
      if (!favoriteEvents.includes(eventTitle)) {
        saveEvent(eventTitle, 'favoriteEvents');
        console.log('LocalStorage: Event added to favorites:', eventCard);
      }
    } else {
      const eventIndex = favoriteEvents.indexOf(eventTitle);
      if (eventIndex !== -1) {
        favoriteEvents.splice(eventIndex, 1);
        localStorage.setItem('favoriteEvents', JSON.stringify(favoriteEvents));
        console.log('LocalStorage: Event removed from favorites:', eventTitle);
      }
    }

    console.log('Current favorites:', favorites);
    const newState = { isClicked: !currentState.isClicked }; // Update the state for the heart image
    state.set(heartImage, newState); // Store the updated state for the heart image

    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
}

document.addEventListener('DOMContentLoaded', handleHeartImageClick);

singletonState.addEvent('favorites', { heartImage: './images/heart.svg' });

export { handleHeartImageClick };
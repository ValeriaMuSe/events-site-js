import { singletonState } from './state/state.js';
import { saveEvent, getEvents } from './localstorage/LocalStorage.js';

function handleHeartImageClick() {
  const heartImages = document.querySelectorAll('.heart-image');
  heartImages.forEach(heartImage => {
    heartImage.addEventListener('click', () => {
      const currentState = singletonState.getState();
      const newHeartImage = currentState.heartImage === './images/heart.svg' ? './images/heart-filled.svg' : './images/heart.svg';

      if (newHeartImage) {
        heartImage.src = newHeartImage;
        singletonState.addEvent('favorites', { heartImage: newHeartImage });

        const eventCard = heartImage.closest('.event-card');
        const eventTitle = eventCard.querySelector('.event_title').textContent;

        const favoriteEvents = getEvents('favoriteEvents');

        if (newHeartImage === './images/heart-filled.svg') {
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
      }
    });
  });
}

// Configurar el estado inicial de heartImage
singletonState.addEvent('favorites', { heartImage: './images/heart.svg' });

export { handleHeartImageClick };

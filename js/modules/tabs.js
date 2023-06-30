// import formatDate from './utils/formatDate.js';
// import { renderPrice } from './utils/renderPrice.js';
// import { EventAPIProxy } from './services/eventAPI.js';



// const eventApi = EventAPIProxy;

// function renderEvents(eventsData) {
//   var gridContainer = document.getElementById('grid-container');
//   if (!gridContainer) {
//     gridContainer = document.createElement('div');
//     gridContainer.id = 'grid-container';
//     document.body.appendChild(gridContainer);
//   }
//   gridContainer.innerHTML = eventsData
//     .map((event) => `
//       <div class="event event-card">
//         <img class="event_image" src="${event.image}">
//         <div class="container-icon">
//           <div class="rounded-bg">
//             <img class="heart-image" src="./images/heart.png">
//           </div>
//         </div>
//         <p class="event_title">${event.title}</p>
//         <p>${formatDate(event.date)}</p>
//         <p>${renderPrice(event.price)}</p>
//         <p>Location: ${event.location.city}, ${event.location.state}, ${event.location.address}</p>
//         <div class="button-container">
//           <button class="interested-button">Interested</button>
//           <button class="going-button">Going!</button>
//         </div>
//       </div>
//     `)
//     .join('');
// }

// function handleClick(category) {
//   eventApi.getEventsByCategory(category)
//     .then(eventsData => {
//       renderEvents(eventsData);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }




// export { handleClick }



import formatDate from './utils/formatDate.js';
import { renderPrice } from './utils/renderPrice.js';
import { EventAPIProxy } from './services/eventAPI.js';
import { saveEvent, getEvents } from './localstorage/LocalStorage.js';

const eventApi = EventAPIProxy;

function renderEvents(eventsData) {
  var gridContainer = document.getElementById('grid-container');
  if (!gridContainer) {
    gridContainer = document.createElement('div');
    gridContainer.id = 'grid-container';
    document.body.appendChild(gridContainer);
  }
  gridContainer.innerHTML = eventsData
    .map((event) => `
      <div class="event event-card">
        <img class="event_image" src="${event.image}">
        <div class="container-icon">
          <div class="rounded-bg">
            <img class="heart-image" src="./images/heart.png">
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
}

function handleInterestedButtonClick(event) {
  const eventCard = event.target.closest('.event-card');
  const eventTitle = eventCard.querySelector('.event_title').textContent;
  const events = getEvents('interestedEvents');
  const eventExists = events.some((storedEvent) => storedEvent.title === eventTitle);
  
  if (!eventExists) {
    saveEvent(eventTitle, 'interestedEvents');
    console.log('Event added to LocalStorage:', eventTitle);
  } else {
    console.log('Event already exists in LocalStorage:', eventTitle);
  }
}

function handleGoingButtonClick(event) {
  const eventCard = event.target.closest('.event-card');
  const eventTitle = eventCard.querySelector('.event_title').textContent;
  const events = getEvents('goingEvents');
  const eventExists = events.some((storedEvent) => storedEvent.title === eventTitle);
  
  if (!eventExists) {
    saveEvent(eventTitle, 'goingEvents');
    console.log('Event added to LocalStorage:', eventTitle);
  } else {
    console.log('Event already exists in LocalStorage:', eventTitle);
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



export { handleClick };


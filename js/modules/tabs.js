import formatDate from './utils/formatDate.js';
import { renderPrice } from './utils/renderPrice.js';
import { EventAPIProxy } from './services/eventAPI.js';

const eventApi = EventAPIProxy;

// function renderEvents(eventsData) {
//   var gridContainer = document.getElementById('grid-container');
//   if (!gridContainer) {
//     gridContainer = document.createElement('div');
//     gridContainer.id = 'grid-container';
//     document.body.appendChild(gridContainer);
//   }
//   gridContainer.innerHTML = eventsData
//     .map((event) => `
//       <div class="event">
//         <img class="event_image" src="${event.image}">
//         <p class="event_title">${event.title}</p>
//         <p>${formatDate(event.date)}</p>
//         <p>${renderPrice(event.price)}</p>
//         <p>Location: ${event.location.city}, ${event.location.state},${event.location.address} </p>
      
//       </div>
//     `)
//     .join('');
// }

function renderEvents(eventsData) {
  var gridContainer = document.getElementById('grid-container');
  if (!gridContainer) {
    gridContainer = document.createElement('div');
    gridContainer.id = 'grid-container';
    document.body.appendChild(gridContainer);
  }
  gridContainer.innerHTML = eventsData
    .map((event) => `
      <div class="event">
        <img class="event_image" src="${event.image}">
        <div class="container-icon">
        <div class="rounded-bg">
            <img class="heart-image" src="../images/heart.png">
        </div>
    </div>
        <p class="event_title">${event.title}</p>
        <p>${formatDate(event.date)}</p>
        <p>${renderPrice(event.price)}</p>
        <p>Location: ${event.location.city}, ${event.location.state}, ${event.location.address}</p>
        <button class="interested-button">Interested</button>
        <button class="going-button">Going!</button>
      </div>
    `)
    .join('');
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

export { handleClick }
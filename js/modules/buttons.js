import formatDate from './formatDate.js';
import { renderPrice } from './renderPrice.js';
import { EventAPIProxy } from './services/eventAPI.js';

const eventApi = new EventAPIProxy();

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
        <p class="event_title">${event.title}</p>
        <p>${formatDate(event.date)}</p>
        <p>${renderPrice(event.price)}</p>
        <p>Location: ${event.location.city}, ${event.location.state},${event.location.address} </p>
      </div>
    `)
    .join('');
}

function handleClick(category) {
  eventApi.getEventsByCategory(category)
    .then(eventsData => {
      console.log('Events:', eventsData);
      renderEvents(eventsData);
    })
    .catch(error => {
      console.error(error);
    });
}


function initializeButtons() {
  var eventscategories = ['Music', 'Sports', 'Business', 'Food', 'Art'];
  var defaultButton = null;

  eventscategories.forEach(function (category) {
    var button = document.createElement('button');
    button.innerHTML = category;
    button.addEventListener('click', function () {
      console.log('Categoría seleccionada: ' + category);
      if (defaultButton !== null) {
        defaultButton.classList.remove('default-tab-button');
      }
      handleClick(category.toLowerCase());
      button.classList.add('default-tab-button');
      defaultButton = button;
    });

    var container = document.querySelector('.container');
    container.appendChild(button);
    if (category === 'Music') {
      button.classList.add('default-tab-button');
      defaultButton = button;
    }
  });

  var buttons = document.querySelectorAll('.container button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('tab-button');
  }

  handleClick('music');
}

export { initializeButtons };

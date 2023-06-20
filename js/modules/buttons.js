import formatDate from './dateFormatter.js';
import formatPrice from './priceFormatter.js';
import { EventAPIProxy } from './eventAPI.js';

const eventApi = new EventAPIProxy();

export { eventApi, formatDate, formatPrice };

function renderEvents(eventsData) {
  var gridContainer = document.getElementById('grid-container');
  // Limpiar la cuadrícula de eventos existente
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
        <p>${formatPrice(event.price)}</p>
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
  var container = document.createElement('div');
  container.id = 'tab-container';
  document.body.appendChild(container);
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

    container.appendChild(button);
    if (category === 'Music') {
      button.classList.add('default-tab-button');
      defaultButton = button; 
    }
  });

  container.classList.add('flex-container');
  var buttons = container.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('tab-button');
  }
  
  handleClick('music');
}
export { initializeButtons };
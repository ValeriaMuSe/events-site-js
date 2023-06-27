import { handleClick } from '../tabs.js'

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
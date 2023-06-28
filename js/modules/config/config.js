import { handleClick } from '../tabs.js'

function initializeButtons() {
  var eventscategories = ['Music', 'Sports', 'Business', 'Food', 'Art'];
  var defaultButton = null;

  var navigationContainer = document.querySelector('.container');
  navigationContainer.innerHTML += `
    <div class="account__container">
      <a class="my-account__link" href="../../../account.html">My account</a>
      <a class="my-account__link" href="../../../account.html"><img class="arrow-right__icon" src="./images/arrow-right-icon.svg"></a>
    </div>
  `
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


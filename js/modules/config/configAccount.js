
import { accountcategories } from './categories.js';
import { renderEvents } from '../tabs.js';

function createNavigationTabs() {
 let defaultButton = null;
 let currentMonth = null;
 let currentYear = null;

 let container = document.querySelector('.container');
  container.innerHTML += `
    <div class="container-account">
      <a class="my-account_link" href="./index.html"><img class="arrow-left__icon" src="./images/arrow-left-icon.svg"></a>
      <a class="my-account__link link-variant" href="./index.html">Back to events</a>
    </div>
  `;

 let gridContainer = document.getElementById('grid-container');

 let tabContentContainer = document.createElement('div');
  tabContentContainer.className = 'tab-content-container';

 let tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs';

  Object.values(accountcategories).forEach(function (category) {
   let button = document.createElement('button');
    button.innerHTML = category;
    button.addEventListener('click', function () {
      if (defaultButton !== null) {
        defaultButton.classList.remove('default-tab-button');
      }

      renderEvents(JSON.parse(localStorage.getItem(category.toLowerCase())));
      button.classList.add('default-tab-button');
      defaultButton = button;
    });

    button.className = 'tab tab-button';

    if (category === 'Calendar') {
      button.classList.add('calendar', 'boton');
    }

    tabsContainer.appendChild(button);

    if (category === 'Favorites') {
      button.classList.add('default-tab-button');
      defaultButton = button;

     let favoritesContent = document.createElement('div');
      favoritesContent.id = 'favorites';
      favoritesContent.className = 'tab-content favorites-content';
      favoritesContent.textContent = 'Favorite Events';
      tabContentContainer.appendChild(favoritesContent);
    } else if (category === 'Calendar') {
      button.addEventListener('click', function () {
        showCalendarTab();
      });

     let calendarContent = document.createElement('div');
      calendarContent.id = 'calendar';
      calendarContent.className = 'tab-content calendar-content';
      calendarContent.style.display = 'none';

     let calendarTitle = document.createElement('h2');
      calendarTitle.id = 'calendar-title';
      calendarContent.appendChild(calendarTitle);

     let btnsContainer = document.createElement('div');
      btnsContainer.className = 'calendar btns-container';

     let prevMonthButton = document.createElement('button');
      prevMonthButton.innerHTML = 'Previous Month';
      prevMonthButton.className = 'calendar-button';
      prevMonthButton.addEventListener('click', function () {
        showPreviousMonth();
      });
      btnsContainer.appendChild(prevMonthButton);

     let nextMonthButton = document.createElement('button');
      nextMonthButton.innerHTML = 'Next Month';
      nextMonthButton.className = 'calendar-button';
      nextMonthButton.addEventListener('click', function () {
        showNextMonth();
      });
      btnsContainer.appendChild(nextMonthButton);

      calendarContent.appendChild(btnsContainer);

     let calendar = document.createElement('div');
      calendar.id = 'calendar-body';
      calendar.className = 'calendar-body';
      calendarContent.appendChild(calendar);

      tabContentContainer.appendChild(calendarContent);
    }
  });

  container.appendChild(tabsContainer);
  container.appendChild(tabContentContainer);

  function showTab(tabName) {
   let tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
      if (tabContents[i].id === tabName) {
        tabContents[i].style.display = 'block';
      } else {
        tabContents[i].style.display = 'none';
      }
    }
  }

  function showCalendarTab() {
   let tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }

   let calendarTab = document.getElementById('calendar');
    if (!calendarTab) {
      calendarTab = document.createElement('div');
      calendarTab.id = 'calendar';
      calendarTab.className = 'tab-content calendar-content';
      document.body.appendChild(calendarTab);
    }

    calendarTab.style.display = 'block';
    renderCalendar();
  }

  function renderCalendar() {
   let currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();

   let calendarTitle = document.getElementById('calendar-title');
    calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

    generateCalendar(currentYear, currentMonth);
    let gridContainer = document.getElementById('grid-container');
     if (gridContainer) {
      gridContainer.appendChild(calendar);
     }
  }

  function showPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
   let calendarTitle = document.getElementById('calendar-title');
    calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

    generateCalendar(currentYear, currentMonth);
  }

  function showNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
   let calendarTitle = document.getElementById('calendar-title');
    calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

    generateCalendar(currentYear, currentMonth);
  }

  function getMonthName(month) {
   let monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  }

  function generateCalendar(year, month) {
   let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   let currentDate = new Date(year, month);
   let currentYear = currentDate.getFullYear();
   let currentMonth = currentDate.getMonth();
   let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
   let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
   let calendarTitle = document.getElementById('calendar-title');

   let calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    for (let i = 0; i < dayNames.length; i++) {
     let dayNameCell = document.createElement('div');
      dayNameCell.classList.add('day-name-cell');
      dayNameCell.innerHTML = dayNames[i];
      calendarBody.appendChild(dayNameCell);
    }

    for (let i = 0; i < firstDayIndex; i++) {
     let emptyCell = document.createElement('div');
      emptyCell.classList.add('empty-cell');
      calendarBody.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
     let dayCell = document.createElement('div');
      dayCell.classList.add('day-cell');
      dayCell.innerHTML = day;
      calendarBody.appendChild(dayCell);
    }
  }

  showTab('favorites');
}

export { createNavigationTabs };
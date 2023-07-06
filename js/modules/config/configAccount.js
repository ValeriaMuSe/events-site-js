// import { accountcategories } from './categories.js';

// function createNavigationTabs() {
//   var defaultButton = null;
//   var currentMonth = null;
//   var currentYear = null;

//   var container = document.querySelector('.container');
//   container.innerHTML += `
//     <div class="container-account">
//       <a class="my-account__link" href="../../index.html"><img class="arrow-left__icon" src="./images/arrow-left-icon.svg"></a>
//       <a class="my-account__link link-variant" href="../../index.html">Back to events</a>
//     </div>
//   `;

//   var gridContainer = document.getElementById('grid-container');

//   var tabContentContainer = document.createElement('div');
//   tabContentContainer.className = 'tab-content-container';

//   var tabsContainer = document.createElement('div');
//   tabsContainer.className = 'tabs';

//   Object.values(accountcategories).forEach(function (category) {
//     var button = document.createElement('button');
//     button.innerHTML = category;
//     button.addEventListener('click', function () {
//       if (defaultButton !== null) {
//         defaultButton.classList.remove('default-tab-button');
//       }
//       showTab(category.toLowerCase());
//       button.classList.add('default-tab-button');
//       defaultButton = button;
//     });

//     button.className = 'tab tab-button';

//     if (category === 'Calendar') {
//       button.classList.add('calendar', 'boton');
//     }

//     tabsContainer.appendChild(button);

//     if (category === 'Favorites') {
//       button.classList.add('default-tab-button');
//       defaultButton = button;

//       var favoritesContent = document.createElement('div');
//       favoritesContent.id = 'favorites';
//       favoritesContent.className = 'tab-content favorites-content';
//       favoritesContent.textContent = 'Favorite Events';
//       tabContentContainer.appendChild(favoritesContent);
//     } else if (category === 'Calendar') {
//       button.addEventListener('click', function () {
//         showCalendarTab();
//       });

//       var calendarContent = document.createElement('div');
//       calendarContent.id = 'calendar';
//       calendarContent.className = 'tab-content calendar-content';
//       calendarContent.style.display = 'none';

//       var calendarTitle = document.createElement('h2');
//       calendarTitle.id = 'calendar-title';
//       calendarContent.appendChild(calendarTitle);

//       var btnsContainer = document.createElement('div');
//       btnsContainer.className = 'calendar btns-container';

//       var prevMonthButton = document.createElement('button');
//       prevMonthButton.innerHTML = 'Previous Month';
//       prevMonthButton.className = 'calendar-button';
//       prevMonthButton.addEventListener('click', function () {
//         showPreviousMonth();
//       });
//       btnsContainer.appendChild(prevMonthButton);

//       var nextMonthButton = document.createElement('button');
//       nextMonthButton.innerHTML = 'Next Month';
//       nextMonthButton.className = 'calendar-button';
//       nextMonthButton.addEventListener('click', function () {
//         showNextMonth();
//       });
//       btnsContainer.appendChild(nextMonthButton);

//       calendarContent.appendChild(btnsContainer);

//       var calendar = document.createElement('div');
//       calendar.id = 'calendar-body';
//       calendar.className = 'calendar-body';
//       calendarContent.appendChild(calendar);

//       tabContentContainer.appendChild(calendarContent);
//     }
//   });

//   container.appendChild(tabsContainer);
//   gridContainer.parentNode.insertBefore(tabContentContainer, gridContainer.nextSibling);

//   function showTab(tabName) {
//     var tabContents = document.getElementsByClassName('tab-content');
//     for (var i = 0; i < tabContents.length; i++) {
//       tabContents[i].style.display = 'none';
//     }

//     var selectedTab = document.getElementById(tabName);
//     selectedTab.style.display = 'block';
//   }

//   function showCalendarTab() {
//     var tabContents = document.getElementsByClassName('tab-content');
//     for (var i = 0; i < tabContents.length; i++) {
//       tabContents[i].style.display = 'none';
//     }

//     var calendarTab = document.getElementById('calendar');
//     calendarTab.style.display = 'block';

//     renderCalendar();
//   }

//   function renderCalendar() {
//     var currentDate = new Date();
//     currentMonth = currentDate.getMonth();
//     currentYear = currentDate.getFullYear();

//     var calendarTitle = document.getElementById('calendar-title');
//     calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

//     // Render the calendar for the current month
//     var calendarBody = document.getElementById('calendar-body');
//     calendarBody.innerHTML = '';

//     var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     for (var i = 0; i < daysOfWeek.length; i++) {
//       var dayOfWeekCell = document.createElement('div');
//       dayOfWeekCell.className = 'day-of-week';
//       dayOfWeekCell.textContent = daysOfWeek[i];
//       calendarBody.appendChild(dayOfWeekCell);
//     }

//     var firstDay = new Date(currentYear, currentMonth, 1);
//     var startingDay = firstDay.getDay();
//     var numDays = getNumDaysInMonth(currentMonth, currentYear);

//     for (var i = 0; i < startingDay; i++) {
//       var emptyCell = document.createElement('div');
//       emptyCell.className = 'calendar-cell empty-cell';
//       calendarBody.appendChild(emptyCell);
//     }

//     for (var i = 1; i <= numDays; i++) {
//       var cell = document.createElement('div');
//       cell.className = 'calendar-cell';
//       cell.textContent = i;
//       calendarBody.appendChild(cell);
//     }
//   }

//   function getNumDaysInMonth(month, year) {
//     // Los meses en JavaScript se representan del 0 al 11, por lo que se suma 1 al mes
//     return new Date(year, month + 1, 0).getDate();
//   }


//   function showPreviousMonth() {
//     var newDate = new Date(currentYear, currentMonth - 1);
//     currentMonth = newDate.getMonth();
//     currentYear = newDate.getFullYear();

//     var calendarTitle = document.getElementById('calendar-title');
//     calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

//     // Render the calendar for the new month
//     // Implement this part based on your specific calendar requirements
//   }

//   function showNextMonth() {
//     var newDate = new Date(currentYear, currentMonth + 1);
//     currentMonth = newDate.getMonth();
//     currentYear = newDate.getFullYear();

//     var calendarTitle = document.getElementById('calendar-title');
//     calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

//     // Render the calendar for the new month
//     // Implement this part based on your specific calendar requirements
//   }

//   function getMonthName(month) {
//     var monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
//     return monthNames[month];
//   }

//   showTab('favorites');
// }

// export { createNavigationTabs };

import { accountcategories } from './categories.js';

function createNavigationTabs() {
  var defaultButton = null;
  var currentMonth = null;
  var currentYear = null;

  var container = document.querySelector('.container');
  container.innerHTML += `
    <div class="container-account">
      <a class="my-account__link" href="../../index.html"><img class="arrow-left__icon" src="./images/arrow-left-icon.svg"></a>
      <a class="my-account__link link-variant" href="../../index.html">Back to events</a>
    </div>
  `;

  var gridContainer = document.getElementById('grid-container');

  var tabContentContainer = document.createElement('div');
  tabContentContainer.className = 'tab-content-container';

  var tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs';

  Object.values(accountcategories).forEach(function (category) {
    var button = document.createElement('button');
    button.innerHTML = category;
    button.addEventListener('click', function () {
      if (defaultButton !== null) {
        defaultButton.classList.remove('default-tab-button');
      }
      showTab(category.toLowerCase());
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

      var favoritesContent = document.createElement('div');
      favoritesContent.id = 'favorites';
      favoritesContent.className = 'tab-content favorites-content';
      favoritesContent.textContent = 'Favorite Events';
      tabContentContainer.appendChild(favoritesContent);
    } else if (category === 'Calendar') {
      button.addEventListener('click', function () {
        showCalendarTab();
      });

      var calendarContent = document.createElement('div');
      calendarContent.id = 'calendar';
      calendarContent.className = 'tab-content calendar-content';
      calendarContent.style.display = 'none';

      var calendarTitle = document.createElement('h2');
      calendarTitle.id = 'calendar-title';
      calendarContent.appendChild(calendarTitle);

      var btnsContainer = document.createElement('div');
      btnsContainer.className = 'calendar btns-container';

      var prevMonthButton = document.createElement('button');
      prevMonthButton.innerHTML = 'Previous Month';
      prevMonthButton.className = 'calendar-button';
      prevMonthButton.addEventListener('click', function () {
        showPreviousMonth();
      });
      btnsContainer.appendChild(prevMonthButton);

      var nextMonthButton = document.createElement('button');
      nextMonthButton.innerHTML = 'Next Month';
      nextMonthButton.className = 'calendar-button';
      nextMonthButton.addEventListener('click', function () {
        showNextMonth();
      });
      btnsContainer.appendChild(nextMonthButton);

      calendarContent.appendChild(btnsContainer);

      var calendar = document.createElement('div');
      calendar.id = 'calendar-body';
      calendar.className = 'calendar-body';
      calendarContent.appendChild(calendar);

      tabContentContainer.appendChild(calendarContent);
    }
  });

  container.appendChild(tabsContainer);
  gridContainer.parentNode.insertBefore(tabContentContainer, gridContainer.nextSibling);

  function showTab(tabName) {
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }

    var selectedTab = document.getElementById(tabName);
    selectedTab.style.display = 'block';
  }

  function showCalendarTab() {
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = 'none';
    }

    var calendarTab = document.getElementById('calendar');
    calendarTab.style.display = 'block';

    renderCalendar();
  }

  function renderCalendar() {
    var currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();

    var calendarTitle = document.getElementById('calendar-title');
    calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

    generateCalendar(currentYear, currentMonth);
  }

  function showPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    var calendarTitle = document.getElementById('calendar-title');
    calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

    generateCalendar(currentYear, currentMonth);
  }

  function showNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    var calendarTitle = document.getElementById('calendar-title');
    calendarTitle.innerHTML = getMonthName(currentMonth) + ' ' + currentYear;

    generateCalendar(currentYear, currentMonth);
  }

  function getMonthName(month) {
    var monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  }

  function generateCalendar(year, month) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var currentDate = new Date(year, month);
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    var firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    var calendarTitle = document.getElementById('calendar-title');

    // Limpiar el contenido del calendario antes de generar los días
    var calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    for (var i = 0; i < dayNames.length; i++) {
      var dayNameCell = document.createElement('div');
      dayNameCell.classList.add('day-name-cell');
      dayNameCell.innerHTML = dayNames[i];
      calendarBody.appendChild(dayNameCell);
    }

    // Generar las celdas de los días
    for (var i = 0; i < firstDayIndex; i++) {
      var emptyCell = document.createElement('div');
      emptyCell.classList.add('empty-cell');
      emptyCell.style.backgroundColor = 'transparent';
      calendarBody.appendChild(emptyCell);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var dayCell = document.createElement('div');
      dayCell.classList.add('day-cell');
      dayCell.style.backgroundColor = 'white';
      dayCell.style.textAlign = 'center';
      dayCell.style.padding = '5px';
      dayCell.innerHTML = day;
      calendarBody.appendChild(dayCell);
    }
  }

  showTab('favorites');
}

export {createNavigationTabs };

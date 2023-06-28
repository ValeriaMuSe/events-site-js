function createNavigationTabs() {
    var eventscategories = ['Favorites', 'Interested', 'Going'];
    var defaultButton = null;
  
    // var container = document.querySelector('.container');
    
  var container = document.querySelector('.container');
 container.innerHTML += `
    <div class="container-account">
      <a class="my-account__link" href="../../index.html"><img class="arrow-left__icon" src="./images/arrow-left-icon.svg"></a>
      <a class="my-account__link link-variant" href="../../index.html">Back to events</a>
    </div>
  `
    
    var tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs';
  
    eventscategories.forEach(function (category) {
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
      tabsContainer.appendChild(button);
  
      if (category === 'Favorites') {
        button.classList.add('default-tab-button');
        defaultButton = button;
      }
    });
  
    container.appendChild(tabsContainer);
  
    var favoritesContent = document.createElement('div');
    favoritesContent.id = 'favorites';
    favoritesContent.className = 'tab-content';
    favoritesContent.style.display = 'none';
    favoritesContent.textContent = 'Favorite Events';
  
    var interestedContent = document.createElement('div');
    interestedContent.id = 'interested';
    interestedContent.className = 'tab-content';
    interestedContent.style.display = 'none';
    interestedContent.textContent = 'Interested Events';
  
    var goingContent = document.createElement('div');
    goingContent.id = 'going';
    goingContent.className = 'tab-content';
    goingContent.style.display = 'none';
    goingContent.textContent = 'Going Events';
  
    container.appendChild(favoritesContent);
    container.appendChild(interestedContent);
    container.appendChild(goingContent);
  
    function showTab(tabName) {
      var tabContents = document.getElementsByClassName('tab-content');
      for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
      }
  
      var selectedTab = document.getElementById(tabName);
      selectedTab.style.display = 'block';
    }
  
    showTab('favorites');
  }
  
  export { createNavigationTabs };
// let state = {
//  favorite: [],
//   interested: [],
//   going: [],

// };


// const appState = {
//   getState() {
//     return { ...state };
//   },
//   setState(newState) {
//     state = { ...state, ...newState };
//   }
// };
// Object.freeze(appState);

// export default appState;



// let state = {
//   favorite: [],
//   interested: [],
//   going: [],
// };

// const appState = {
//   getState() {
//     return { ...state };
//   },
//   setState(newState) {
//     state = { ...state, ...newState };
//     // Guardar el nuevo estado en el almacenamiento local
//     localStorage.setItem('appState', JSON.stringify(state));
//     // Notificar a otras pestañas sobre el cambio en el almacenamiento local
//     localStorage.setItem('appStateUpdated', Date.now().toString());
//   },
//   init() {
//     // Recuperar el estado del almacenamiento local al iniciar la aplicación
//     const storedState = localStorage.getItem('appState');
//     if (storedState) {
//       state = JSON.parse(storedState);
//     }

//     // Escuchar los cambios en el almacenamiento local realizados por otras pestañas
//     window.addEventListener('storage', (event) => {
//       if (event.key === 'appStateUpdated') {
//         // Actualizar el estado cuando se detecte un cambio en el almacenamiento local
//         const updatedState = localStorage.getItem('appState');
//         if (updatedState) {
//           state = JSON.parse(updatedState);
//         }
//       }
//     });
//   },
// };

// Object.freeze(appState);

// export default appState;

let state = {
  favorites: [],
  interested: [],
  going: [],
};

const prueba =  {

  getdata ( value) {
    return [ ...state[value] ];
  },
  addEvent( value, event) {
    state[value].push(event);
      if (value === 'interested') {
        
      }
  }



}


const stateSingleton = (() => {
  
  return {
   
    addToFavorites(event) {
      state.favorites.push(event);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addToInterested(event) {
      state.interested.push(event);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addToGoing(event) {
      state.going.push(event);
      localStorage.setItem('state', JSON.stringify(state));
    },
    removeFromFavorites(eventId) {
      state.favorites = state.favorites.filter(event => event.id !== eventId);
      localStorage.setItem('state', JSON.stringify(state));
    },
    removeFromInterested(eventId) {
      state.interested = state.interested.filter(event => event.id !== eventId);
      localStorage.setItem('state', JSON.stringify(state));
    },
    removeFromGoing(eventId) {
      state.going = state.going.filter(event => event.id !== eventId);
      localStorage.setItem('state', JSON.stringify(state));
    },
    getEventsByCategory(category) {
      switch (category) {
        case accountcategories.Favorites:
          return [...state.favorites];
        case accountcategories.Interested:
          return [...state.interested];
        case accountcategories.Going:
          return [...state.going];
        default:
          return [];
      }
    },
  };
})();

const storedState = localStorage.getItem('state');
if (storedState) {
  state.state = JSON.parse(storedState);
}

export default state;



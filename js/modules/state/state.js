const state = {
  favorites: [],
  interested: [],
  going: [],
};

const singletonState = {
  getState() {
    return { ...state };
  },
  addEvent(value, event) {
    state[value].push(event);
    if (value === 'interested') {
      state.going = state.going.filter((element) => element && element.id !== event.id);
    } else {
      state.interested = state.interested.filter((element) => element && element.id !== event.id);
    }
  },
};

export { singletonState };
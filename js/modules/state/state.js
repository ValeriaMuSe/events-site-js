let state = {};


const appState = {
  getState() {
    return { ...state };
  },
  setState(newState) {
    state = { ...state, ...newState };
  }
};
Object.freeze(appState);

export default appState;
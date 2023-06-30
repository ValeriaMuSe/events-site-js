let state = {
  heartImage: '../images/heart.svg'
};
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
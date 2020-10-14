import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

const store = (reducers) => {
  return createStore(reducers);
}

export default store;
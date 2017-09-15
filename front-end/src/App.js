import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import MainApp from './components/App';
import reducer from './components/reducer';
import { getBuses } from './actions';

const middleware = [thunk, routerMiddleware(createHistory())];
const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

store.dispatch(getBuses);

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;

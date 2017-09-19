import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { persistStore, autoRehydrate } from 'redux-persist';


import Tabs from './components/TabsContainer';
import reducer from './components/reducer';
import { getBuses, getBusStops } from './actions';

const middleware = [thunk, routerMiddleware(createHistory())];
const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    autoRehydrate(),
  ),
);

persistStore(store);

store.dispatch(getBuses);
store.dispatch(getBusStops);

function App() {
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  );
}

export default App;

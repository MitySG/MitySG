import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';

import Tabs from './components/tabs/TabsContainer';
import reducer from './reducers';
import { getBuses, getBusStops, getTrainStations } from './actions';

const middleware = [thunk, routerMiddleware(createHistory()), logger];
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
store.dispatch(getTrainStations);

function App() {
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  );
}

export default App;

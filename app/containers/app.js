import React, { PureComponent } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';

import Dashboard from './dashboard'; // eslint-disable-line

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends PureComponent { // eslint-disable-line
  render() {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  }
}

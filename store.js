import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import { picksReducer } from './reducers/picksReducer';

const initialState = {
  inError: false,
  inFlight: false,
  error: null,
  data: null,
  pickContent: null
}

export const store = createStore(picksReducer, initialState, applyMiddleware(thunk, logger()));

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';

const initialState = {
  inError: false,
  inFlight: false,
  error: null,
  data: null,
  pickContent: null
}

const picksReducer = (initialState, action) => {
  switch(action.type) {
    case 'START_FETCH': {
      return {
        ...initialState,
        inFlight: true
      }
    }

    case 'FETCH_SUCCESS': {
      return {
        ...initialState,
        inFlight: false,
        data: action.payload
      }
    }

    case 'FETCH_PICK_CONTENT_START': {
      return {
        ...initialState,
        pickContent: null,
        inFlight: true
      }
    }

    case 'FETCH_PICK_CONTENT': {
      return {
        ...initialState,
        pickContent: action.payload,
        inFlight: false
      }
    }

    case 'FETCH_ERROR': {
      return {
        ...initialState,
        inFlight: false,
        error: action.payload
      }
    }
  }

  return initialState;
}

const store = createStore(picksReducer, initialState, applyMiddleware(thunk, logger()));


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={'/'} component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)

store.dispatch((dispatch) => {
  dispatch({type: 'START_FETCH'});
  axios.get('https://api.github.com/repos/code-mancers/picks/contents')
  .then((response) => {
    dispatch({type: 'FETCH_SUCCESS', payload: response.data})
  })
  .catch((error) => {
    console.log(error);
  })
});

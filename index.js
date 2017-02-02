import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import * as actionCreators from './actionCreators/actionCreators';
import {store} from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={'/'} component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)

store.dispatch((dispatch) => {
  dispatch(actionCreators.startFetchingPicks());

  axios.get('https://api.github.com/repos/code-mancers/picks/contents')
  .then((response) => {
    dispatch(actionCreators.fetchingPicksDone(response))
  })
  .catch((error) => {
    dispatch(actionCreators.fetchingError(error));
  })
});

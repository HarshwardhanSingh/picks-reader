import React from 'react';
import {connect} from 'react-redux';
import Pick from './Pick';
import axios from 'axios';
import {markdown} from "markdown";
import * as actionCreators from '../actionCreators/actionCreators';

class App extends React.Component {

  constructor() {
    super();
    this.fetchPick = this.fetchPick.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actionCreators.startFetchingPicks());

    axios.get('https://api.github.com/repos/code-mancers/picks/contents')
    .then((response) => {
      this.props.dispatch(actionCreators.fetchingPicksDone(response))
    })
    .catch((error) => {
      this.props.dispatch(actionCreators.fetchingError(error));
    })
  }

  fetchPick(download_url) {
    this.props.dispatch(actionCreators.startFetchingPickContent())

    axios.get(download_url)
    .then(response => {
      this.props.dispatch(actionCreators.fetchingPickContentDone(response))
    })
    .catch(error => {
      this.props.dispatch(actionCreators.fetchingError(error))
    })
  }

  createMarkup(data) {
    return {__html: data};
  }

  renderContent(data) {
    return <div className="pick-content" dangerouslySetInnerHTML={this.createMarkup(data)} />;
  }

  renderWelcome() {
    if(this.props.inFlight) {
      return (
        <div className="loader">
          <div className='container_top'>
          </div>
          <div className='container_bottom'>
          </div>
        </div>
      )
    } else {
      return (
        null
      )
    }
  }

  render() {
    const picks = this.props.picks;

    if(this.props.picks.length > 0) {

      let rows = [];

      picks.map((pick, index) => {
        rows.push(
          <Pick
            name={pick.name}
            key={index}
            html_url={pick.html_url}
            download_url={pick.download_url}
            fetchPick={this.fetchPick}
          />);
      })

      return (
        <div className="row">
          <div className="col-md-3 picks-list">
            <h3>Picks</h3>
            {rows}
          </div>
          <div className="col-md-9 pick-content">
            {
              this.props.pickContent && !this.props.inFlight ?
              this.renderContent(markdown.toHTML(this.props.pickContent.data)) : this.renderWelcome()
            }
          </div>
        </div>
      )

    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    picks: state.data || [],
    pickContent: state.pickContent,
    inFlight: state.inFlight,
    error: state.error
  }
}

export default connect(mapStateToProps)(App);

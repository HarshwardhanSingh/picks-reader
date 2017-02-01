import React from 'react';
import {connect} from 'react-redux';
import Pick from './Pick';
import axios from 'axios';
import {markdown} from "markdown";

class App extends React.Component {

  constructor() {
    super();
    this.fetchPick = this.fetchPick.bind(this);
  }

  fetchPick(download_url) {
    this.props.dispatch({type: 'FETCH_PICK_CONTENT_START'})

    axios.get(download_url)
    .then(response => {
      this.props.dispatch({type: 'FETCH_PICK_CONTENT', payload: response})
    })
    .catch(error => {
      console.log(error);
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
            <img src="http://codemancers.com/assets/images/logo-c723c9f32c0a9aff88536017a6c4ed0d87c95e78484b25fc94d3cdfa8ab7b047.svg"/>
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

import React from 'react';
import {connect} from 'react-redux';

class Pick extends React.Component {
  constructor() {
    super();
    this.fetchPickContent = this.fetchPickContent.bind(this);
  }

  fetchPickContent() {
    this.props.fetchPick(this.props.download_url)
  }

  render() {
    return (
      <div className="pick">
        <h4>{this.props.name}</h4>
        <a href="#" onClick={this.fetchPickContent} className="btn btn-xs btn-info"><i className="fa fa-book" aria-hidden="true"></i>&nbsp;&nbsp;Read Here</a>
        <a href={this.props.html_url} target="_blank"className="btn btn-xs btn-warning"><i className="fa fa-github" aria-hidden="true"></i>&nbsp;&nbsp;Go to GitHub</a>
      </div>
    )
  }
}

export default connect()(Pick);

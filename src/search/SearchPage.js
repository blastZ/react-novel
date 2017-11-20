import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchBook } from '../actions/app_action';

class SearchPage extends Component {
  componentWillMount() {
    this.props.dispatch(searchBook(this.props.match.params.searchName));
  }

  render() {
    return (
      <div>
        {this.props.resultList.map((book) => (
          <div style={{display: 'flex', padding: '15px 0px'}}>
            <div style={{width: '40%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
              <img src={book.url} style={{maxWidth: '100%', maxWidth: '120px'}}/>
            </div>
            <div style={{width: '60%', display: 'flex', flexDirection: 'column', padding: '0px 5px'}}>
              <h3>{book.name}</h3>
              <p style={{fontSize: '14px', margin: '7px 0px'}}>{book.description}</p>
              <div>
                <h5>{book.author}</h5>
                <h5>{book.updateTime}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  resultList: appReducer.resultList
})

export default withRouter(connect(mapStateToProps)(SearchPage));

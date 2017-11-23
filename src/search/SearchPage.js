import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { searchBook } from '../actions/app_action';
import TextField from 'material-ui/TextField';

class SearchPage extends Component {
  state = {
    searchName: ''
  }

  componentWillMount() {
    this.setState({
      searchName: this.props.match.params.searchName
    })
    this.props.dispatch(searchBook(this.props.match.params.searchName));
  }

  handleSearchName = (e) => {
    this.setState({
      searchName: e.target.value.trim()
    }, () => {
      if(this.state.searchName !== '') {
        this.props.history.replace(`/search/${this.state.searchName}`)
        this.props.dispatch(searchBook(this.state.searchName));
      }
    })
  }

  toBookPage = (bookId) => {
    this.props.history.push(`/${bookId}`);
  }

  render() {
    return (
      <div style={{width: '800px', margin: '0 auto', maxWidth: '100%', marginTop: '64px', paddingTop: '16px'}}>
        <div style={{display: 'flex', justifyContent: 'center', margin: '15px 0px'}}>
          <TextField
            value={this.state.searchName}
            onChange={this.handleSearchName}
            style={{
              width: '90%'
            }} />
        </div>
        {this.props.resultList.map((book) => (
          <div key={book.href} style={{display: 'flex', padding: '15px 20px'}}>
            <div style={{width: '135px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: '15px', flexShrink: '0'}}>
              <img alt={`${book.name}封面图片`} onClick={() => this.toBookPage(book.href)} src={book.url} style={{maxWidth: '100%', width: '120px'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', padding: '0px 5px', justifyContent: 'space-between'}}>
              <h3><span onClick={() => this.toBookPage(book.href)}>{book.name}</span></h3>
              <p style={{fontSize: '14px', margin: '7px 0px'}}>{book.description}</p>
              <div style={{fontSize: '10px'}}>
                <div><b>作者:</b>&nbsp;{book.author}</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{fontSize: '10px', color: 'gray', textAlign: 'center', padding: '10px', marginTop: '50px'}}>©Forever, <em>developed by handsome boy blastz</em></div>
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  resultList: appReducer.resultList
})

export default withRouter(connect(mapStateToProps)(SearchPage));

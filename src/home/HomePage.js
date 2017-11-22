import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
  state = {
    searchName: '',
    bgName: 'bg-1',
  }

  handleSearchName = (e) => {
    this.setState({
      searchName: e.target.value.trim()
    })
  }

  searchBook = () => {
    if(this.state.searchName === '') {
      window.alert('小说名不能为空');
    } else {
      this.props.history.push(`/search/${this.state.searchName}`);
    }
  }

  render() {
    return (
      <div className={`${this.state.bgName}`} style={{display: 'flex', flexDirection: 'column', width: '800px', maxWidth: '100%', height: '100%', margin: '0 auto', justifyContent: 'center'}}>
        <TextField
          value={this.state.searchName}
          onChange={this.handleSearchName}
          style={{
            margin: '0 auto',
            width: '70%',
          }} />
          <button className="custom-button" onClick={this.searchBook}>搜索</button>
      </div>
    )
  }
}

export default withRouter(connect()(HomePage));

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
  state = {
    searchName: ''
  }

  handleSearchName = (e) => {
    this.setState({
      searchName: e.target.value.trim()
    })
  }

  searchBook = () => {
    this.props.history.push(`/search/${this.state.searchName}`);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: '800px', maxWidth: '100%', height: '100%', margin: '0 auto', justifyContent: 'center'}}>
        <TextField
          floatingLabelText="请输入小说名(宁可少字不要错字)"
          value={this.state.searchName}
          onChange={this.handleSearchName}
          floatingLabelStyle={{
            fontSize: '15px'
          }}
          inputStyle={{
            fontSize: '15px'
          }}
          hintStyle={{
            paddingLeft: '10px',
            fontSize: '15px'
          }}
          style={{
            margin: '0 auto',
            width: '70%'
          }} />
          <button style={{
            width: '80px',
            height: '35px',
            padding: '5px',
            borderRadius: '25px',
            border: '2px solid black',
            background: 'black',
            color: 'white',
            fontWeight: 'bold',
            margin: '0 auto'
          }} onClick={this.searchBook}>搜索</button>
      </div>
    )
  }
}

export default withRouter(connect()(HomePage));

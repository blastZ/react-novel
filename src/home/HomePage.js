import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import SearchIcon from 'react-icons/lib/md/search';

const styles = {
  input: {
    color: '#FAFAFA',
    letterSpacing: '1px'
  },
  inkbar: {
    '&:hover:not(.MuiInput-disabled-92):before': {
      backgroundColor: '#F5F5F5'
    },
    '&::before': {
      backgroundColor: '#F5F5F5'
    },
    '&::after': {
      backgroundColor: '#FAFAFA'
    }
  },
  searchButton: {
    width: '87px',
    height: '35px',
    background: 'rgba(0,0,0,0.7)',
    color: '#FAFAFA',
    letterSpacing: '1px',
    marginTop: '20px',
    '&:hover': {
      color: 'black',
      background: 'rgba(255,255,255,0.7)'
    }
  }
}

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
    const { classes } = this.props;
    return (
      <div className={`${this.state.bgName}`} style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <TextField
          label="请输入小说名(宁可少字不要错字)"
          value={this.state.searchName}
          onChange={this.handleSearchName}
          InputLabelProps={{
            classes: {
              root: this.props.classes.input
            }
          }}
          InputProps={{
            classes: {
              root: classes.inkbar,
              input: classes.input,
            }
          }}
          style={{
            margin: '0 auto',
            width: '70%'
          }} />
          <Button className={classes.searchButton} raised onClick={this.searchBook}>
            搜索
          </Button>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(connect()(HomePage)));

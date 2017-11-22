import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'react-icons/lib/md/menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SearchIcon from 'react-icons/lib/md/search';
import BookIcon from 'react-icons/lib/md/book';

const styles = {
  input: {
    color: '#FAFAFA',
    letterSpacing: '1px'
  },
  inkbar: {
    '&::before': {
      backgroundColor: '#F5F5F5'
    },
    '&::after': {
      backgroundColor: '#FAFAFA'
    }
  },
  icon: {
    color: '#FAFAFA'
  },
  background: {
    background: 'rgba(250,250,250,0.8)',
    outlineColor: '#FAFAFA'
  }
}

class HomePage extends Component {
  state = {
    searchName: '',
    bgName: 'bg-1',
    showDrawer: false
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

  toggleDrawer = (showDrawer) => () => {
    this.setState({
      showDrawer
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={`${this.state.bgName}`} style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center'}}>
        <AppBar position="fixed" style={{background: 'rgba(0,0,0,0.5)'}}>
          <Toolbar>
            <IconButton
              classes={{
                root: this.props.classes.icon
              }}
              onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.showDrawer} onRequestClose={this.toggleDrawer(false)}
          SlideProps={{
            classes: {
              root: classes.background
            }
          }}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="搜索书籍" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="我的书架" />
              </ListItem>
            </List>
          </div>
        </Drawer>
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
              root: this.props.classes.inkbar,
              input: this.props.classes.input
            }
          }}
          style={{
            margin: '0 auto',
            width: '70%'
          }} />
          <button className="custom-button" onClick={this.searchBook}>搜索</button>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(connect()(HomePage)));

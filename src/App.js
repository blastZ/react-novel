import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import BookPage from './book/BookPage';
import ChapterPage from './book/ChapterPage';
import { connect } from 'react-redux';
import SearchPage from './search/SearchPage';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SearchIcon from 'react-icons/lib/md/search';
import BookIcon from 'react-icons/lib/md/book';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import Bookshelf from './bookshelf/Bookshelf';
import TopBar from './components/TopBar';
import { getBookshelf } from './actions/app_action';

const styles = {
  background: {
    background: 'rgba(250,250,250,0.8)',
    outlineColor: '#FAFAFA'
  }
}

class App extends Component {
  state = {
    showDrawer: false
  }

  componentWillMount() {
    this.props.dispatch(getBookshelf());
  }

  toggleDrawer = (showDrawer) => () => {
    this.setState({
      showDrawer
    })
  }

  toSearch = () => {
    this.props.history.replace('/');
  }

  toBookshelf = () => {
    this.props.history.replace('/bookshelf');
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Drawer open={this.state.showDrawer} onRequestClose={this.toggleDrawer(false)}
          SlideProps={{
            classes: {
              root: classes.background
            }
          }}>
          <div className="version-state">{`Version 0.9.5`}</div>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={this.toSearch}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="搜索书籍" />
              </ListItem>
              <ListItem button onClick={this.toBookshelf}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="我的书架" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <Switch>
          <Route exact path="/" render={() => (
            <div className="container">
              <TopBar toggleDrawer={this.toggleDrawer} />
              <HomePage />
            </div>
          )} />
          <Route exact path="/bookshelf" render={() => (
            <div className="container">
              <TopBar toggleDrawer={this.toggleDrawer} />
              <Bookshelf />
            </div>
          )} />
          <Route exact path="/search/:searchName" render={() => (
            <div className="container">
              <TopBar toggleDrawer={this.toggleDrawer} />
              <SearchPage />
            </div>
          )} />
          <Route exact path="/:bookId" render={() => (
            <BookPage />
          )} />
          <Route exact path="/:bookId/:chapterId" render={() => (
            <ChapterPage />
          )} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(connect()(App)));

import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import BookPage from './book/BookPage';
import ChapterPage from './book/ChapterPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import SearchPage from './search/SearchPage';

class App extends Component {
  componentWillMount() {
      // fetch(`${defaultURL}`)
      //   .then((response) => response.json())
      //   .then((result) => {
      //     this.setState({
      //       topNovel: result.topNovel,
      //       novelList: result.novelList
      //     })
      //   })
      // -------- get novel lsit --------
  }

  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route exact path="/" render={() => (
            <HomePage />
          )} />
          <Route exact path="/search/:searchName" render={() => (
            <SearchPage />
          )} />
          <Route exact path="/:bookId" render={() => (
            <BookPage />
          )} />
          <Route exact path="/:bookId/:chapterId" render={() => (
            <ChapterPage />
          )} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(connect()(App));

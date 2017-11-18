import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import BookPage from './book/BookPage';
import ChapterPage from './book/ChapterPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

const defaultURL = 'http://localhost:5001';
// const defaultURL = 'http://101.132.151.144:5001';

class App extends Component {
  state = {
    topNovel: {},
    novelList: []
  }
  componentWillMount() {
      fetch(`${defaultURL}`)
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            topNovel: result.topNovel,
            novelList: result.novelList
          })
        })
  }

  getChapter = (href) => {
    fetch(`${defaultURL}/${href}`)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        this.setState({
          chapter: result,
          showChapter: true
        })
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route exact path="/" render={() => (
            <HomePage
              novelList={this.state.novelList}/>
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

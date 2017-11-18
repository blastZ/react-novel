import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChapterList, initState, setChapterIndex } from '../actions/app_action';

class BookPage extends Component {
  state = {
  }

  componentWillMount() {
    this.props.dispatch(initState());
    this.props.dispatch(getChapterList(this.props.match.params.bookId));
  }

  toChapter = (chapter, index) => {
    this.props.dispatch(setChapterIndex(index));
    this.props.history.push(`/${this.props.match.params.bookId}/${chapter.href}`);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {this.props.chapterList.map((chapter, index) => (
          <a key={chapter.name + chapter.href} onClick={() => this.toChapter(chapter, index)}>{chapter.name}</a>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  chapterList: appReducer.chapterList
})

export default withRouter(connect(mapStateToProps)(BookPage));

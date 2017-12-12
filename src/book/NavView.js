import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import ListIcon from 'material-ui-icons/FormatListBulleted';
import RefreshIcon from 'material-ui-icons/Refresh'
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChapterForce, initState } from '../actions/app_action';

const styles = {
  drawerPaper: {
    outline: 'none',
    width: '50%',
    maxWidth: '300px',
    background: '#f3f2d1',
    overflowY: 'hidden'
  },
  topList: {
    '& li': {
      paddingTop: 6,
      paddingBottom: 6
    }
  }
}

class NavView extends Component {
  state = {
  }

  getChapter = (chapter, index) => {
    this.props.getChapter(chapter, index);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open) {
      const scrollInterval = setInterval(() => {
        const nav = document.getElementById('chapter-list-nav');
        if(nav) {
          nav.scrollTo(0, 420);
          clearInterval(scrollInterval);
        }
      })
    }
  }

  toBookPage = () => {
    this.props.history.push(`/${this.props.bookId}`);
    this.props.dispatch(initState({
      chapter: [],
      chapterIndex: 0,
      chapterName: ''
    }))
  }

  render() {
    const { classes, open, closeView, chapterList, chapterIndex, bookId, chapterId } = this.props;
    return (
      <Drawer anchor="left" open={open} onRequestClose={closeView}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div>
          <List className={classes.topList}>
            <ListItem button onClick={() => this.props.history.push('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='主页' />
            </ListItem>
            <ListItem button onClick={this.toBookPage}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary='目录' />
            </ListItem>
            <ListItem button onClick={() => this.props.dispatch(getChapterForce(bookId, chapterId))}>
              <ListItemIcon>
                <RefreshIcon />
              </ListItemIcon>
              <ListItemText primary='更换章节源' />
            </ListItem>
          </List>
        </div>
        <Divider />
        <div id="chapter-list-nav" style={{overflowY: 'auto'}}>
          <List className={classes.list}>
          {chapterList.slice(chapterIndex - 10 > 0 ? chapterIndex - 10 : 0, chapterIndex + 11).map((chapter, index) => (
            <ListItem style={{background: `${
              chapterIndex - 10 > 0 && index === 10
                ? 'rgba(0,0,0,0.2)'
                : chapterIndex - 10 <= 0 && index === chapterIndex
                    ? 'rgba(0,0,0,0.2)'
                    : ''}`}} key={chapter.name} onClick={() => this.getChapter(chapter, (chapterIndex - 10 > 0 ? chapterIndex - 10 + index : index))} button>
              <ListItemText primary={chapter.name} />
            </ListItem>
          ))}
          </List>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(withRouter(connect()(NavView)));

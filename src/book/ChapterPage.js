import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { setChapterIndex, getChapter, initChapter, getChapterList } from '../actions/app_action';
import MenuIcon from 'material-ui-icons/Menu';
import SettingIcon from 'material-ui-icons/Settings';
import BackIcon from 'react-icons/lib/md/keyboard-arrow-left';
import HomeIcon from 'react-icons/lib/md/home';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import ReadSettingView from './ReadSettingView';
import NavView from './NavView';

const styles = theme => ({

});

class ChapterPage extends Component {
  state = {
    fontSize: '18px',
    letterSpacing: '0.2em',
    lineHeight: '180%',
    margin: '15px',
    showSettingView: false,
    showNavView: false,
    bkColor: 'white',
    fontColor: 'black',
  }

  shouldShowNavView = () => {
    this.setState({
      showNavView: !this.state.showNavView
    })
  }

  shouldShowSettingView = () => {
    this.setState({
      showSettingView: !this.state.showSettingView
    })
  }

  componentWillMount() {
    if(this.props.chapterList.length === 0) this.props.dispatch(getChapterList(this.props.match.params.bookId));
    this.props.dispatch(getChapter(this.props.match.params.bookId, this.props.match.params.chapterId));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.chapterList !== this.props.chapterList) {
      const { match } = this.props;
      const { chapterList } = nextProps;
      for(let i=0; i<chapterList.length; i++) {
        if(chapterList[i].href === match.params.chapterId) {
          this.props.dispatch(setChapterIndex(i));
          break;
        }
      }
    }
  }

  preChapter = () => {
    if(this.props.chapterIndex > 0) {
      this.props.history.push(`/${this.props.match.params.bookId}/${this.props.chapterList[this.props.chapterIndex - 1].href}`);
      this.props.dispatch(initChapter());
      this.props.dispatch(getChapter(this.props.match.params.bookId, this.props.chapterList[this.props.chapterIndex - 1].href));
      this.props.dispatch(setChapterIndex(this.props.chapterIndex - 1));
      window.scrollTo(0, 0);
    }
  }

  nextChapter = () => {
    this.props.history.push(`/${this.props.match.params.bookId}/${this.props.chapterList[this.props.chapterIndex + 1].href}`);
    this.props.dispatch(initChapter());
    this.props.dispatch(getChapter(this.props.match.params.bookId, this.props.chapterList[this.props.chapterIndex + 1].href));
    this.props.dispatch(setChapterIndex(this.props.chapterIndex + 1));
    window.scrollTo(0, 0);
  }

  changeBackground = (color) => {
    this.setState({
      bkColor: color.bkColor,
      fontColor: color.fontColor
    })
  }

  decreaseFontSize = () => {
    let value = parseInt(this.state.fontSize, 10);
    if(value > 12) {
      value = value - 1;
      this.setState({
        fontSize: `${value}px`
      })
    }
  }

  increaseFontSize = () => {
    let value = parseInt(this.state.fontSize, 10);
    if(value < 35) {
      value = value + 1;
      this.setState({
        fontSize: `${value}px`
      })
    }
  }

  decreaseLetterSpacing = () => {
    let value = parseFloat(this.state.letterSpacing, 10);
    if(value > 0) {
      value = value - 0.1;
      this.setState({
        letterSpacing: `${value.toFixed(1)}em`
      })
    }
  }

  increaseLetterSpacing = () => {
    let value = parseFloat(this.state.letterSpacing, 10);
    if(value < 1.2) {
      value = value + 0.1;
      this.setState({
        letterSpacing: `${value.toFixed(1)}em`
      })
    }
  }

  decreaseLineHeight = () => {
    let value = parseInt(this.state.lineHeight, 10);
    if(value > 100) {
      value = value - 10;
      this.setState({
        lineHeight: `${value}%`
      })
    }
  }

  increaseLineHeight = () => {
    let value = parseInt(this.state.lineHeight, 10);
    if(value < 400) {
      value = value + 10;
      this.setState({
        lineHeight: `${value}%`
      })
    }
  }

  getChapter = (chapter, index) => {
    this.props.history.push(`/${this.props.match.params.bookId}/${chapter.href}`);
    this.props.dispatch(initChapter());
    this.props.dispatch(getChapter(this.props.match.params.bookId, chapter.href));
    this.props.dispatch(setChapterIndex(index));
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavView
          chapterIndex={this.props.chapterIndex}
          chapterList={this.props.chapterList}
          getChapter={this.getChapter}
          open={this.state.showNavView}
          closeView={this.shouldShowNavView} />
        <ReadSettingView
          changeBackground={this.changeBackground}
          decreaseLineHeight={this.decreaseLineHeight}
          increaseLineHeight={this.increaseLineHeight}
          decreaseFontSize={this.decreaseFontSize}
          increaseFontSize={this.increaseFontSize}
          decreaseLetterSpacing={this.decreaseLetterSpacing}
          increaseLetterSpacing={this.increaseLetterSpacing}
          letterSpacing={this.state.letterSpacing}
          lineHeight={this.state.lineHeight}
          fontSize={this.state.fontSize}
          open={this.state.showSettingView}
          closeView={this.shouldShowSettingView} />
        <AppBar position="fixed" style={{background: 'rgba(0,0,0,0.6)'}}>
          <Toolbar style={{justifyContent: 'space-between'}}>
            <IconButton onClick={this.shouldShowNavView} className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <IconButton onClick={this.shouldShowSettingView} className={classes.settingButton} color="contrast" aria-label="Setting">
              <SettingIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{
          background: `${this.state.bkColor}`,
          color: `${this.state.fontColor}`,
          overflowY: 'auto',
          padding: '80px 0px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '900px',
            maxWidth: '100%',
            margin: '0 auto',
            fontSize: `${this.state.fontSize}`,
            letterSpacing: `${this.state.letterSpacing}`,
            lineHeight: `${this.state.lineHeight}`}}>
            <h2 style={{textAlign: 'center', marginBottom: '18px'}}>{this.props.chapterName}</h2>
            <div>
              {this.props.chapter.map((str, index) => (
                index !== 0 && str.trim() !== '' && <p key={str + index} style={{margin: `${this.state.margin} 0px`, padding: '0px 8px'}}>{str}</p>
              ))}
            </div>
            {this.props.chapter.length > 0 &&
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', padding: '20px'}}>
                <Button onClick={this.preChapter}>上一页</Button>
                <Button onClick={this.nextChapter}>下一页</Button>
              </div>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  chapterList: appReducer.chapterList,
  chapterIndex: appReducer.chapterIndex,
  chapter: appReducer.chapter,
  chapterName: appReducer.chapterName
})

export default withStyles(styles)(withRouter(connect(mapStateToProps)(ChapterPage)));

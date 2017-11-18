import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { setChapterIndex, getChapter, initChapter } from '../actions/app_action';
import MenuIcon from 'react-icons/lib/md/menu';
import SettingIcon from 'react-icons/lib/md/settings';
import DecreaseIcon from 'react-icons/lib/md/remove';
import IncreaseIcon from 'react-icons/lib/md/add';

class ChapterPage extends Component {
  state = {
    fontSize: '18px',
    letterSpacing: '0.2em',
    lineHeight: '180%',
    margin: '15px',
    showSettingView: true,
    colorList: [
      {bkColor: 'white', fontColor: 'black'},
      {bkColor: '#080C10', fontColor: '#84888E'},
      {bkColor: 'blue', fontColor: 'white'},
      {bkColor: 'green', fontColor: 'black'},
      {bkColor: 'red', fontColor: 'white'},
    ],
    bkColor: 'white',
    fontColor: 'black',
  }

  shouldShowSettingView = () => {
    this.setState({
      showSettingView: !this.state.showSettingView
    })
  }

  componentWillMount() {
    this.props.dispatch(getChapter(this.props.match.params.bookId, this.props.match.params.chapterId));
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

  decreaseMargin = () => {
    let value = parseInt(this.state.margin, 10);
    if(value > 0) {
      value = value - 1;
      this.setState({
        margin: `${value}px`
      })
    }
  }

  increaseMargin = () => {
    let value = parseInt(this.state.margin, 10);
    if(value < 40) {
      value = value + 1;
      this.setState({
        margin: `${value}px`
      })
    }
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        background: `${this.state.bkColor}`,
        color: `${this.state.fontColor}`,
        width: '900px',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '36px 0px',
        fontSize: `${this.state.fontSize}`,
        letterSpacing: `${this.state.letterSpacing}`,
        lineHeight: `${this.state.lineHeight}`}}>
        <div style={{position: 'fixed', top: '45px', left: '0px',
          zIndex: '300', width: '100%', height: '240px',
          background: 'rgba(0,0,0, 0.5)',
          display: `${this.state.showSettingView ? 'flex' : 'none'}`,
          flexDirection: 'column',
          justifyContent: 'space-around',
          color: 'white',
          padding: '10px 15px',
          fontSize: '16px', letterSpacing: '0.2em'}}
          className="animation-popup">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span>字体大小:</span>
            <DecreaseIcon onClick={this.decreaseFontSize} className="decrease-icon"/>
            <span>{`${this.state.fontSize}`}</span>
            <IncreaseIcon onClick={this.increaseFontSize} className="increase-icon" />
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span>字间距:</span>
            <DecreaseIcon onClick={this.decreaseLetterSpacing} className="decrease-icon"/>
            <span>{`${this.state.letterSpacing}`}</span>
            <IncreaseIcon onClick={this.increaseLetterSpacing} className="increase-icon" />
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span>行间距:</span>
            <DecreaseIcon onClick={this.decreaseMargin} className="decrease-icon"/>
            <span>{`${this.state.margin}`}</span>
            <IncreaseIcon onClick={this.increaseMargin} className="increase-icon" />
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span>背景颜色:</span>
            <div style={{display: 'flex', justifyContent: 'space-evenly', flexGrow: '1'}}>
              {this.state.colorList.map((color) => (
                <span key={color.bkColor} onClick={() => this.changeBackground(color)} className="background-circle" style={{background: `${color.bkColor}`}}></span>
              ))}
            </div>
          </div>
        </div>
        {this.props.chapter.map((str, index) => (
          index !== 0 && str.trim() !== '' && <p key={str + index} style={{margin: `${this.state.margin} 0px`, padding: '0px 8px'}}>{str}</p>
        ))}
        {this.props.chapter.length > 0 &&
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', padding: '20px'}}>
            <RaisedButton
              onClick={this.preChapter}
              label="上一页" />
            <RaisedButton
              onClick={this.nextChapter}
              label="下一页" />
          </div>}
        <div style={{
          position: 'fixed',
          zIndex: '100',
          left: '0px',
          top: '0px',
          width: '100%',
          height: '45px',
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '18px'}}>
          <MenuIcon style={{
            color: 'white',
            fontSize: '1.5em',
            marginLeft: '5px'
          }} />
          <SettingIcon style={{
            color: 'white',
            fontSize: '1.4em',
            marginRight: '5px'
          }}
            onClick={this.shouldShowSettingView}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  chapterList: appReducer.chapterList,
  chapterIndex: appReducer.chapterIndex,
  chapter: appReducer.chapter
})

export default withRouter(connect(mapStateToProps)(ChapterPage));

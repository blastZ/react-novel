import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { setChapterIndex, getChapter, initChapter, getChapterList } from '../actions/app_action';
import MenuIcon from 'react-icons/lib/md/menu';
import SettingIcon from 'react-icons/lib/md/settings';
import DecreaseIcon from 'react-icons/lib/md/remove';
import IncreaseIcon from 'react-icons/lib/md/add';
import BackIcon from 'react-icons/lib/md/keyboard-arrow-left';
import HomeIcon from 'react-icons/lib/md/home';

class ChapterPage extends Component {
  state = {
    fontSize: '18px',
    letterSpacing: '0.2em',
    lineHeight: '180%',
    margin: '15px',
    showSettingView: false,
    showNavView: false,
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

  getChapter = (chapter, index) => {
    this.props.history.push(`/${this.props.match.params.bookId}/${chapter.href}`);
    this.props.dispatch(initChapter());
    this.props.dispatch(getChapter(this.props.match.params.bookId, chapter.href));
    this.props.dispatch(setChapterIndex(index));
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <div style={{position: 'fixed', top: '0px', left: '0px', zIndex: '300', width: '60%', height: '100vh',
          background: 'black',
          color: 'white',
          display: `${this.state.showNavView ? 'flex' : 'none'}`, flexDirection: 'column'}}
          className="slide-from-left">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #a2a2a2', minHeight: '44px'}}>
            <HomeIcon onClick={() => {this.props.history.push('/')}} style={{fontSize: '25px', marginLeft: '5px'}} />
            <BackIcon onClick={this.shouldShowNavView} style={{fontSize: '40px'}} />
          </div>
          <div style={{overflowY: 'auto'}}>
            <ul style={{listStyle: 'none', paddingLeft: '20px'}}>
              {this.props.chapterList.map((chapter, index) => (
                <li key={chapter.name} style={{marginBottom: '6px'}} onClick={() => this.getChapter(chapter, index)}>{chapter.name}</li>
              ))}
            </ul>
          </div>
        </div>
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: `${this.state.bkColor}`,
          color: `${this.state.fontColor}`,
          width: '900px',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '60px 0px',
          fontSize: `${this.state.fontSize}`,
          letterSpacing: `${this.state.letterSpacing}`,
          lineHeight: `${this.state.lineHeight}`,
          overflowY: 'auto'}}>
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
            }}
              onClick={this.shouldShowNavView}/>
            <SettingIcon style={{
              color: 'white',
              fontSize: '1.4em',
              marginRight: '5px'
            }}
              onClick={this.shouldShowSettingView}/>
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

export default withRouter(connect(mapStateToProps)(ChapterPage));

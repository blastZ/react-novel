import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChapterList, initState, setChapterIndex, saveBookshelf, removeFromBookshelf } from '../actions/app_action';
import OptionTopBar from '../components/OptionTopBar';
import Menu, { MenuItem } from 'material-ui/Menu';
import AddIcon from 'react-icons/lib/md/add';
import RemoveIcon from 'react-icons/lib/md/delete';
import RightIcon from 'react-icons/lib/md/keyboard-arrow-right';
import LeftIcon from 'react-icons/lib/md/keyboard-arrow-left';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

class BookPage extends Component {
  state = {
    pageIndex: 0,
    showOptions: false,
    anchorEl: null,
    checkedReverse: false
  }

  componentWillMount() {
    this.props.dispatch(initState());
    this.props.dispatch(getChapterList(this.props.match.params.bookId));
  }

  toChapter = (chapter, index) => {
    this.props.dispatch(setChapterIndex(index));
    this.props.history.push(`/${this.props.match.params.bookId}/${chapter.href}`);
  }

  goBack = () => {
    this.props.history.goBack()
  }

  openOptions = (e) => {
    this.setState({
      showOptions: true,
      anchorEl: e.currentTarget
    })
  }

  closeOptions = () => {
    this.setState({
      showOptions: false
    })
  }

  saveBookshelf = () => {
    this.closeOptions();
    const bookId = this.props.match.params.bookId;
    const name = this.props.bookInfo.name;
    const url = this.props.bookInfo.url;
    this.props.dispatch(saveBookshelf({bookId, name, url}));
  }

  handleBack = () => {
    this.setState({
      pageIndex: this.state.pageIndex - 1
    })
  }

  handleNext = () => {
    this.setState({
      pageIndex: this.state.pageIndex + 1
    })
  }

  findBook = () => {
    const bookId = this.props.match.params.bookId;
    this.props.bookshelf.map((book) => {
      if(bookId === book.bookId) return true;
    })
    return false;
  }

  removeFromBookshelf = () => {
    this.closeOptions();
    this.props.dispatch(removeFromBookshelf(this.props.match.params.bookId));
  }

  render() {
    const { bookInfo, chapterList } = this.props;
    const chapterPageList = [];
    if(this.state.checkedReverse) {
      for(let i=chapterList.length - 1; i>0; i=i-20) {
        const list = [];
        for(let j=0; j<20; j++) {
          if(i - j < 0) break;
          list.push(chapterList[i - j]);
        }
        chapterPageList.push(list);
      }
    } else {
      for(let i=0; i<chapterList.length; i=i+20) {
        const list = [];
        for(let j=0; j<20; j++) {
          if(i + j >= chapterList.length) break;
          list.push(chapterList[i + j]);
        }
        chapterPageList.push(list);
      }
    }
    return (
      <div>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.showOptions}
          onRequestClose={this.closeOptions}
        >
          {this.findBook
            ? <MenuItem onClick={this.removeFromBookshelf}>
              <RemoveIcon style={{fontSize: '20px', marginRight: '5px', marginBottom: '2px'}} />移出书架
            </MenuItem>
            : <MenuItem onClick={this.saveBookshelf}>
              <AddIcon />加入书架
            </MenuItem>}
        </Menu>
        <OptionTopBar
          openOptions={this.openOptions}
          goBack={this.goBack} />
        {bookInfo.name && <div style={{paddingLeft: '10px'}}>
          <div style={{display: 'flex', padding: '15px 10px'}}>
            <div style={{width: '120px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: '15px'}}>
              <img alt={`${bookInfo.name}封面图片`} src={bookInfo.url} style={{maxWidth: '100%', width: '120px'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', padding: '0px 5px', justifyContent: 'space-between'}}>
              <h3>{bookInfo.name}</h3>
              <div style={{fontSize: '10px'}}><b>作者:</b>&nbsp;{bookInfo.author}</div>
              <div style={{fontSize: '10px'}}><b>更新时间:</b>&nbsp;{bookInfo.updateTime.split('：')[1]}</div>
              <div style={{fontSize: '10px'}}><b>最新章节:</b>&nbsp;{bookInfo.latestChapter}</div>
            </div>
          </div>
          <div style={{padding: '0px 10px', fontSize:'14px'}}>
            <p>{bookInfo.description}</p>
          </div>
        </div>}
        <Divider light />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h4 style={{marginLeft: '20px'}}>目录</h4>
          <FormControlLabel
           control={
             <Switch
               checked={this.state.checkedReverse}
               onChange={(event, checked) => this.setState({ checkedReverse: checked })}
             />
           }
           label="逆序"
         />
        </div>
        <div style={{height: '450px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: '0', overflowX: 'hidden', whiteSpace: 'nowrap'}}>
          {chapterPageList.length > 0 && chapterPageList[this.state.pageIndex].map((chapter, index) => (
            <a key={chapter.name + chapter.href} onClick={() => this.toChapter(chapter, index)}>{chapter.name}</a>
          ))}
        </div>
        <MobileStepper
          style={{
            background: 'transparent'
          }}
          type="progress"
          steps={chapterPageList.length}
          position="static"
          activeStep={this.state.pageIndex}
          nextButton={
            <Button dense onClick={this.handleNext} disabled={this.state.pageIndex === chapterPageList.length - 1}>
              Next
              <RightIcon />
            </Button>
          }
          backButton={
            <Button dense onClick={this.handleBack} disabled={this.state.pageIndex === 0}>
              <LeftIcon />
              Back
            </Button>
          }
        />
        <div style={{fontSize: '10px', color: 'gray', textAlign: 'center', padding: '10px'}}>©Forever, <em>developed by handsome boy blastz</em></div>
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  chapterList: appReducer.chapterList,
  bookInfo: appReducer.bookInfo
})

export default withRouter(connect(mapStateToProps)(BookPage));

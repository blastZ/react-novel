import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getChapterList, initState, setChapterIndex } from '../actions/app_action';
import BackIcon from 'react-icons/lib/md/keyboard-arrow-left';
import OptionIcon from 'react-icons/lib/md/more-vert';

class BookPage extends Component {
  state = {
    pageIndex: 0
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
    const { bookInfo, chapterList } = this.props;
    // const chapterPageList = [];
    // for(let i=0; i<chapterList.length; i=i+20) {
    //   const list = [];
    //   for(let j=0; j<20; j++) {
    //     if(i + j >= chapterList.length) break;
    //     list.push(chapterList[i + j]);
    //   }
    //   chapterPageList.push(list);
    // }
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: '800px', maxWidth: '100%', margin: '0 auto', height: '100%'}}>
        <div className="flex" style={{alignItems: 'center', justifyContent: 'space-between', height: '40px', background: 'rgba(0,0,0,0.7)', flexShrink: '0', color: 'white'}}>
          <BackIcon onClick={() => this.props.history.goBack()} style={{fontSize: '37px'}} />
          <OptionIcon style={{fontSize: '28px'}} />
        </div>
        {bookInfo.name && <div>
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
        <div style={{paddingLeft: '10px', display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
          {chapterList.map((chapter, index) => (
            <a key={chapter.name + chapter.href} onClick={() => this.toChapter(chapter, index)}>{chapter.name}</a>
          ))}
        </div>
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

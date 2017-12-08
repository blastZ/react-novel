import { GET_CHAPTER_LIST, GET_CHAPTER, SEARCH_BOOK, SAVE_BOOKSHELF, SET_CHAPTER,
         GET_CHAPTER_FORCE, PRE_LOAD_CHAPTERS } from '../actions/app_action';

//const defaultURL = 'http://localhost:5001';
const defaultURL = 'http://101.132.151.144:5001';

const appMiddleware = store => next => action => {
  const { type, bookId, chapterId, searchName } = action;
  if(type === GET_CHAPTER_LIST) {
    fetch(`${defaultURL}/book/${bookId}`)
      .then((response) => response.json())
      .then((result) => {
        next({
          type,
          bookInfo: result.bookInfo,
          chapterList: result.chapterList
        })
      })
  } else if(type === GET_CHAPTER) {
    store.dispatch({
      type: 'PRE_LOAD_CHAPTERS',
      bookId
    })
    if(store.getState().appReducer.localChapters[`${chapterId}`]) {
      next({
        type: SET_CHAPTER,
        chapterId
      })
    } else {
      const getChapter = (cb) => {
        fetch(`${defaultURL}/book/${bookId}/${chapterId}`)
          .then((response) => response.json())
          .then((result) => {
            cb(result);
          })
      }
      const cb = (result) => {
        if(result.html) {
          next({
            type: GET_CHAPTER,
            chapterName: result.name,
            chapter: result.html.split('<br>'),
            chapterId
          })
        } else {
          getChapter(cb);
        }
      }
      getChapter(cb);
    }
  } else if(type === GET_CHAPTER_FORCE) {
    const getChapter = (cb) => {
      fetch(`${defaultURL}/book/${bookId}/${chapterId}`)
        .then((response) => response.json())
        .then((result) => {
          cb(result);
        })
    }
    const cb = (result) => {
      if(result.html) {
        next({
          type: GET_CHAPTER,
          chapterName: result.name,
          chapter: result.html.split('<br>'),
          chapterId
        })
      } else {
        getChapter(cb);
      }
    }
    getChapter(cb);
  } else if(type === SEARCH_BOOK) {
    fetch(`${defaultURL}/search/${searchName}`)
      .then((response) => response.json())
      .then((result) => {
        next({
          type: SEARCH_BOOK,
          resultList: result
        })
      })
  } else if(type === PRE_LOAD_CHAPTERS) {
    // const appReducer = store.getState().appReducer;
    // const { localChapters, chapterIndex, chapterList } = appReducer;
    // if(chapterList.length > 0) {
    //   for(let i=1; i<=10; i++) {
    //     if(!localChapters[`${chapterList[chapterIndex + i].href}`]) {
    //       store.dispatch({
    //         type: GET_CHAPTER_FORCE,
    //         bookId,
    //         chapterId: chapterList[chapterIndex + i].href
    //       })
    //     }
    //   }
    // }
  } else {
    next(action)
  }
}

export default appMiddleware;

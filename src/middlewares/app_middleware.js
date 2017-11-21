import { GET_CHAPTER_LIST, GET_CHAPTER, SEARCH_BOOK } from '../actions/app_action';

const defaultURL = 'http://localhost:5001';
//const defaultURL = 'http://101.132.151.144:5001';

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
    fetch(`${defaultURL}/book/${bookId}/${chapterId}`)
      .then((response) => response.json())
      .then((result) => {
        next({
          type: GET_CHAPTER,
          chapterName: result.name,
          chapter: result.html.split('<br>')
        })
      })
  } else if(type === SEARCH_BOOK) {
    fetch(`${defaultURL}/search/${searchName}`)
      .then((response) => response.json())
      .then((result) => {
        next({
          type: SEARCH_BOOK,
          resultList: result
        })
      })
  } else {
    next(action)
  }
}

export default appMiddleware;

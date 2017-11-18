import { GET_CHAPTER_LIST, GET_CHAPTER } from '../actions/app_action';

const defaultURL = 'http://localhost:5001';
// const defaultURL = 'http://101.132.151.144:5001';

const handleChapterStr = (chapterStr) => {
    return chapterStr.split('<br>')
}

const appMiddleware = store => next => action => {
  const { type, bookId, chapterId } = action;
  if(type === GET_CHAPTER_LIST) {
    fetch(`${defaultURL}/book/${bookId}`)
      .then((response) => response.json())
      .then((result) => {
        next({
          type,
          chapterList: result.chapterList
        })
      })
  } else if(type === GET_CHAPTER) {
    fetch(`${defaultURL}/book/${bookId}/${chapterId}`)
      .then((response) => response.text())
      .then((result) => {
        next({
          type: GET_CHAPTER,
          chapter: result.split('<br>')
        })
      })
  } else {
    next(action)
  }
}

export default appMiddleware;

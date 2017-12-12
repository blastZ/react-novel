import { GET_CHAPTER_LIST, INIT_STATE, SET_CHAPTER_INDEX, GET_CHAPTER, INIT_CHAPTER,
         SEARCH_BOOK, SAVE_BOOKSHELF, GET_BOOKSHELF, REMOVE_FROM_BOOKSHELF, SET_CHAPTER,
         PRE_LOAD_CHAPTERS } from '../actions/app_action';

const initState = {
  chapterList: [],
  chapter: [],
  localChapters: {},
  chapterIndex: 0,
  chapterName: '',
  resultList: [],
  bookInfo: {
    id: '',
    url: '',
    name: '',
    author: '',
    updateTime: '',
    latestChapter: '',
    description: ''
  },
  bookshelf: [],
}

const appReducer = (state=initState, action) => {
  const { chapterList, chapterIndex, chapter, chapterName, resultList, bookInfo, book, bookId, chapterId, newState } = action;
  switch (action.type) {
    case GET_CHAPTER_LIST: {
      return {
        ...state,
        chapterList,
        bookInfo
      }
    }
    case INIT_STATE: {
      return {
        ...state,
        ...newState
      }
    }
    case SET_CHAPTER_INDEX: {
      return {
        ...state,
        chapterIndex
      }
    }
    case GET_CHAPTER: {
      return {
        ...state,
        chapter,
        chapterName,
        localChapters: {
          ...state.localChapters,
          [chapterId]: {
            chapter,
            chapterName
          }
        }
      }
    }
    case PRE_LOAD_CHAPTERS: {
      return {
        ...state,
        localChapters: {
          ...state.localChapters,
          [chapterId]: {
            chapter,
            chapterName
          }
        }
      }
    }
    case SET_CHAPTER: {
      return {
        ...state,
        chapter: state.localChapters[`${chapterId}`].chapter,
        chapterName: state.localChapters[`${chapterId}`].chapterName
      }
    }
    case INIT_CHAPTER: {
      return {
        ...state,
        chapter: [],
        chapterName: ''
      }
    }
    case SEARCH_BOOK: {
      return {
        ...state,
        resultList
      }
    }
    case SAVE_BOOKSHELF: {
      const newBookshelf = state.bookshelf.concat([book]);
      window.localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
      return {
        ...state,
        bookshelf: newBookshelf
      }
    }
    case GET_BOOKSHELF: {
      let bookshelf = JSON.parse(window.localStorage.getItem('bookshelf'));
      if(bookshelf) {

      } else {
        bookshelf = []
      }
      return {
        ...state,
        bookshelf
      }
    }
    case REMOVE_FROM_BOOKSHELF: {
      const newBookshelf = state.bookshelf.reduce((accumulator, book) => {
        if(book.bookId !== bookId) {
          return accumulator.concat([book])
        } else {
          return accumulator
        }
      }, []);
      window.localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
      return {
        ...state,
        bookshelf: newBookshelf
      }
    }
    default: return state;
  }
}

export default appReducer;

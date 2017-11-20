import { GET_CHAPTER_LIST, INIT_STATE, SET_CHAPTER_INDEX, GET_CHAPTER, INIT_CHAPTER,
         SEARCH_BOOK } from '../actions/app_action';

const initState = {
  chapterList: [],
  chapter: [],
  chapterIndex: 0,
  chapterName: '',
  resultList: [],
}

const appReducer = (state=initState, action) => {
  const { chapterList, chapterIndex, chapter, chapterName, resultList } = action;
  switch (action.type) {
    case GET_CHAPTER_LIST: {
      return {
        ...state,
        chapterList
      }
    }
    case INIT_STATE: {
      return {
        ...state,
        chapterList: [],
        chapterIndex: 0,
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
        chapterName
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
    default: return state;

  }
}

export default appReducer;

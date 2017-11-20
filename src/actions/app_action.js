export const GET_CHAPTER_LIST = 'GET_CHAPTER_LIST';
export const INIT_STATE = 'INIT_STATE';
export const SET_CHAPTER_INDEX = 'SET_CHAPTER_INDEX';
export const GET_CHAPTER = 'GET_CHAPTER';
export const INIT_CHAPTER = 'INIT_CHAPTER';
export const SEARCH_BOOK = 'SEARCH_BOOK';

export const getChapterList = (bookId) => ({
  type: GET_CHAPTER_LIST,
  bookId
})

export const initState = () => ({
  type: INIT_STATE
})

export const setChapterIndex = (index) => ({
  type: SET_CHAPTER_INDEX,
  chapterIndex: index
})

export const getChapter = (bookId, chapterId) => ({
  type: GET_CHAPTER,
  bookId,
  chapterId
})

export const initChapter = () => ({
  type: INIT_CHAPTER
})

export const searchBook = (searchName) => ({
  type: SEARCH_BOOK,
  searchName
})

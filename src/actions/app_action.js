export const GET_CHAPTER_LIST = 'GET_CHAPTER_LIST';
export const INIT_STATE = 'INIT_STATE';
export const SET_CHAPTER_INDEX = 'SET_CHAPTER_INDEX';
export const GET_CHAPTER = 'GET_CHAPTER';
export const GET_CHAPTER_FORCE = 'GET_CHAPTER_FORCE';
export const SET_CHAPTER = 'SET_CHAPTER';
export const INIT_CHAPTER = 'INIT_CHAPTER';
export const SEARCH_BOOK = 'SEARCH_BOOK';
export const SAVE_BOOKSHELF = 'SAVE_BOOKSHELF';
export const GET_BOOKSHELF = 'GET_BOOKSHELF';
export const REMOVE_FROM_BOOKSHELF = 'REMOVE_FROM_BOOKSHELF';
export const PRE_LOAD_CHAPTERS = 'PRE_LOAD_CHAPTERS';

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

export const getChapterForce = (bookId, chapterId) => ({
  type: GET_CHAPTER_FORCE,
  bookId,
  chapterId
})

export const setChapter = (chapterId) => ({
  type: SET_CHAPTER,
  chapterId
})

export const initChapter = () => ({
  type: INIT_CHAPTER
})

export const searchBook = (searchName) => ({
  type: SEARCH_BOOK,
  searchName
})

export const saveBookshelf = (book) => ({
  type: SAVE_BOOKSHELF,
  book
})

export const getBookshelf = () => ({
  type: GET_BOOKSHELF
})

export const removeFromBookshelf = (bookId) => ({
  type: REMOVE_FROM_BOOKSHELF,
  bookId
})

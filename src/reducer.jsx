const React = require("react");
const { handleActions } = require('redux-actions');

const FETCH_REACT_BOOKS = '/react';
const FETCH_REACT_BOOK = '/react:id';
const SELECT_BOOK = 'add book to store';

const InitialState = {
  books: [],
  book: {},
  selectedBook: {},
  url: 'http://127.0.0.1:5500/react'
}

module.exports = {
  fetchReactBooks: (books) => {
    return ({
      type: FETCH_REACT_BOOKS,
      books,
    })
  },
  fetchReactBook: (index) => {
    return ({
      type: FETCH_REACT_BOOK,
      index
    })
  },
  addBookToStore: (key) => ({ type: SELECT_BOOK, key }),
  reducer: handleActions({
    [FETCH_REACT_BOOKS]: (state, action) => ({ ...state, books: action.books }),
    [FETCH_REACT_BOOK]: (state, action) => ({ ...state, book: state.books[action.index] }),
    [SELECT_BOOK]: (state, action) => {
      let { selectedBook } = state;
      if (selectedBook[action.key]) selectedBook[action.key] += 1;
      else selectedBook[action.key] = 1;
      return { ...state, selectedBook }
    }
  }, InitialState),
  reducerBaseVariant: (state = InitialState, action) => {
    switch (action.type) {
      case [FETCH_REACT_BOOKS]:
        return { ...state, books: action.books };
      case [FETCH_REACT_BOOK]: return { ...state, book: state.books[action.index] };
      case [SELECT_BOOK]: {
        let { selectedBook } = state;
        if (selectedBook[action.key]) selectedBook[action.key] += 1;
        else selectedBook[action.key] = 1;
        return { ...state, selectedBook: selectedBook }
      }
    }
  }
}
//! reducerBaseVariant это базовая функция редюсер для организации хранилища данных в Reduxer <Provider store = {createStore(reducerBaseVariant)}></Provider>
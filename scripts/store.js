/* global cuid*/
'use strict';

// eslint-disable-next-line no-unused-vars
const STORE = (function() {
  
  //Local STORE varialbes, not public
  let newBookmark = false;
  let sortBy = 'all';
  let expansionStatus = false;  
  let bookmarks = [];

  //CRUD Functions, public

  //Create Functions
  //create bookmark- newBookmark is an object given by the server after a successful POST API call
  const addBookmark = newBookmark => {
    newBookmark.edit = false;
    newBookmark.expansion = false;
    bookmarks.push(newBookmark);
  };
  
  //Read Functions
  const getNewBookmarkStatus = () => {
    return newBookmark;
  };

  const getSortBy = () => {
    return sortBy;
  };

  const getExpansionStatus = () => {
    return expansionStatus;
  };

  const getBookmarkByID = (id) => {
    return bookmarks.filter((bookmark)=> bookmark.id === id)[0];
  };

  const getBookmarkExpansion = (bookmark) => {
    return bookmark.expansion;
  };

  const getBookmarkEdit = (bookmark) =>{
    return bookmark.edit;
  };

  const getAllBookmarks = () => {
    return bookmarks;
  };

  //Update Functions
  //Set NewBookmark variable where status is true or false
  const setNewBookmark = (status) => {
    newBookmark = status;
  };

  //Set SortBy variable where filter is a string
  const setSortBy = (filter) => {
    sortBy = filter;
  };

  //Set ExpansionStatus where status is true or false
  const setExpansionStatus = (status) => {
    expansionStatus = status;
  };

  const setBookmarkExpansion = (bookmark, status) => {
    bookmark.expansion = status;
  };

  const setBookmarkEdit = (bookmark, status) => {
    bookmark.edit = status;
  };
  //Update a certain bookmark where newBookmark an object with some or all properties to edit
  const updateBookmark = (id, newBookmark) => {
    Object.assign(id, newBookmark);
  };

  //Delete Functions
  //Delete a certain bookmark where id is the id of the bookmark object from the bookmarks array
  const deleteBookmark = (id) => {
    const arrIndex = bookmarks.findIndex(bookmark => bookmark.id === id);
    bookmarks.splice(arrIndex, 1);
  };

  return {
    //create function
    addBookmark,

    //read functions
    getNewBookmarkStatus,
    getSortBy,
    getExpansionStatus,
    getBookmarkByID,
    getBookmarkExpansion,
    getBookmarkEdit,
    getAllBookmarks,

    //update functions
    setNewBookmark,
    setSortBy,
    setExpansionStatus,
    setBookmarkExpansion,
    setBookmarkEdit,
    updateBookmark,

    //delete functions
    deleteBookmark,
  };
}());


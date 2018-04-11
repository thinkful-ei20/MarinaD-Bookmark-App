/* global $ */
'use strict';

const STORE = (function() {
  
  //Local STORE varialbes, not public
  const newBookmark = false;
  const sortBy = 'all';
  const expansionStatus = false;  
  const bookmarks = [];

  //CRUD Functions, public

  //Create Functions
  //create bookmark- newBookmark is an object containing all necessary keys
  const addBookmark = newBookmark => {

  };
  
  //Read Functions
  const getNewBookmarkStatus = () => {

  };

  const getSortBy = () => {

  };

  const getExpansionStatus = () => {

  };

  const getBookmarkByID = (id) => {

  };

  //Update Functions
  //Set NewBookmark variable where status is true or false
  const setNewBookmark = (status) => {

  };

  //Set SortBy variable where filter is a string
  const setSortBy = (filter) => {

  };

  //Set ExpansionStatus where status is true or false
  const setExpansionStatus = (status) => {

  };
  //Update a certain bookmark where bookmark is the object from the bookmarks array
  const updateBookmark = (bookmark) => {

  };

  //Delete Functions
  //Delete a certain bookmar where bookmark is the object from the bookmarks array
  const deleteBookmark = (bookmark) => {

  };

  return {
    //create function
    addBookmark,

    //read functions
    getNewBookmarkStatus,
    getSortBy,
    getExpansionStatus,
    getBookmarkByID,

    //update functions
    setNewBookmark,
    setSortBy,
    setExpansionStatus,
    updateBookmark,

    //delete functions
    deleteBookmark
  };
}());


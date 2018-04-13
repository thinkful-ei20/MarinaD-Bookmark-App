/* global $ */
'use strict';

// eslint-disable-next-line no-unused-vars
const API = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/marinaD';

  //GET method
  const getBookmarks = (callback) => {
    $.getJSON(`${BASE_URL}/bookmarks`,callback);
  };

  //POST method
  const createBookmark = (bookmarkTitle, bookmarkURL, bookmarkRating, bookmarkDesc, callback, errCallback) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        title: bookmarkTitle,
        url: bookmarkURL,
        rating: bookmarkRating,
        desc : bookmarkDesc,
      }),
      success: callback,
      error: errCallback
    });
  };

  //Patch server record where updateData is an object containing title and/or desc and/or rating
  const updateBookmark = (id, bookmarkTitle, bookmarkUrl, bookmarkRating, bookmarkDesc, callback, errCallback) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify({
        title: bookmarkTitle,
        url: bookmarkUrl,
        rating: bookmarkRating,
        desc: bookmarkDesc
      }),
      success: callback,
      error: errCallback
    });
  };
 
  //Deletes a bookmark based on its ID
  const deleteBookmark = (id, callback, errCallback) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback,
      error: errCallback
    });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };  
}());
/* global $ cuid*/
'use strict';

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
      data: {
        id: cuid(),
        title: bookmarkTitle,
        url: bookmarkURL,
        rating: bookmarkRating,
        desc : bookmarkDesc,
        edit: false
      },
      success: callback,
      error: errCallback
    });
  };
 

  return {
    getBookmarks,
    createBookmark
  };  
}());
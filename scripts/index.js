/* global $ STORE API BOOKMARKS*/
'use strict';

const main = () => {
  API.getBookmarks((results) =>{
    results.map((bookmark)=>{
      STORE.addBookmark(bookmark);
    });
    BOOKMARKS.render();
  });
};

$(main);
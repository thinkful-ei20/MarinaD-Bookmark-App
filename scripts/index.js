/* global $ STORE API BOOKMARKS*/
'use strict';

const main = () => {
  BOOKMARKS.handleAdd();
  BOOKMARKS.handleAddSubmit();
  BOOKMARKS.handleExpandSingle();
  BOOKMARKS.handleDelete();
  API.getBookmarks((results) =>{
    results.map((bookmark)=>{
      STORE.addBookmark(bookmark);
    });
    BOOKMARKS.render();
  });
};

$(main);
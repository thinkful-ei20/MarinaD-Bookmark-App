/* global $ STORE API BOOKMARKS*/
'use strict';

const main = () => {
  BOOKMARKS.handleAdd();
  BOOKMARKS.handleCancelAdd();
  BOOKMARKS.handleAddSubmit();
  BOOKMARKS.handleExpandSingle();
  BOOKMARKS.handleDelete();
  BOOKMARKS.handleEdit();
  BOOKMARKS.handleEditSubmit();
  BOOKMARKS.handleEditCancel();
  API.getBookmarks((results) =>{
    results.map((bookmark)=>{
      STORE.addBookmark(bookmark);
    });
    BOOKMARKS.render();
  });
};

$(main);
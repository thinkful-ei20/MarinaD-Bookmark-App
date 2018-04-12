/* global $ STORE*/
'use strict';

const BOOKMARKS = (function() {
  
  //Render Functions
  const generateAdd = () => {

  };

  const generateExpanded = () => {

  };

  //generate template string based on bookmark object from local store
  const generateBookmark = (bookmark) => {
    return `
  <div class="bookmark">
    <button class="expandToggle">Expand</button>
    <span class="bookmark-title">${bookmark.title}</span>
    <span class="bookmark-ranking">${bookmark.rating}</span>
  </div>`;
  };

  const render = () => {

    const html = STORE.getAllBookmarks().map((bookmark)=>{
      return generateBookmark(bookmark);
    }).join('');
    $('.bookmarks').html(html);
  };

  //Event Handlers
  const handleAdd = () => {

  };

  const handleExpandAll = () => {

  };

  const handleSort = () => {

  };

  return {
    handleAdd,
    handleExpandAll,
    handleSort,
    render
  };
}());
/* global $ STORE API*/
'use strict';

const BOOKMARKS = (function() {
  
  //Render Functions
  const generateAdd = () => {
    return `
    <form id="new-bookmark-form">
      <lable>
        <input type="text" placeholder="Bookmark Title" id="bookmark-title">
      </lable>
      <lable>
        <input type="text" placeholder="Bookmark URL" id="bookmark-url">
      </lable>
      <lable>
        <input type="number" placeholder="Rating" id="bookmark-rating">
      </lable>
      <lable>
        <input type="textarea" placeholder="Description (optional)" id="bookmark-desc">
      </lable>
      <button id="add-btn-submit" type="submit">Add!</button>
      <a href="#">Cancel</a>
    </form>`;
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
    //what to do if user clicks "add new bookmark"
    if (STORE.getNewBookmarkStatus() === true) {
      //UI changes
      $('.controls').append(generateAdd());
      $('#new-bookmark-btn').addClass('hidden').after('<p>New Bookmark</p>');
    }

    //read from STORE and add bookmarks
    const html = STORE.getAllBookmarks().map((bookmark)=>{
      return generateBookmark(bookmark);
    }).join('');
    $('.bookmarks').html(html);
  };

  //Event Handlers
  const handleAdd = () => {
    $('#new-bookmark-btn').on('click', ()=> {
      STORE.setNewBookmark(true);
      render();
    });
  };

  const handleAddSubmit = () => {
    $('.controls').on('submit', '#new-bookmark-form', (event)=> {
      event.preventDefault();

      const bookmarkTitle = $('#bookmark-title').val();
      const bookmarkURL = $('#bookmark-url').val();
      let bookmarkRating = $('#bookmark-rating').val();
      if(bookmarkRating === '') bookmarkRating = undefined;
      let bookmarkDesc = $('#bookmark-desc').val();
      if(bookmarkDesc === '') bookmarkDesc = undefined;
      console.log(bookmarkRating);
      API.createBookmark(bookmarkTitle, bookmarkURL,bookmarkRating, bookmarkDesc, (results) => STORE.addBookmark(results), (results)=>{console.log('Failure: ' + results);});
      render();
    });
  };

  const handleExpandAll = () => {

  };

  const handleSort = () => {

  };

  return {
    handleAdd,
    handleAddSubmit,
    handleExpandAll,
    handleSort,
    render
  };
}());
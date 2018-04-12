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

  const generateExpanded = (bookmark) => {
    return `
    <div class="bookmark" data-id="${bookmark.id}">
      <button class="expandToggle">Expand</button>
      <span class="bookmark-title">${bookmark.title}</span>
      <span class="bookmark-ranking">${bookmark.rating}</span>
      <p class="bookmark-url">${bookmark.url} <a href="${bookmark.url}">Visit Site</a></p>
      <p class="bookmark-description">${bookmark.desc}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>      
    </div>`;
  };

  //generate template string based on bookmark object from local store
  const generateBookmark = (bookmark) => {
    return `
  <div class="bookmark" data-id="${bookmark.id}">
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
      if (STORE.getBookmarkExpansion(bookmark)){
        return generateExpanded(bookmark);
      }
      else {
        return generateBookmark(bookmark);
      }
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
      API.createBookmark(bookmarkTitle, 
        bookmarkURL,
        bookmarkRating, 
        bookmarkDesc, 
        (results) => STORE.addBookmark(results), 
        (results)=>{console.log('Failure: ' + results);});
      render();
    });
  };

  const handleExpandSingle = () => {
    $('.bookmarks').on('click', '.expandToggle', (event)=> {
      const bookmarkID = $(event.target).closest('.bookmark').data('id');
      const bookmarkObj = STORE.getBookmarkByID(bookmarkID);
      const toggleExpansion = !STORE.getBookmarkExpansion(bookmarkObj);
      STORE.setBookmarkExpansion(bookmarkObj,toggleExpansion);
      render();
    });
  };

  const handleDelete = () => {
    $('.bookmarks').on('click','.delete-btn',(event)=>{
      const bookmarkID = $(event.target).closest('.bookmark').data('id');
      API.deleteBookmark(
        bookmarkID,
        ()=> {
          STORE.deleteBookmark(bookmarkID);
          render();},
        (results) => {console.log(results);}
      );
    });
  };

  const handleExpandAll = () => {

  };

  const handleSort = () => {

  };

  return {
    handleAdd,
    handleAddSubmit,
    handleExpandSingle,
    handleDelete,
    handleExpandAll,
    handleSort,
    render
  };
}());
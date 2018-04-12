/* global $ STORE API*/
'use strict';

const BOOKMARKS = (function() {
  
  //Render Functions
  const generateAdd = () => {
    return `
    <form id="new-bookmark-form">
      <lable for="bookmark-title"></lable>
        <input type="text" placeholder="Bookmark Title" id="bookmark-title">
      <lable for="bookmark-url"></lable>
        <input type="text" placeholder="Bookmark URL" id="bookmark-url">
      <lable for="bookmark-rating"></lable>
        <input type="number" placeholder="Rating" id="bookmark-rating">
      <lable for="bookmark-desc"></lable>
        <input type="textarea" placeholder="Description (optional)" id="bookmark-desc">
      
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

  const generateEdit = (bookmark) => {
    return `
    <div class="bookmark" data-id="${bookmark.id}">
      <button class="expandToggle">Expand</button>
      <form id="edit-bookmark">
        <label for="title-edit"></label>
        <input type="text" id="title-edit" class="bookmark-title-edit" placeholder="${bookmark.title}">
        <label for="rating-edit"></label>
        <input type="number" id="rating-edit" class="bookmark-ranking-edit" placeholder="${bookmark.rating}">
        <label for="url-edit"></label>
        <input type="text" id="url-edit" class="bookmark-url-edit" placeholder="${bookmark.url}">
        <label for="desc-edit"></label>
        <input type="textarea" id="desc-edit" class="bookmark-description-edit" placeholder="${bookmark.desc}">
        <button type="submit">Edit This Bookmark</button>  
      </form> 
      <button class="cancel-edit">Cancel</button>   
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
        //nested if statement to change html based on if editing or not
        if (STORE.getBookmarkEdit(bookmark)){
          return generateEdit(bookmark);
        }
        else {
          return generateExpanded(bookmark);
        }
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

  const handleEdit = () => {
    $('.bookmarks').on('click','.edit-btn', (event) =>{
      const bookmarkID = $(event.target).closest('.bookmark').data('id');
      const bookmarkObj = STORE.getBookmarkByID(bookmarkID);
      const editStatus = !STORE.getBookmarkEdit(bookmarkObj);
      STORE.setBookmarkEdit(bookmarkObj, editStatus);
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
    handleExpandSingle,
    handleDelete,
    handleEdit,
    handleExpandAll,
    handleSort,
    render
  };
}());
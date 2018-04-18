/* global $ STORE API*/
'use strict';

// eslint-disable-next-line no-unused-vars
const BOOKMARKS = (function() {
  
  //Render Functions
  const generateAdd = () => {
    return `
    <div class="new-bookmark">
      <form id="new-bookmark-form">
        <lable for="bookmark-title"></lable>
          <input required type="text" placeholder="Bookmark Title" id="bookmark-title">
        <lable for="bookmark-url"></lable>
          <input required type="text" placeholder="Bookmark URL" id="bookmark-url">
        <lable for="bookmark-rating"></lable>
          <input type="number" placeholder="Rating" id="bookmark-rating">
        <lable for="bookmark-desc"></lable>
          <input type="textarea" placeholder="Description (optional)" id="bookmark-desc">
        
        <button id="add-btn-submit" type="submit">Add!</button>
      </form>
      <button class="cancel-add">Cancel</button>
    </div>`;
  };

  const generateExpanded = (bookmark) => {
    return `
    <li class="bookmark" data-id="${bookmark.id}">
      <button class="expandToggle">-</button>
      <span class="bookmark-title">${bookmark.title}</span>
      <span class="bookmark-ranking">Rating: ${bookmark.rating}/5</span>
      <p class="bookmark-url"><a href="${bookmark.url}">${bookmark.url}</a></p>
      <p class="bookmark-description">${bookmark.desc}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>      
    </li>`;
  };

  const generateEdit = (bookmark) => {
    return `
    <li class="bookmark" data-id="${bookmark.id}">
      <button class="expandToggle">-</button>
      <form id="edit-bookmark">
        <label for="title-edit"></label>
        <input type="text" id="title-edit" class="bookmark-title-edit" placeholder="Title: (currently ${bookmark.title})">
        <label for="rating-edit"></label>
        <input type="number" id="rating-edit" class="bookmark-ranking-edit" placeholder="Rating: (currently ${bookmark.rating})">
        <label for="url-edit"></label>
        <input type="text" id="url-edit" class="bookmark-url-edit" placeholder="URL (currently ${bookmark.url})">
        <label for="desc-edit"></label>
        <input type="textarea" id="desc-edit" class="bookmark-description-edit" placeholder="Description (currently ${bookmark.desc})">
        <button type="submit" class="edit-btn-submit">Edit This Bookmark</button>  
      </form> 
      <button class="cancel-edit">Cancel</button>   
    </li>`;
  };

  //generate template string based on bookmark object from local store
  const generateBookmark = (bookmark) => {
    let prettyRank = `Rating: ${bookmark.rating}/5`;
    if (bookmark.rating === null) prettyRank = 'Rating Not Set';
    return `
  <li class="bookmark" data-id="${bookmark.id}">
    <button class="expandToggle">+</button>
    <span class="bookmark-title">${bookmark.title}</span>
    <span class="bookmark-ranking">${prettyRank}</span>
  </li>`;
  };

  const generateErrorMsg = () => {
    return `
    <div class="modal">
      <div id="overlay"></div>
      <div id="error-message">
        <p id="error-content">${STORE.error}</p>
        <a href="#" id="err-close">close</a>
      </div>
    </div>
    `;
  };


  const render = () => {
    //show total bookmarks
    $('#total-bookmarks').html(STORE.getAllBookmarks().length);
    //what to do if user clicks "add new bookmark"
    $('main').prop('hidden', false);
    if (STORE.getNewBookmarkStatus() === true) {
      //UI changes
      $('.controls').after(generateAdd());
      $('#new-bookmark-btn')
        .attr('disabled', true)
        .addClass('disabledBtn');
      STORE.setNewBookmark(false);
    }
    else{
      $('header').find('.new-bookmark').remove();
      $('.controls').find('.adding-title').remove();
      $('#new-bookmark-btn').removeClass('disabledBtn');
      $('#new-bookmark-btn').attr('disabled', false);
    }

    //read from STORE and add bookmarks
    const html = STORE.getAllBookmarks().map((bookmark)=>{
      if(bookmark.rating >= STORE.getSortBy()){
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
      }      
    }).join('');
    $('.bookmarks').html(html);
    //Check if there is an error
    if (STORE.error !== null){
      $('.controls').append(generateErrorMsg());
      handleErrorClose();
      STORE.error = null;
    }
  };

  //Error Handler
  const handleError = (result) => {
    const errStr = `Oops! ${result.responseJSON.message}`;
    STORE.error = errStr;
    render();
  };

  const handleErrorClose = () =>{
    $('#err-close').on('click', ()=>{
      $('.controls').find('.modal').remove();
    });
  };

  //Event Handlers
  const handleAdd = () => {
    $('#new-bookmark-btn').on('click', ()=> {
      STORE.setNewBookmark(true);
      render();
    });
  };
  
  const handleCancelAdd = () => {
    $('header').on('click', '.cancel-add', ()=>{
      console.log('I ran!');
      STORE.setNewBookmark(false);
      render();
    });
  };

  const handleAddSubmit = () => {
    $('header').on('submit', '#new-bookmark-form', (event)=> {
      event.preventDefault();

      const bookmarkTitle = $('#bookmark-title').val();
      const bookmarkURL = $('#bookmark-url').val();
      let bookmarkRating = $('#bookmark-rating').val();
      if(bookmarkRating === '') bookmarkRating = undefined;
      let bookmarkDesc = $('#bookmark-desc').val();
      if(bookmarkDesc === '') bookmarkDesc = 'no description set';
      API.createBookmark(bookmarkTitle, 
        bookmarkURL,
        bookmarkRating, 
        bookmarkDesc, 
        (results) => {
          STORE.addBookmark(results);
          render();
        }, 
        (results)=>{handleError(results);});
      
    });
  };

  const handleExpandSingle = () => {
    $('.bookmarks').on('click', '.expandToggle', (event)=> {
      const bookmarkID = $(event.target)
        .closest('.bookmark')
        .data('id');
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
        (results) => {handleError(results);}
      );
    });
  };

  const handleEdit = () => {
    $('.bookmarks').on('click','.edit-btn', (event) =>{
      const bookmarkID = $(event.target).closest('.bookmark').data('id');
      STORE.setBookmarkEdit(bookmarkID, true);
      render();
    });
  };

  const handleEditSubmit = () => {
    $('.bookmarks').on('submit', '#edit-bookmark', (event)=>{
      event.preventDefault();

      const bookmarkId = $(event.target).closest('.bookmark').data('id');
      
      let bookmarkTitle = $('#title-edit').val();
      if(bookmarkTitle === '') bookmarkTitle = undefined;

      let bookmarkURL = $('#url-edit').val();
      if(bookmarkURL === '') bookmarkURL = undefined;

      let bookmarkRating = $('#rating-edit').val();
      if(bookmarkRating === '') bookmarkRating = undefined;

      let bookmarkDesc = $('#desc-edit').val();
      if(bookmarkDesc === '') bookmarkDesc = undefined;

      API.updateBookmark(bookmarkId, bookmarkTitle, 
        bookmarkURL,
        bookmarkRating, 
        bookmarkDesc, 
        () => {
          API.getBookmarks(() =>{
            const newBookmark = {edit: false}; 
            if(bookmarkTitle !== undefined) newBookmark.title = bookmarkTitle; 
            if(bookmarkURL !== undefined) newBookmark.url = bookmarkURL;
            if(bookmarkRating !== undefined) newBookmark.rating = bookmarkRating;
            if(bookmarkDesc !== undefined) newBookmark.desc = bookmarkDesc;
            STORE.updateBookmark(bookmarkId, newBookmark);
            render();
          });
        },
        (results)=>{handleError(results);});
    });
  };

  const handleEditCancel = () => {
    $('.bookmarks').on('click','.cancel-edit',(event)=>{
      const currentBookmarkID = $(event.target).closest('.bookmark').data('id');
      STORE.updateBookmark(currentBookmarkID, {edit: false});
      render();
    });
  };

  const handleExpandAll = () => {
    $('.expand-all').on('change', () => {
      if($('.expand-all').prop('checked') === true){
        STORE.getAllBookmarks().map(bookmark => {
          STORE.setBookmarkExpansion(bookmark, true);
        });
        render();
      }
      else {
        STORE.getAllBookmarks().map(bookmark => {
          STORE.setBookmarkExpansion(bookmark, false);
        });
        render();
      }
    });
  };

  const handleSort = () => {
    $('#sort-by').on('change', (event)=>{
      const val = $(event.target).find(':selected').val();
      STORE.setSortBy(val);
      render();
    });
  };

  return {
    handleAdd,
    handleCancelAdd,
    handleAddSubmit,
    handleExpandSingle,
    handleDelete,
    handleEdit,
    handleEditSubmit,
    handleEditCancel,
    handleExpandAll,
    handleSort,
    render
  };
}());